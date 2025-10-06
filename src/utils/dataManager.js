// Data Management Utility for RooferHQ
// Handles localStorage, data validation, auto-save, and backup/restore

class DataManager {
  constructor() {
    this.storageKey = 'rooferhq-data';
    this.autoSaveInterval = 30000; // 30 seconds
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
    this.autoSaveEnabled = true;
    this.pendingChanges = new Set();
    this.listeners = new Map();
    
    // Initialize auto-save
    this.startAutoSave();
    
    // Listen for beforeunload to save pending changes
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    
    // Listen for visibility change to save when tab becomes hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  // Core data operations
  async saveData(key, data, options = {}) {
    const {
      validate = true,
      backup = true,
      retry = true,
      immediate = false
    } = options;

    try {
      // Validate data if required
      if (validate && !this.validateData(data)) {
        throw new Error(`Invalid data structure for key: ${key}`);
      }

      // Create backup if required
      if (backup) {
        await this.createBackup(key);
      }

      // Prepare data with metadata
      const dataWithMeta = {
        data,
        timestamp: Date.now(),
        version: this.getVersion(),
        checksum: this.generateChecksum(data)
      };

      // Save to localStorage with retry logic
      await this.saveWithRetry(key, dataWithMeta, retry);

      // Mark as saved
      this.pendingChanges.delete(key);

      // Notify listeners
      this.notifyListeners(key, 'saved', data);

      console.log(`✅ Data saved successfully: ${key}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to save data for key: ${key}`, error);
      
      // Mark as pending for retry
      this.pendingChanges.add(key);
      
      // Notify listeners of error
      this.notifyListeners(key, 'error', error);
      
      return false;
    }
  }

  async loadData(key, options = {}) {
    const {
      validate = true,
      fallback = null,
      retry = true
    } = options;

    try {
      const rawData = localStorage.getItem(`${this.storageKey}-${key}`);
      
      if (!rawData) {
        return fallback;
      }

      const dataWithMeta = JSON.parse(rawData);
      
      // Validate data integrity
      if (validate && !this.validateDataIntegrity(dataWithMeta)) {
        console.warn(`⚠️ Data integrity check failed for key: ${key}`);
        
        // Try to load from backup
        const backupData = await this.loadFromBackup(key);
        if (backupData) {
          console.log(`🔄 Loaded from backup: ${key}`);
          return backupData.data;
        }
        
        return fallback;
      }

      return dataWithMeta.data;

    } catch (error) {
      console.error(`❌ Failed to load data for key: ${key}`, error);
      
      // Try to load from backup
      const backupData = await this.loadFromBackup(key);
      if (backupData) {
        console.log(`🔄 Loaded from backup: ${key}`);
        return backupData.data;
      }
      
      return fallback;
    }
  }

  // Auto-save functionality
  startAutoSave() {
    if (this.autoSaveIntervalId) {
      clearInterval(this.autoSaveIntervalId);
    }

    this.autoSaveIntervalId = setInterval(() => {
      if (this.autoSaveEnabled && this.pendingChanges.size > 0) {
        this.savePendingChanges();
      }
    }, this.autoSaveInterval);
  }

  stopAutoSave() {
    if (this.autoSaveIntervalId) {
      clearInterval(this.autoSaveIntervalId);
      this.autoSaveIntervalId = null;
    }
  }

  async savePendingChanges() {
    const pendingKeys = Array.from(this.pendingChanges);
    
    for (const key of pendingKeys) {
      try {
        // Get current data from memory or re-fetch
        const data = this.getCurrentData(key);
        if (data) {
          await this.saveData(key, data, { immediate: true });
        }
      } catch (error) {
        console.error(`❌ Auto-save failed for key: ${key}`, error);
      }
    }
  }

  // Data validation
  validateData(data) {
    if (data === null || data === undefined) {
      return false;
    }

    // Add specific validation rules based on data type
    if (typeof data === 'object') {
      // Check for circular references
      try {
        JSON.stringify(data);
        return true;
      } catch (error) {
        console.error('❌ Circular reference detected in data');
        return false;
      }
    }

    return true;
  }

  validateDataIntegrity(dataWithMeta) {
    if (!dataWithMeta || !dataWithMeta.data || !dataWithMeta.checksum) {
      return false;
    }

    const currentChecksum = this.generateChecksum(dataWithMeta.data);
    return currentChecksum === dataWithMeta.checksum;
  }

  // Backup and restore
  async createBackup(key) {
    try {
      const currentData = localStorage.getItem(`${this.storageKey}-${key}`);
      if (currentData) {
        const backupKey = `${this.storageKey}-backup-${key}-${Date.now()}`;
        localStorage.setItem(backupKey, currentData);
        
        // Clean up old backups (keep last 5)
        this.cleanupOldBackups(key);
      }
    } catch (error) {
      console.error(`❌ Failed to create backup for key: ${key}`, error);
    }
  }

  async loadFromBackup(key) {
    try {
      const backupKeys = Object.keys(localStorage)
        .filter(k => k.startsWith(`${this.storageKey}-backup-${key}-`))
        .sort((a, b) => b.localeCompare(a)); // Most recent first

      for (const backupKey of backupKeys) {
        const backupData = localStorage.getItem(backupKey);
        if (backupData) {
          const parsedData = JSON.parse(backupData);
          if (this.validateDataIntegrity(parsedData)) {
            return parsedData;
          }
        }
      }
    } catch (error) {
      console.error(`❌ Failed to load backup for key: ${key}`, error);
    }
    
    return null;
  }

  cleanupOldBackups(key) {
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${this.storageKey}-backup-${key}-`))
      .sort((a, b) => b.localeCompare(a));

    // Keep only the 5 most recent backups
    const keysToDelete = backupKeys.slice(5);
    keysToDelete.forEach(keyToDelete => {
      localStorage.removeItem(keyToDelete);
    });
  }

  // Export and import
  async exportAllData() {
    try {
      const allData = {};
      const keys = Object.keys(localStorage)
        .filter(k => k.startsWith(this.storageKey) && !k.includes('backup'));

      for (const key of keys) {
        const dataKey = key.replace(`${this.storageKey}-`, '');
        allData[dataKey] = await this.loadData(dataKey, { validate: false });
      }

      return {
        data: allData,
        timestamp: Date.now(),
        version: this.getVersion(),
        checksum: this.generateChecksum(allData)
      };
    } catch (error) {
      console.error('❌ Failed to export data', error);
      throw error;
    }
  }

  async importData(importedData) {
    try {
      if (!importedData || !importedData.data) {
        throw new Error('Invalid import data structure');
      }

      // Create backup before import
      await this.createBackup('full-import-backup');

      // Import each key
      for (const [key, data] of Object.entries(importedData.data)) {
        await this.saveData(key, data, { validate: true, backup: false });
      }

      console.log('✅ Data imported successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to import data', error);
      throw error;
    }
  }

  // Utility methods
  generateChecksum(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  getVersion() {
    return '1.0.0'; // Update this when data structure changes
  }

  async saveWithRetry(key, data, retry = true) {
    let attempts = 0;
    
    while (attempts < this.maxRetries) {
      try {
        localStorage.setItem(`${this.storageKey}-${key}`, JSON.stringify(data));
        return;
      } catch (error) {
        attempts++;
        
        if (attempts >= this.maxRetries || !retry) {
          throw error;
        }
        
        console.warn(`⚠️ Save attempt ${attempts} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  getCurrentData(key) {
    // This would be implemented based on your app's state management
    // For now, we'll try to get it from localStorage
    try {
      const rawData = localStorage.getItem(`${this.storageKey}-${key}`);
      return rawData ? JSON.parse(rawData).data : null;
    } catch (error) {
      return null;
    }
  }

  // Event handling
  handleBeforeUnload(event) {
    if (this.pendingChanges.size > 0) {
      // Force save pending changes
      this.savePendingChanges();
      
      // Show warning if there are still pending changes
      if (this.pendingChanges.size > 0) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return event.returnValue;
      }
    }
  }

  handleVisibilityChange() {
    if (document.hidden && this.pendingChanges.size > 0) {
      this.savePendingChanges();
    }
  }

  // Listener management
  addListener(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
  }

  removeListener(key, callback) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).delete(callback);
    }
  }

  notifyListeners(key, event, data) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        try {
          callback(event, data);
        } catch (error) {
          console.error('❌ Listener error:', error);
        }
      });
    }
  }

  // Public API
  markAsChanged(key) {
    this.pendingChanges.add(key);
  }

  isChanged(key) {
    return this.pendingChanges.has(key);
  }

  getPendingChanges() {
    return Array.from(this.pendingChanges);
  }

  clearPendingChanges() {
    this.pendingChanges.clear();
  }

  // Health check
  async healthCheck() {
    const issues = [];
    
    try {
      // Check localStorage availability
      const testKey = 'rooferhq-health-check';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
    } catch (error) {
      issues.push('localStorage not available');
    }

    // Check for corrupted data
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith(this.storageKey) && !k.includes('backup'));

    for (const key of keys) {
      try {
        const data = localStorage.getItem(key);
        JSON.parse(data);
      } catch (error) {
        issues.push(`Corrupted data: ${key}`);
      }
    }

    return {
      healthy: issues.length === 0,
      issues,
      pendingChanges: this.pendingChanges.size,
      autoSaveEnabled: this.autoSaveEnabled
    };
  }
}

// Create singleton instance
const dataManager = new DataManager();

export default dataManager;
