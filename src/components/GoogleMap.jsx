import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ 
  postcodes = [], 
  optimizedRoute = [], 
  officeLocation = 'SW1A 1AA',
  postcodeData = {},
  height = '400px',
  onMapReady = () => {}
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const routePolylineRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapContainerReady, setMapContainerReady] = useState(false);

  // Sample postcode data for demonstration
  const defaultPostcodeData = {
    'SW1A 1AA': { lat: 51.4994, lng: -0.1245, name: 'Westminster' },
    'E1 6AN': { lat: 51.5154, lng: -0.0725, name: 'Tower Hamlets' },
    'NW1 6XE': { lat: 51.5390, lng: -0.1426, name: 'Camden' },
    'SE1 9RT': { lat: 51.5045, lng: -0.0865, name: 'Southwark' },
    'W1K 6TF': { lat: 51.5074, lng: -0.1278, name: 'Mayfair' },
    'N1 9GU': { lat: 51.5365, lng: -0.1038, name: 'Islington' },
    'SW6 1HS': { lat: 51.4746, lng: -0.1960, name: 'Fulham' },
    'E14 5AB': { lat: 51.5074, lng: -0.0178, name: 'Canary Wharf' }
  };

  const finalPostcodeData = { ...defaultPostcodeData, ...postcodeData };

  // Ref callback to ensure ref is set
  const setMapRef = (element) => {
    mapRef.current = element;
    if (element) {
      console.log('GoogleMap: mapRef set to element:', element);
      setMapContainerReady(true);
    }
  };

  // Initialize map when container is ready
  useEffect(() => {
    if (mapContainerReady && mapRef.current && isLoading) {
      console.log('GoogleMap: Container ready, initializing map...');
      const initializeMap = async () => {
        try {
          console.log('GoogleMap: Starting initialization...');
          console.log('GoogleMap: mapRef.current:', mapRef.current);
          setIsLoading(true);
          setError(null);

          // Get API key from localStorage or environment
          const savedKeys = localStorage.getItem('rooferhq-api-keys');
          let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          
          console.log('Checking for API key...');
          console.log('Environment API key exists:', !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
          console.log('localStorage savedKeys:', savedKeys);
          
          if (savedKeys) {
            try {
              const parsedKeys = JSON.parse(savedKeys);
              console.log('Parsed keys:', parsedKeys);
              if (parsedKeys.googleMaps && parsedKeys.googleMaps.trim()) {
                apiKey = parsedKeys.googleMaps;
                console.log('Using saved Google Maps API key');
              }
            } catch (error) {
              console.error('Error parsing saved API keys:', error);
            }
          }

          console.log('Using API Key:', apiKey ? apiKey.substring(0, 10) + '...' : 'No API key found');
          console.log('Environment API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'Set' : 'Not set');
          console.log('Saved Keys:', savedKeys);
          
          if (!apiKey) {
            console.log('GoogleMap: No API key found, showing fallback');
            setError('No Google Maps API key found. Please add your API key in Settings.');
            setIsLoading(false);
            return;
          }
          
          console.log('GoogleMap: API key found, proceeding with map initialization');

          // Check if Google Maps is already loaded
          if (window.google && window.google.maps) {
            console.log('Google Maps already loaded, creating map directly');
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 51.5074, lng: -0.1278 },
              zoom: 11,
              mapTypeId: 'roadmap'
            });
            mapInstanceRef.current = map;
            onMapReady(map);
            setIsLoading(false);
            return;
          }

          // Initialize Google Maps Loader
          const loader = new Loader({
            apiKey: apiKey,
            version: 'weekly',
            libraries: ['geometry', 'places']
          });

          console.log('Loading Google Maps libraries...');
          
          // Add timeout for map loading
          const loadingTimeout = setTimeout(() => {
            console.log('GoogleMap: Loading timeout reached');
            setError('Map loading timed out. Please check your internet connection and API key.');
            setIsLoading(false);
          }, 10000); // 10 second timeout
          
          const { Map } = await loader.importLibrary('maps');
          const { Marker } = await loader.importLibrary('marker');
          const { Polyline } = await loader.importLibrary('geometry');
          
          clearTimeout(loadingTimeout);

          console.log('Creating map instance...');
          // Create map instance
          const map = new Map(mapRef.current, {
            center: { lat: 51.5074, lng: -0.1278 }, // London center
            zoom: 11,
            mapTypeId: 'roadmap',
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          mapInstanceRef.current = map;
          onMapReady(map);
          console.log('Map created successfully');

          setIsLoading(false);
        } catch (err) {
          console.error('Error loading Google Maps:', err);
          console.error('Error details:', {
            message: err.message,
            name: err.name,
            stack: err.stack
          });
          setError(`Failed to load map: ${err.message}. Please check your API key and ensure Maps JavaScript API is enabled.`);
          setIsLoading(false);
        }
      };

      initializeMap();
    }
  }, [mapContainerReady, isLoading]);

  // Update markers when postcodes change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add office marker
    const officeData = finalPostcodeData[officeLocation];
    if (officeData) {
      const officeMarker = new window.google.maps.Marker({
        position: { lat: officeData.lat, lng: officeData.lng },
        map: mapInstanceRef.current,
        title: `Office: ${officeLocation}`,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#FF9100" stroke="#fff" stroke-width="3"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🏢</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });
      markersRef.current.push(officeMarker);
    }

    // Add postcode markers
    postcodes.forEach((postcode, index) => {
      const data = finalPostcodeData[postcode];
      if (data) {
        const marker = new window.google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map: mapInstanceRef.current,
          title: `${postcode} - ${data.name}`,
          label: {
            text: (index + 1).toString(),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          },
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#3B82F6" stroke="#fff" stroke-width="2"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
            anchor: new window.google.maps.Point(12, 12)
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-gray-800">${postcode}</h3>
              <p class="text-sm text-gray-600">${data.name}</p>
              <p class="text-xs text-gray-500">Stop ${index + 1}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      }
    });

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [postcodes, officeLocation, finalPostcodeData]);

  // Update route polyline when optimized route changes
  useEffect(() => {
    if (!mapInstanceRef.current || optimizedRoute.length === 0) {
      if (routePolylineRef.current) {
        routePolylineRef.current.setMap(null);
        routePolylineRef.current = null;
      }
      return;
    }

    // Clear existing polyline
    if (routePolylineRef.current) {
      routePolylineRef.current.setMap(null);
    }

    // Create route path
    const routePath = optimizedRoute.map(postcode => {
      const data = finalPostcodeData[postcode];
      return data ? { lat: data.lat, lng: data.lng } : null;
    }).filter(Boolean);

    if (routePath.length > 1) {
      const polyline = new window.google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: '#FF9100',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: mapInstanceRef.current
      });

      routePolylineRef.current = polyline;
    }
  }, [optimizedRoute, finalPostcodeData]);

  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height }}
      >
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-600 font-medium">Map Error</p>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
          <p className="text-xs text-gray-500 mt-2">
            Check browser console for details. API Key: {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'Set' : 'Not set'}
          </p>
          <div className="mt-4 space-y-2">
            <button 
              onClick={() => window.location.reload()} 
              className="px-3 py-1 bg-accent text-white rounded text-xs hover:bg-accent/90 mr-2"
            >
              Retry
            </button>
            <button 
              onClick={() => window.open('/settings', '_blank')} 
              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={setMapRef} 
        className="w-full rounded-lg"
        style={{ height }}
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-accent rounded-full mr-2"></div>
            <span className="text-gray-700">Office</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-700">Stops</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-accent mr-2"></div>
            <span className="text-gray-700">Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;