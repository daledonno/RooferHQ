import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Ruler, 
  Calculator, 
  FileText, 
  Download, 
  MapPin, 
  Square, 
  Navigation,
  Settings,
  ExternalLink,
  Copy,
  Save
} from 'lucide-react';

const RoofMeasurement = () => {
  const [mapType, setMapType] = useState('embed'); // 'embed' or 'custom'
  const [measurements, setMeasurements] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('Liverpool, UK');
  const [mapUrl, setMapUrl] = useState('');

  // Generate Google Maps embed URL with measurement tools
  useEffect(() => {
    const encodedLocation = encodeURIComponent(currentLocation);
    // Use Google Maps embed with satellite view (t=k parameter forces satellite view)
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-2.9916!3d53.4084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI0JzMwLjIiTiAwwrAwNSc1MC4wIlc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk&q=${encodedLocation}&t=k&z=18`;
    setMapUrl(embedUrl);
  }, [currentLocation]);

  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };

  const addMeasurement = (type, value, unit) => {
    const newMeasurement = {
      id: Date.now(),
      type,
      value,
      unit,
      timestamp: new Date().toLocaleString(),
      location: currentLocation
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const clearMeasurements = () => {
    setMeasurements([]);
  };

  const exportMeasurements = () => {
    const data = {
      location: currentLocation,
      date: new Date().toLocaleDateString(),
      measurements: measurements
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roof-measurements-${currentLocation.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Ruler size={24} className="text-accent" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Roof Measurement Tools</h2>
                <p className="text-gray-600 text-sm">Use Google Maps to measure roof areas and distances</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMapType(mapType === 'embed' ? 'custom' : 'embed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mapType === 'embed' 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {mapType === 'embed' ? 'Embedded Map' : 'Custom Map'}
              </button>
            </div>
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="location-input"
                  name="location"
                  type="text"
                  value={currentLocation}
                  onChange={handleLocationChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Enter address or postcode"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(currentLocation)}`, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={16} />
                Open in Maps
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Navigation size={20} className="text-accent" />
                  Interactive Map
                </h3>
                <div className="text-sm text-gray-600">
                  Right-click on map to access measurement tools
                </div>
              </div>

              {mapType === 'embed' ? (
                <div className="relative">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC4xIlc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk&q=${encodeURIComponent(currentLocation)}&t=k&z=18`}
                    width="100%"
                    height="500"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps with Measurement Tools"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                    <div className="text-sm text-gray-800">
                      <p className="font-medium mb-1 text-gray-900">How to measure:</p>
                      <ul className="text-xs space-y-1 text-gray-700">
                        <li>• Right-click on map</li>
                        <li>• Select "Measure distance"</li>
                        <li>• Click points to measure</li>
                        <li>• Switch to satellite view (bottom right)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                    <div className="text-sm text-gray-800">
                      <p className="font-medium mb-1 text-gray-900">Map Controls:</p>
                      <ul className="text-xs space-y-1 text-gray-700">
                        <li>• Use +/- to zoom</li>
                        <li>• Click satellite icon for aerial view</li>
                        <li>• Drag to move around</li>
                        <li>• Right-click for measurement tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Settings size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Custom map implementation coming soon</p>
                  <p className="text-sm text-gray-500">For now, use the embedded Google Maps above</p>
                </div>
              )}
            </div>
          </div>

          {/* Measurements Panel */}
          <div className="space-y-6">
            {/* Quick Measurements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator size={20} className="text-accent" />
                Quick Measurements
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => addMeasurement('Area', '150', 'sq m')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Square size={16} className="text-accent" />
                    <span className="text-sm font-medium">Add Area</span>
                  </div>
                  <span className="text-xs text-gray-500">Click to add</span>
                </button>
                
                <button
                  onClick={() => addMeasurement('Distance', '25', 'm')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-accent" />
                    <span className="text-sm font-medium">Add Distance</span>
                  </div>
                  <span className="text-xs text-gray-500">Click to add</span>
                </button>
              </div>
            </div>

            {/* Measurement History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText size={20} className="text-accent" />
                  Measurements
                </h3>
                {measurements.length > 0 && (
                  <button
                    onClick={clearMeasurements}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {measurements.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Ruler size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No measurements yet</p>
                  <p className="text-xs text-gray-400 mt-1">Add measurements from the map</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {measurements.map((measurement) => (
                    <div key={measurement.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {measurement.type}
                        </span>
                        <span className="text-sm font-bold text-accent">
                          {measurement.value} {measurement.unit}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {measurement.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Options */}
            {measurements.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Download size={20} className="text-accent" />
                  Export Data
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={exportMeasurements}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <Save size={16} />
                    Export JSON
                  </button>
                  
                  <button
                    onClick={() => {
                      const text = measurements.map(m => 
                        `${m.type}: ${m.value} ${m.unit} (${m.timestamp})`
                      ).join('\n');
                      navigator.clipboard.writeText(text);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Copy size={16} />
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Use Google Maps Measurement Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Step 1: Switch to Satellite View</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Look for the satellite icon in bottom-right corner</li>
                <li>Click it to switch from map view to satellite view</li>
                <li>This shows actual aerial photos of buildings</li>
                <li>Much more accurate for roof measurements</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">For Area Measurement:</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Right-click on the map at your starting point</li>
                <li>Select "Measure distance" from the context menu</li>
                <li>Click around the perimeter of the roof</li>
                <li>Double-click to finish and see the area</li>
                <li>Use satellite view for better accuracy</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">For Distance Measurement:</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Right-click on the map at your starting point</li>
                <li>Select "Measure distance" from the context menu</li>
                <li>Click at your destination point</li>
                <li>View the distance measurement</li>
                <li>Add multiple points for complex measurements</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoofMeasurement;
