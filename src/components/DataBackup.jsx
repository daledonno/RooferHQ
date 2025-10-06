import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Upload, 
  Database, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  HardDrive
} from 'lucide-react';
import dataManager from '../utils/dataManager';

const DataBackup = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [lastBackup, setLastBackup] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    checkHealth();
    getStorageInfo();
    getLastBackupTime();
  }, []);

  const checkHealth = async () => {
    try {
      const health = await dataManager.healthCheck();
      setHealthStatus(health);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const getStorageInfo = () => {
    try {
      const used = Object.keys(localStorage)
        .filter(key => key.startsWith('rooferhq-data'))
        .reduce((total, key) => {
          return total + (localStorage.getItem(key)?.length || 0);
        }, 0);

      const total = 5 * 1024 * 1024; // 5MB typical localStorage limit
      
      setStorageInfo({
        used: used,
        total: total,
        percentage: (used / total) * 100,
        usedFormatted: formatBytes(used),
        totalFormatted: formatBytes(total)
      });
    } catch (error) {
      console.error('Storage info failed:', error);
    }
  };

  const getLastBackupTime = () => {
    try {
      const backupTime = localStorage.getItem('rooferhq-last-backup');
      setLastBackup(backupTime ? parseInt(backupTime) : null);
    } catch (error) {
      console.error('Last backup time failed:', error);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const exportData = async () => {
    try {
      setIsExporting(true);
      
      const data = await dataManager.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `rooferhq-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Update last backup time
      localStorage.setItem('rooferhq-last-backup', Date.now().toString());
      setLastBackup(Date.now());
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate import data
      if (!data.data || !data.timestamp || !data.version) {
        throw new Error('Invalid backup file format');
      }
      
      // Confirm import
      const confirmed = window.confirm(
        'This will replace all current data. Are you sure you want to continue?'
      );
      
      if (!confirmed) return;
      
      await dataManager.importData(data);
      
      // Update last backup time
      localStorage.setItem('rooferhq-last-backup', Date.now().toString());
      setLastBackup(Date.now());
      
      // Refresh health status
      await checkHealth();
      getStorageInfo();
      
      alert('Data imported successfully!');
      
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed: ' + error.message);
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const clearAllData = async () => {
    const confirmed = window.confirm(
      'This will permanently delete all data. Are you sure?'
    );
    
    if (!confirmed) return;
    
    try {
      // Clear all rooferhq data
      Object.keys(localStorage)
        .filter(key => key.startsWith('rooferhq-data'))
        .forEach(key => localStorage.removeItem(key));
      
      // Refresh status
      await checkHealth();
      getStorageInfo();
      setLastBackup(null);
      
      alert('All data cleared successfully!');
      
    } catch (error) {
      console.error('Clear data failed:', error);
      alert('Clear data failed: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-500" />
            Data Health Status
          </h3>
          <button
            onClick={checkHealth}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        
        {healthStatus && (
          <div className="space-y-3">
            <div className="flex items-center">
              {healthStatus.healthy ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              )}
              <span className={`font-medium ${
                healthStatus.healthy ? 'text-green-700' : 'text-red-700'
              }`}>
                {healthStatus.healthy ? 'All systems healthy' : 'Issues detected'}
              </span>
            </div>
            
            {healthStatus.issues.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-medium text-red-800 mb-2">Issues:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {healthStatus.issues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Pending Changes:</span>
                <span className="ml-2 font-medium">
                  {healthStatus.pendingChanges}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Auto-save:</span>
                <span className={`ml-2 font-medium ${
                  healthStatus.autoSaveEnabled ? 'text-green-600' : 'text-red-600'
                }`}>
                  {healthStatus.autoSaveEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Storage Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
          <HardDrive className="w-5 h-5 mr-2 text-blue-500" />
          Storage Information
        </h3>
        
        {storageInfo && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Used Storage</span>
                <span>{storageInfo.usedFormatted} / {storageInfo.totalFormatted}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    storageInfo.percentage > 80 ? 'bg-red-500' : 
                    storageInfo.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Last Backup:</span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {lastBackup ? formatDate(lastBackup) : 'Never'}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Backup Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
          <Database className="w-5 h-5 mr-2 text-purple-500" />
          Backup & Restore
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Export Data</h4>
            <p className="text-sm text-gray-600">
              Download a complete backup of all your data
            </p>
            <button
              onClick={exportData}
              disabled={isExporting}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Backup
                </>
              )}
            </button>
          </div>

          {/* Import */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Import Data</h4>
            <p className="text-sm text-gray-600">
              Restore data from a backup file
            </p>
            <label className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
              {isImporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Backup
                </>
              )}
              <input
                type="file"
                accept=".json"
                onChange={importData}
                disabled={isImporting}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Clear Data */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Danger Zone</h4>
          <p className="text-sm text-gray-600 mb-3">
            Permanently delete all data (this cannot be undone)
          </p>
          <button
            onClick={clearAllData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DataBackup;
