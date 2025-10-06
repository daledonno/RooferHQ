import { useEffect, useRef, useState } from 'react';

const SimpleRouteMap = ({ officeLocation, postcodes, onMapLoad }) => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('Google Maps API key required. Using fallback display.');

  useEffect(() => {
    createDisplay();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      setTimeout(() => {
        if (mapRef.current) {
          createDisplay();
        }
      }, 100);
      return;
    }
    
    createDisplay();
  }, [officeLocation, postcodes]);

  const createDisplay = () => {
    if (!mapRef.current) {
      return;
    }
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div style="width: 100%; height: 100%; background-color: #f3f4f6; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px;">
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🗺️</div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Route Planning</h3>
          <p style="color: #4b5563; margin-bottom: 1rem;">Office: ${officeLocation}</p>
          ${postcodes.length > 0 ? `
            <div style="background-color: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h4 style="font-weight: 500; color: #1f2937; margin-bottom: 0.5rem;">Route Stops (${postcodes.length})</h4>
              <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                ${postcodes.map((postcode, index) => `
                  <div style="display: flex; align-items: center; font-size: 0.875rem;">
                    <span style="width: 24px; height: 24px; background-color: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; margin-right: 8px;">${index + 1}</span>
                    <span style="color: #374151;">${postcode}</span>
                  </div>
                `).join('')}
              </div>
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 0.75rem; color: #6b7280;">Click "Open in Maps" to view the full route with directions</p>
              </div>
            </div>
          ` : `
            <p style="color: #6b7280;">Add stops to see your route</p>
          `}
        </div>
      </div>
    `;

    setIsLoaded(true);
    if (onMapLoad) {
      onMapLoad(null);
    }
  };

  
  // Fallback display in case innerHTML doesn't work
  if (!isLoaded) {
    return (
      <div className="relative">
        <div className="w-full h-96 rounded-lg bg-gray-100 flex flex-col items-center justify-center p-6" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Route Planning</h3>
            <p className="text-gray-600 mb-4">Office: {officeLocation}</p>
            {postcodes.length > 0 ? (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-2">Route Stops ({postcodes.length})</h4>
                <div className="space-y-1">
                  {postcodes.map((postcode, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{postcode}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">Click "Open in Maps" to view the full route with directions</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Add stops to see your route</p>
            )}
          </div>
        </div>
        {error && (
          <div className="absolute top-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-1 rounded text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
      {error && (
        <div className="absolute top-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-1 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default SimpleRouteMap;
