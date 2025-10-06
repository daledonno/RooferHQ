import { useState, useEffect, useCallback, useRef } from 'react';
import dataManager from '../utils/dataManager';

// Custom hook for data management
export const useDataManager = (key, initialData = null, options = {}) => {
  const {
    autoSave = true,
    validate = true,
    debounceMs = 1000
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  
  const debounceRef = useRef(null);
  const isInitialized = useRef(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const savedData = await dataManager.loadData(key, { validate });
        setData(savedData || initialData);
        setLastSaved(savedData ? Date.now() : null);
      } catch (err) {
        console.error(`Failed to load data for key: ${key}`, err);
        setError(err.message);
        setData(initialData);
      } finally {
        setLoading(false);
        isInitialized.current = true;
      }
    };

    loadData();
  }, [key, initialData, validate]);

  // Auto-save when data changes
  useEffect(() => {
    if (!isInitialized.current || !autoSave) return;

    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounce
    debounceRef.current = setTimeout(async () => {
      if (data !== null && data !== undefined) {
        await saveData(data);
      }
    }, debounceMs);

    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [data, autoSave, debounceMs]);

  // Save data function
  const saveData = useCallback(async (dataToSave = data, saveOptions = {}) => {
    try {
      setSaving(true);
      setError(null);
      
      const success = await dataManager.saveData(key, dataToSave, {
        validate,
        ...saveOptions
      });

      if (success) {
        setLastSaved(Date.now());
        dataManager.markAsChanged(key);
      }

      return success;
    } catch (err) {
      console.error(`Failed to save data for key: ${key}`, err);
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }, [key, data, validate]);

  // Update data function
  const updateData = useCallback((newData) => {
    setData(newData);
    dataManager.markAsChanged(key);
  }, [key]);

  // Force save function
  const forceSave = useCallback(async (dataToSave = data) => {
    return await saveData(dataToSave, { immediate: true });
  }, [saveData, data]);

  // Reset data function
  const resetData = useCallback(() => {
    setData(initialData);
    dataManager.markAsChanged(key);
  }, [initialData, key]);

  // Clear data function
  const clearData = useCallback(async () => {
    try {
      localStorage.removeItem(`rooferhq-data-${key}`);
      setData(initialData);
      setLastSaved(null);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [key, initialData]);

  // Check if data has unsaved changes
  const hasUnsavedChanges = dataManager.isChanged(key);

  return {
    data,
    setData: updateData,
    loading,
    saving,
    error,
    lastSaved,
    hasUnsavedChanges,
    saveData: forceSave,
    resetData,
    clearData,
    // Utility functions
    isDataValid: () => dataManager.validateData(data),
    getDataSize: () => JSON.stringify(data).length,
    exportData: () => dataManager.exportAllData(),
    importData: (importedData) => dataManager.importData(importedData)
  };
};

// Hook for managing multiple data keys
export const useMultiDataManager = (keys, options = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load all data
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const loadedData = {};
        for (const key of keys) {
          loadedData[key] = await dataManager.loadData(key, { validate: options.validate });
        }
        
        setData(loadedData);
      } catch (err) {
        console.error('Failed to load multiple data keys', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [keys, options.validate]);

  // Save all data
  const saveAllData = useCallback(async (dataToSave = data) => {
    try {
      setSaving(true);
      setError(null);
      
      const results = {};
      for (const [key, value] of Object.entries(dataToSave)) {
        results[key] = await dataManager.saveData(key, value, options);
      }
      
      return results;
    } catch (err) {
      console.error('Failed to save multiple data keys', err);
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }, [data, options]);

  // Update specific key
  const updateKey = useCallback((key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }));
    dataManager.markAsChanged(key);
  }, []);

  return {
    data,
    setData,
    loading,
    saving,
    error,
    saveAllData,
    updateKey,
    hasUnsavedChanges: dataManager.getPendingChanges().length > 0
  };
};

// Hook for form data management
export const useFormData = (key, initialData = {}, options = {}) => {
  const {
    autoSave = true,
    validate = true,
    debounceMs = 2000
  } = options;

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const [dirty, setDirty] = useState(false);

  // Load form data
  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoading(true);
        const savedData = await dataManager.loadData(key, { validate });
        setFormData(savedData || initialData);
      } catch (err) {
        setError(err.message);
        setFormData(initialData);
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [key, initialData, validate]);

  // Auto-save form data
  useEffect(() => {
    if (!autoSave || !dirty) return;

    const timeoutId = setTimeout(async () => {
      try {
        setSaving(true);
        await dataManager.saveData(key, formData, { validate });
        setDirty(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setSaving(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [formData, autoSave, debounceMs, dirty, key, validate]);

  // Update form field
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    setDirty(true);
    dataManager.markAsChanged(key);
  }, [key]);

  // Update multiple fields
  const updateFields = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
    setTouched(prev => ({
      ...prev,
      ...Object.keys(updates).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    }));
    setDirty(true);
    dataManager.markAsChanged(key);
  }, [key]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setTouched({});
    setDirty(false);
    setError(null);
  }, [initialData]);

  // Save form
  const saveForm = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);
      
      const success = await dataManager.saveData(key, formData, { validate, immediate: true });
      if (success) {
        setDirty(false);
      }
      return success;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }, [key, formData, validate]);

  return {
    formData,
    setFormData,
    updateField,
    updateFields,
    loading,
    saving,
    error,
    touched,
    dirty,
    resetForm,
    saveForm,
    isFieldTouched: (field) => touched[field] || false,
    isFieldDirty: (field) => formData[field] !== initialData[field]
  };
};

export default useDataManager;
