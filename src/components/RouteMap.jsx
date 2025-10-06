import { useEffect, useRef, useState } from 'react';

const RouteMap = ({ officeLocation, postcodes, onMapLoad }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Create fallback display
  const createFallbackDisplay = () => {
    if (!mapRef.current) {
      return;
    }

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div class="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-6">
        <div class="text-center">
          <div class="text-6xl mb-4">🗺️</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Route Planning</h3>
          <p class="text-gray-600 mb-4">Office: ${officeLocation}</p>
          ${postcodes.length > 0 ? `
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <h4 class="font-medium text-gray-800 mb-2">Route Stops (${postcodes.length})</h4>
              <div class="space-y-1">
                ${postcodes.map((postcode, index) => `
                  <div class="flex items-center text-sm">
                    <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">${index + 1}</span>
                    <span class="text-gray-700">${postcode}</span>
                  </div>
                `).join('')}
              </div>
              <div class="mt-4 pt-4 border-t">
                <p class="text-xs text-gray-500">Click "Open in Maps" to view the full route with directions</p>
              </div>
            </div>
          ` : `
            <p class="text-gray-500">Add stops to see your route</p>
          `}
        </div>
      </div>
    `;

    setIsLoaded(true);
    if (onMapLoad) {
      onMapLoad(null);
    }
  };

  useEffect(() => {
    // Always use fallback for now since we don't have valid API keys
    setError('Google Maps API key required. Using fallback display.');
    createFallbackDisplay();
  }, []);

  useEffect(() => {
    // Update fallback display when postcodes or office location changes
    if (isLoaded && error) {
      createFallbackDisplay();
    }
  }, [officeLocation, postcodes, isLoaded, error]);

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute top-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-1 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default RouteMap;