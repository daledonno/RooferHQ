import { motion } from 'framer-motion';
import { useState } from 'react';
import { Map, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2 } from 'lucide-react';
import postcodeMapImage from '../assets/postcodemap.png';

const PostcodeMap = () => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = postcodeMapImage;
    link.download = 'postcode-map.png';
    link.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 max-w-7xl mx-auto ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-200' : ''}`}
    >
      <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg overflow-hidden">
        {/* Controls */}
        <div className="flex items-center justify-end p-6 border-b border-gray-200">
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} className="text-gray-600" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} className="text-gray-600" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            
            <button
              onClick={handleReset}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={16} className="text-gray-600" />
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Download Map"
            >
              <Download size={16} className="text-gray-600" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <Maximize2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative overflow-auto bg-gray-50" style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '70vh' }}>
          <div className="flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={postcodeMapImage}
                alt="Postcode Map - Service Areas and Coverage Zones"
                className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-in-out'
                }}
                draggable={false}
              />
              
              {/* Map Overlay Info */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">Service Coverage</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Primary Service Area</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Extended Coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Limited Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>📍 Interactive Postcode Map</span>
              <span>•</span>
              <span>🗺️ Service Area Visualization</span>
              <span>•</span>
              <span>📊 Coverage Analysis</span>
            </div>
            <div className="text-xs text-gray-500">
              Use zoom controls to explore different areas
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Map Legend & Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Service Areas</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span>Primary coverage - Same day service</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span>Extended coverage - Next day service</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span>Limited coverage - Quote required</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Postcode Zones</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• L1 City Centre</div>
              <div>• Central London (SW, SE, W, E, N, NW)</div>
              <div>• Greater London (Outer boroughs)</div>
              <div>• Home Counties (Surrounding areas)</div>
              <div>• Special coverage zones</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Quick Reference</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Use zoom controls to explore</div>
              <div>• Download for offline reference</div>
              <div>• Fullscreen for detailed view</div>
              <div>• Contact office for coverage queries</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostcodeMap;