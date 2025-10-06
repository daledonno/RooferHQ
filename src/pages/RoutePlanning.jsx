import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Plus, Trash2, Navigation, Clock, Route, Home, Search, GripVertical, Map, Save, AlertCircle, CheckCircle } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import { useDataManager } from '../hooks/useDataManager';

const RoutePlanning = () => {
  const [newPostcode, setNewPostcode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const mapRef = useRef(null);

  // Use data manager for persistent data
  const {
    data: routeData,
    setData: setRouteData,
    loading,
    saving,
    error,
    hasUnsavedChanges,
    saveData: forceSave
  } = useDataManager('route-planning', {
    postcodes: [],
    officeLocation: 'Chatterton Road, Liverpool, L14 1PA',
    optimizedRoute: [],
    totalDistance: 0,
    totalTime: 0,
    postcodeData: {
      'Chatterton Road, Liverpool, L14 1PA': {
        lat: 53.4084,
        lng: -2.9916,
        name: 'Office - Liverpool'
      }
    }
  });

  // Extract data from routeData
  const {
    postcodes = [],
    officeLocation = 'Chatterton Road, Liverpool, L14 1PA',
    optimizedRoute = [],
    totalDistance = 0,
    totalTime = 0,
    postcodeData = {
      'Chatterton Road, Liverpool, L14 1PA': {
        lat: 53.4084,
        lng: -2.9916,
        name: 'Office - Liverpool'
      }
    }
  } = routeData || {};


  // Generate Google Maps directions URL for the "Open in Maps" button
  const generateDirectionsUrl = () => {
    if (postcodes.length === 0) return '';
    const allStops = [officeLocation, ...postcodes];
    return `https://www.google.com/maps/dir/${allStops.map(stop => encodeURIComponent(stop)).join('/')}`;
  };

  const addPostcode = () => {
    if (newPostcode.trim() && !postcodes.includes(newPostcode.trim())) {
      const postcode = newPostcode.trim();
      const updatedPostcodes = [...postcodes, postcode];
      
      // Store the postcode data (in a real app, you'd geocode this)
      const updatedPostcodeData = {
        ...postcodeData,
        [postcode]: {
          lat: 53.4084 + (Math.random() - 0.5) * 0.1, // Approximate Liverpool area
          lng: -2.9916 + (Math.random() - 0.5) * 0.1, // Approximate Liverpool area
          name: postcode
        }
      };
      
      setRouteData(prev => ({
        ...prev,
        postcodes: updatedPostcodes,
        postcodeData: updatedPostcodeData
      }));
      
      setNewPostcode('');
    }
  };

  const removePostcode = (index) => {
    const updatedPostcodes = postcodes.filter((_, i) => i !== index);
    setRouteData(prev => ({
      ...prev,
      postcodes: updatedPostcodes
    }));
  };

  const optimizeRoute = async () => {
    if (postcodes.length === 0) return;
    
    setIsOptimizing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple nearest neighbor algorithm for route optimization
    const startPoint = officeLocation;
    const unvisited = [...postcodes];
    const route = [startPoint];
    let currentPoint = startPoint;
    
    while (unvisited.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = calculateDistance(currentPoint, unvisited[0]);
      
      for (let i = 1; i < unvisited.length; i++) {
        const distance = calculateDistance(currentPoint, unvisited[i]);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
      
      currentPoint = unvisited[nearestIndex];
      route.push(currentPoint);
      unvisited.splice(nearestIndex, 1);
    }
    
    // Return to office
    route.push(startPoint);
    
    // Calculate total distance and time
    let totalDist = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDist += calculateDistance(route[i], route[i + 1]);
    }
    
    const distance = Math.round(totalDist * 10) / 10;
    const time = Math.round(totalDist * 1.5); // Rough estimate: 1.5 minutes per km
    
    setRouteData(prev => ({
      ...prev,
      optimizedRoute: route,
      totalDistance: distance,
      totalTime: time
    }));
    
    setIsOptimizing(false);
  };

  const calculateDistance = (postcode1, postcode2) => {
    // In a real implementation, you would geocode the postcodes to get coordinates
    // For now, we'll use a simple estimation based on postcode similarity
    // This is a placeholder - in production you'd use a geocoding service
    
    // Simple distance estimation (not accurate, just for demonstration)
    const baseDistance = 5; // Base 5km between different postcodes
    const randomVariation = Math.random() * 10; // Add some randomness
    
    return baseDistance + randomVariation;
  };

  const clearRoute = () => {
    setPostcodes([]);
    setOptimizedRoute([]);
    setTotalDistance(0);
    setTotalTime(0);
  };

  // Drag and drop functions
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newPostcodes = [...postcodes];
    const draggedItem = newPostcodes[draggedIndex];
    
    // Remove the dragged item
    newPostcodes.splice(draggedIndex, 1);
    
    // Insert at new position
    const newIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newPostcodes.splice(newIndex, 0, draggedItem);
    
    setRouteData(prev => ({ ...prev, postcodes: newPostcodes }));
    setDragOverIndex(null);
    
    // Auto-optimize route after reordering
    if (optimizedRoute.length > 0) {
      setTimeout(() => {
        optimizeRoute();
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Navigation size={24} className="text-accent mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Route Planner</h2>
              </div>
              
              {/* Save Status */}
              <div className="flex items-center space-x-2">
                {saving && (
                  <div className="flex items-center text-blue-600 text-sm">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
                    Saving...
                  </div>
                )}
                {hasUnsavedChanges && !saving && (
                  <div className="flex items-center text-orange-600 text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    Unsaved
                  </div>
                )}
                {!hasUnsavedChanges && !saving && !loading && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle size={16} className="mr-1" />
                    Saved
                  </div>
                )}
                {error && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    Error
                  </div>
                )}
              </div>
            </div>

            {/* Office Location */}
            <div className="mb-6">
              <label htmlFor="office-location" className="block text-sm font-semibold text-gray-800 mb-2">
                <Home size={16} className="inline mr-2" />
                Office Location
              </label>
              <input
                id="office-location"
                name="office-location"
                type="text"
                value={officeLocation}
                onChange={(e) => setRouteData(prev => ({ ...prev, officeLocation: e.target.value }))}
                placeholder="Enter office address or postcode"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Add Postcodes */}
            <div className="mb-6">
              <label htmlFor="postcode-input" className="block text-sm font-semibold text-gray-800 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Add Stops
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Enter any UK postcode or address. In production, these would be geocoded for accurate routing.
              </p>
              <div className="flex space-x-2">
                <input
                  id="postcode-input"
                  name="postcode"
                  type="text"
                  value={newPostcode}
                  onChange={(e) => setNewPostcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPostcode()}
                  placeholder="Enter postcode or address..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500"
                />
                <button
                  onClick={addPostcode}
                  className="px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Postcode List */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Stops ({postcodes.length})</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {postcodes.map((postcode, index) => (
                  <motion.div
                    key={`${postcode}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-move transition-all duration-200 ${
                      dragOverIndex === index 
                        ? 'bg-accent/20 border-2 border-accent border-dashed' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } ${draggedIndex === index ? 'opacity-50' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <GripVertical size={14} className="text-gray-400 mr-2 cursor-grab" />
                      <span className="text-sm font-medium text-gray-600 mr-2">{index + 1}.</span>
                      <span className="text-sm text-gray-800">{postcode}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        (Stop {index + 1})
                      </span>
                    </div>
                    <button
                      onClick={() => removePostcode(index)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
                {postcodes.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No stops added yet. Add postcodes above to start planning your route.
                  </div>
                )}
              </div>
            </div>

            {/* Route Actions */}
            <div className="space-y-3">
              <button
                onClick={optimizeRoute}
                disabled={postcodes.length === 0 || isOptimizing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  postcodes.length === 0 || isOptimizing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg'
                }`}
              >
                {isOptimizing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Optimizing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Route size={16} className="mr-2" />
                    Optimize Route
                  </div>
                )}
              </button>

              <button
                onClick={clearRoute}
                className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Route Summary */}
            {optimizedRoute.length > 0 && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Route Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="text-gray-600 mr-2" />
                    <span className="text-gray-700">Estimated Time: {totalTime} minutes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Route size={14} className="text-gray-600 mr-2" />
                    <span className="text-gray-700">Total Distance: {totalDistance} km</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map and Route Display */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MapPin size={24} className="text-accent mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Route Map</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const routeUrl = generateDirectionsUrl();
                    if (routeUrl) {
                      window.open(routeUrl, '_blank');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  disabled={postcodes.length === 0}
                >
                  <Navigation size={16} />
                  Open in Maps
                </button>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mb-6">
              <div className="relative">
                <GoogleMap 
                  officeLocation={officeLocation}
                  postcodes={postcodes}
                  optimizedRoute={optimizedRoute}
                  postcodeData={postcodeData}
                  height="400px"
                  onMapReady={(map) => {
                    // Map ready callback
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                  <div className="text-sm text-gray-800">
                    <p className="font-medium mb-1 text-gray-900">Office Location</p>
                    <p className="text-xs text-gray-600">{officeLocation}</p>
                    {postcodes.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        {postcodes.length} stops added - Route displayed with pins
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Note: API key required for full map functionality
                    </p>
                  </div>
                </div>
                {postcodes.length > 0 && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                    <div className="text-sm text-gray-800">
                      <p className="font-medium mb-1 text-gray-900">Route Stops</p>
                      <div className="text-xs space-y-1 text-gray-700 max-h-32 overflow-y-auto">
                        {postcodes.map((postcode, index) => (
                          <div key={postcode} className="flex items-center">
                            <span className="w-4 h-4 bg-blue-500 rounded-full mr-2 text-white text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span>{postcode}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Optimized Route Display */}
            {optimizedRoute.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Optimized Route</h3>
                  <span className="text-xs text-gray-500">Drag to reorder</span>
                </div>
                <div className="space-y-2">
                  {optimizedRoute.map((postcode, index) => {
                    const isOffice = index === 0 || index === optimizedRoute.length - 1;
                    return (
                      <motion.div
                        key={`route-${postcode}-${index}`}
                        draggable={!isOffice}
                        onDragStart={!isOffice ? (e) => handleDragStart(e, index - 1) : undefined}
                        onDragEnd={!isOffice ? handleDragEnd : undefined}
                        onDragOver={!isOffice ? (e) => handleDragOver(e, index - 1) : undefined}
                        onDragLeave={!isOffice ? handleDragLeave : undefined}
                        onDrop={!isOffice ? (e) => handleDrop(e, index - 1) : undefined}
                        className={`flex items-center transition-all duration-200 ${
                          !isOffice ? 'cursor-move hover:bg-gray-100 p-1 rounded' : ''
                        } ${
                          !isOffice && dragOverIndex === index - 1 
                            ? 'bg-accent/20 border-2 border-accent border-dashed' 
                            : ''
                        } ${!isOffice && draggedIndex === index - 1 ? 'opacity-50' : ''}`}
                        whileHover={!isOffice ? { scale: 1.02 } : {}}
                        whileTap={!isOffice ? { scale: 0.98 } : {}}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                          isOffice
                            ? 'bg-accent text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}>
                          {isOffice ? '🏢' : index}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-800">{postcode}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            (Stop {index})
                          </span>
                        </div>
                        {!isOffice && (
                          <GripVertical size={12} className="text-gray-400 cursor-grab" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoutePlanning;