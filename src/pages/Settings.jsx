import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Map, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Copy,
  Brain,
  Calendar,
  Cloud,
  BarChart3,
  Mail,
  Phone,
  Database
} from 'lucide-react';
import DataBackup from '../components/DataBackup';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('api-keys');
  
  const [apiKeys, setApiKeys] = useState({
    googleMaps: '',
    openai: '',
    googleCalendar: '',
    googleDrive: '',
    hubspot: '',
    salesforce: '',
    analytics: '',
    emailService: '',
    smsService: ''
  });
  
  const [showKeys, setShowKeys] = useState({
    googleMaps: false,
    openai: false,
    googleCalendar: false,
    googleDrive: false,
    hubspot: false,
    salesforce: false,
    analytics: false,
    emailService: false,
    smsService: false
  });
  
  const [saveStatus, setSaveStatus] = useState({
    googleMaps: null,
    openai: null,
    googleCalendar: null,
    googleDrive: null,
    hubspot: null,
    salesforce: null,
    analytics: null,
    emailService: null,
    smsService: null
  });

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('rooferhq-api-keys');
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        setApiKeys(parsedKeys);
      } catch (error) {
        console.error('Error loading API keys:', error);
      }
    }
  }, []);

  const handleApiKeyChange = (keyType, value) => {
    setApiKeys(prev => ({
      ...prev,
      [keyType]: value
    }));
  };

  const toggleKeyVisibility = (keyType) => {
    setShowKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }));
  };

  const saveApiKey = async (keyType) => {
    setSaveStatus(prev => ({
      ...prev,
      [keyType]: 'saving'
    }));

    try {
      // Save to localStorage
      const updatedKeys = { ...apiKeys };
      localStorage.setItem('rooferhq-api-keys', JSON.stringify(updatedKeys));
      
      // Simulate API validation (in real app, you'd validate the key)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus(prev => ({
        ...prev,
        [keyType]: 'saved'
      }));

      // Clear success status after 3 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({
          ...prev,
          [keyType]: null
        }));
      }, 3000);

    } catch (error) {
      setSaveStatus(prev => ({
        ...prev,
        [keyType]: 'error'
      }));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard');
    });
  };

  const apiKeyConfigs = [
    {
      key: 'googleMaps',
      title: 'Google Maps API',
      description: 'Required for Route Planning map visualization and geocoding',
      placeholder: 'AIzaSy...',
      icon: Map,
      docsUrl: 'https://console.cloud.google.com/google/maps-apis',
      required: true,
      instructions: [
        'Go to Google Cloud Console',
        'Enable Maps JavaScript API and Geocoding API',
        'Create an API key',
        'Restrict the key to your domain for security'
      ]
    },
    {
      key: 'openai',
      title: 'OpenAI API',
      description: 'Powers AI Business Insights, automated analysis, and intelligent recommendations',
      placeholder: 'sk-...',
      icon: Brain,
      docsUrl: 'https://platform.openai.com/api-keys',
      required: false,
      instructions: [
        'Go to OpenAI Platform',
        'Sign up or log in to your account',
        'Navigate to API Keys section',
        'Create a new secret key',
        'Copy and paste the key here'
      ]
    },
    {
      key: 'googleCalendar',
      title: 'Google Calendar API',
      description: 'Sync appointments, schedule management, and calendar integration',
      placeholder: 'AIzaSy...',
      icon: Calendar,
      docsUrl: 'https://console.cloud.google.com/apis/library/calendar-json.googleapis.com',
      required: false,
      instructions: [
        'Go to Google Cloud Console',
        'Enable Google Calendar API',
        'Create credentials (OAuth 2.0 or API key)',
        'Configure OAuth consent screen if needed',
        'Add the API key or OAuth credentials'
      ]
    },
    {
      key: 'googleDrive',
      title: 'Google Drive API',
      description: 'Automatic photo uploads, document storage, and file management',
      placeholder: 'AIzaSy...',
      icon: Cloud,
      docsUrl: 'https://console.cloud.google.com/apis/library/drive.googleapis.com',
      required: false,
      instructions: [
        'Go to Google Cloud Console',
        'Enable Google Drive API',
        'Create API credentials',
        'Set up OAuth 2.0 for file access',
        'Configure file permissions and scopes'
      ]
    },
    {
      key: 'hubspot',
      title: 'HubSpot CRM API',
      description: 'Customer relationship management, lead tracking, and sales pipeline',
      placeholder: 'pat-...',
      icon: Database,
      docsUrl: 'https://developers.hubspot.com/docs/api/private-apps',
      required: false,
      instructions: [
        'Log in to your HubSpot account',
        'Go to Settings > Integrations > Private Apps',
        'Create a new private app',
        'Select required scopes (contacts, deals, etc.)',
        'Copy the access token'
      ]
    },
    {
      key: 'salesforce',
      title: 'Salesforce API',
      description: 'Advanced CRM integration, sales automation, and customer data sync',
      placeholder: '00D...',
      icon: BarChart3,
      docsUrl: 'https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/',
      required: false,
      instructions: [
        'Log in to Salesforce',
        'Go to Setup > Apps > App Manager',
        'Create a new Connected App',
        'Enable OAuth settings',
        'Generate client ID and secret'
      ]
    },
    {
      key: 'analytics',
      title: 'Google Analytics API',
      description: 'Website traffic analysis, conversion tracking, and marketing insights',
      placeholder: 'AIzaSy...',
      icon: BarChart3,
      docsUrl: 'https://developers.google.com/analytics/devguides/reporting/core/v4',
      required: false,
      instructions: [
        'Go to Google Cloud Console',
        'Enable Google Analytics Reporting API',
        'Create service account credentials',
        'Download JSON key file',
        'Add service account to Google Analytics'
      ]
    },
    {
      key: 'emailService',
      title: 'Email Service API',
      description: 'Automated email campaigns, notifications, and customer communications',
      placeholder: 'API key...',
      icon: Mail,
      docsUrl: 'https://sendgrid.com/docs/api-reference/',
      required: false,
      instructions: [
        'Sign up for SendGrid or similar service',
        'Verify your domain',
        'Create API key with appropriate permissions',
        'Configure webhook settings',
        'Test email delivery'
      ]
    },
    {
      key: 'smsService',
      title: 'SMS Service API',
      description: 'Text message notifications, appointment reminders, and customer updates',
      placeholder: 'API key...',
      icon: Phone,
      docsUrl: 'https://www.twilio.com/docs/sms',
      required: false,
      instructions: [
        'Sign up for Twilio or similar SMS service',
        'Get your Account SID and Auth Token',
        'Purchase a phone number',
        'Configure webhook URLs',
        'Test SMS delivery'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto"
    >
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('api-keys')}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
            activeTab === 'api-keys'
              ? 'bg-white text-accent shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Key className="w-4 h-4 mr-2" />
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('data-backup')}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
            activeTab === 'data-backup'
              ? 'bg-white text-accent shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Database className="w-4 h-4 mr-2" />
          Data Backup
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'api-keys' && (
        <>
        <div className="space-y-8">
        <div className="flex items-center mb-6">
          <Key size={24} className="text-accent mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">API Integrations</h2>
        </div>

        {/* API Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Brain size={20} className="text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">AI & Analytics</h3>
            </div>
            <p className="text-blue-700 text-sm">OpenAI, Analytics, Business Intelligence</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Calendar size={20} className="text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">Productivity</h3>
            </div>
            <p className="text-green-700 text-sm">Calendar, Drive, Maps, Email</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Database size={20} className="text-purple-600 mr-2" />
              <h3 className="font-semibold text-purple-800">CRM & Sales</h3>
            </div>
            <p className="text-purple-700 text-sm">HubSpot, Salesforce, SMS</p>
          </div>
        </div>

        {apiKeyConfigs.map((config) => {
          const Icon = config.icon;
          const currentKey = apiKeys[config.key] || '';
          const isVisible = showKeys[config.key];
          const status = saveStatus[config.key];

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      {config.title}
                      {config.required && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          Required
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{config.description}</p>
                  </div>
                </div>
                
                <a
                  href={config.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-colors"
                >
                  <span className="text-sm">Docs</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* API Key Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      id={`api-key-${config.key}`}
                      name={`api-key-${config.key}`}
                      type={isVisible ? 'text' : 'password'}
                      value={currentKey}
                      onChange={(e) => handleApiKeyChange(config.key, e.target.value)}
                      placeholder={config.placeholder}
                      className="w-full p-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                      {currentKey && (
                        <button
                          onClick={() => copyToClipboard(currentKey)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => toggleKeyVisibility(config.key)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title={isVisible ? 'Hide key' : 'Show key'}
                      >
                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => saveApiKey(config.key)}
                    disabled={!currentKey || status === 'saving'}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      !currentKey || status === 'saving'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg'
                    }`}
                  >
                    {status === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : status === 'saved' ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Saved</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle size={16} />
                        <span>Error</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Setup Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Setup Instructions:</h4>
                <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                  {config.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              {/* Status Messages */}
              {status === 'saved' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-600 mr-2" />
                    <span className="text-green-800 text-sm">API key saved successfully!</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle size={16} className="text-red-600 mr-2" />
                    <span className="text-red-800 text-sm">Failed to save API key. Please try again.</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Integration Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 size={20} className="text-blue-600 mr-2" />
          Integration Status Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/80 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Required APIs</span>
              <span className="text-sm text-gray-500">1/1</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Google Maps configured</p>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">AI Features</span>
              <span className="text-sm text-gray-500">0/1</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">OpenAI not configured</p>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Productivity</span>
              <span className="text-sm text-gray-500">0/3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Calendar, Drive, Email pending</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              handleApiKeyChange('googleMaps', '');
              setTimeout(() => saveApiKey('googleMaps'), 100);
            }}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm"
          >
            Setup Google Maps
          </button>
          <button
            onClick={() => {
              // This would open a modal or guide for OpenAI setup
              alert('OpenAI setup guide would open here');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Setup AI Features
          </button>
          <button
            onClick={() => {
              // This would open a modal or guide for calendar setup
              alert('Calendar integration guide would open here');
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Setup Calendar
          </button>
        </div>
      </motion.div>

      {/* Quick Setup Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 bg-accent/10 border border-accent/20 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Setup</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get started quickly with these essential integrations:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Essential APIs</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Google Maps (Required)</li>
              <li>• OpenAI (AI Insights)</li>
              <li>• Google Calendar (Scheduling)</li>
            </ul>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Google Drive (Photo Storage)</li>
              <li>• CRM Integration (HubSpot/Salesforce)</li>
              <li>• Email & SMS Services</li>
            </ul>
          </div>
        </div>
      </motion.div>
        </>
      )}

      {/* Data Backup Tab */}
      {activeTab === 'data-backup' && (
        <DataBackup />
      )}
    </motion.div>
  );
};

export default Settings;
