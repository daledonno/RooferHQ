import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2,
  RotateCcw
} from 'lucide-react';

const TakeAPicture = () => {
  const [stream, setStream] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [location, setLocation] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Get current date for folder naming
  const currentDate = new Date().toISOString().split('T')[0];

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const timestamp = new Date().toISOString();
        const locationName = location 
          ? `${location.lat.toFixed(6)},${location.lng.toFixed(6)}`
          : 'unknown-location';
        
        const newImage = {
          id: Date.now(),
          blob,
          timestamp,
          location,
          locationName,
          url: URL.createObjectURL(blob)
        };

        setCapturedImages(prev => [...prev, newImage]);
        setUploadStatus(prev => ({ ...prev, [newImage.id]: 'pending' }));
      }
      setIsCapturing(false);
    }, 'image/jpeg', 0.9);
  };

  // Upload to Google Drive (placeholder implementation)
  const uploadToGoogleDrive = async (image) => {
    setIsUploading(true);
    setUploadStatus(prev => ({ ...prev, [image.id]: 'uploading' }));

    try {
      // This is a placeholder for Google Drive API integration
      // In a real implementation, you would:
      // 1. Authenticate with Google Drive API
      // 2. Create a folder for the current date if it doesn't exist
      // 3. Upload the image with geo-tagged filename
      
      const folderName = `Roofing_Photos_${currentDate}`;
      const fileName = `${image.timestamp}_${image.locationName}.jpg`;
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll just simulate a successful upload
      setUploadStatus(prev => ({ ...prev, [image.id]: 'uploaded' }));
      
      console.log(`Would upload to Google Drive: ${folderName}/${fileName}`);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(prev => ({ ...prev, [image.id]: 'error' }));
    } finally {
      setIsUploading(false);
    }
  };

  // Upload all images
  const uploadAllImages = async () => {
    for (const image of capturedImages) {
      if (uploadStatus[image.id] === 'pending') {
        await uploadToGoogleDrive(image);
      }
    }
  };

  // Delete image
  const deleteImage = (imageId) => {
    setCapturedImages(prev => prev.filter(img => img.id !== imageId));
    setUploadStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[imageId];
      return newStatus;
    });
  };

  // Download image
  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.timestamp}_${image.locationName}.jpg`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto"
    >

      {/* Location and Date Info */}
      <div className="glass-card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-accent" />
              <span className="text-gray-800">Date: {currentDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={20} className="text-accent" />
              <span className="text-gray-800">
                Location: {location 
                  ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
                  : 'Getting location...'
                }
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Folder: Roofing_Photos_{currentDate}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Section */}
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Camera size={24} className="text-accent mr-2" />
              Camera
            </h2>
            
            {!stream ? (
              <div className="text-center py-12">
                <Camera size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Camera not started</p>
                <button
                  onClick={startCamera}
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start Camera
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover"
                  />
                  {isCapturing && (
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <div className="animate-pulse text-white text-lg font-medium">
                        Capturing...
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={capturePhoto}
                    disabled={isCapturing}
                    className="flex-1 bg-accent hover:bg-accent/80 disabled:bg-accent/50 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Camera size={20} className="mr-2" />
                    {isCapturing ? 'Capturing...' : 'Take Photo'}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Stop Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Section */}
          {capturedImages.length > 0 && (
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Upload size={20} className="text-accent mr-2" />
                  Upload to Google Drive
                </h3>
                <button
                  onClick={uploadAllImages}
                  disabled={isUploading}
                  className="bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Upload size={16} className="mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload All'}
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Photos will be uploaded to: <span className="text-accent">Roofing_Photos_{currentDate}</span>
              </p>
            </div>
          )}
        </div>

        {/* Captured Images */}
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle size={24} className="text-accent mr-2" />
              Captured Photos ({capturedImages.length})
            </h2>
            
            {capturedImages.length === 0 ? (
              <div className="text-center py-12">
                <Camera size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No photos captured yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {capturedImages.map((image) => (
                  <div key={image.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={image.url}
                        alt="Captured"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-800 font-medium">
                            {new Date(image.timestamp).toLocaleTimeString()}
                          </span>
                          {uploadStatus[image.id] === 'uploaded' && (
                            <CheckCircle size={16} className="text-green-400" />
                          )}
                          {uploadStatus[image.id] === 'uploading' && (
                            <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
                          )}
                          {uploadStatus[image.id] === 'error' && (
                            <AlertCircle size={16} className="text-red-400" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Location: {image.locationName}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadImage(image)}
                            className="text-accent hover:text-accent/80 text-sm flex items-center"
                          >
                            <Download size={14} className="mr-1" />
                            Download
                          </button>
                          {uploadStatus[image.id] === 'pending' && (
                            <button
                              onClick={() => uploadToGoogleDrive(image)}
                              className="text-green-400 hover:text-green-300 text-sm flex items-center"
                            >
                              <Upload size={14} className="mr-1" />
                              Upload
                            </button>
                          )}
                          <button
                            onClick={() => deleteImage(image.id)}
                            className="text-red-400 hover:text-red-300 text-sm flex items-center"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8"
      >
        <div className="glass-card border-l-4 border-accent">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            How it works
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>1. Start the camera and take photos of your work site</p>
            <p>2. Photos are automatically geo-tagged with your current location</p>
            <p>3. Upload photos to Google Drive organized by date</p>
            <p>4. Photos are named with timestamp and coordinates for easy identification</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TakeAPicture;
