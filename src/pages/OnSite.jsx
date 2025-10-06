import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
import { 
  HardHat, 
  Shield, 
  Ruler, 
  Camera, 
  Clipboard, 
  Wrench,
  CameraIcon
} from 'lucide-react';

const OnSite = () => {
  const onSiteTools = [
    {
      title: 'Safety Checklists',
      description: 'Comprehensive safety protocols and checklists for on-site work.',
      icon: Shield,
      path: '/onsite/safety',
      image: placeholderImages.onsite
    },
    {
      title: 'Measurement Tools',
      description: 'Digital measurement guides and calculation tools for accurate estimates.',
      icon: Ruler,
      path: '/onsite/measurements',
      image: placeholderImages.onsite
    },
    {
      title: 'Take A Picture',
      description: 'Capture photos on-site and automatically upload to Google Drive with geo-tagging.',
      icon: CameraIcon,
      path: '/onsite/take-picture',
      image: placeholderImages.onsite
    },
    {
      title: 'Photo Documentation',
      description: 'Photo capture and documentation tools for project records.',
      icon: Camera,
      path: '/onsite/photos',
      image: placeholderImages.onsite
    },
    {
      title: 'Work Orders',
      description: 'Digital work order forms and job tracking systems.',
      icon: Clipboard,
      path: '/onsite/work-orders',
      image: placeholderImages.onsite
    },
    {
      title: 'Equipment Logs',
      description: 'Equipment maintenance and usage tracking tools.',
      icon: Wrench,
      path: '/onsite/equipment',
      image: placeholderImages.onsite
    },
    {
      title: 'Field Reports',
      description: 'On-site reporting and customer communication tools.',
      icon: HardHat,
      path: '/onsite/reports',
      image: placeholderImages.onsite
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >


      {/* Tools Grid */}
      <div className="module-grid">
        {onSiteTools.map((tool, index) => (
          <ModuleCard
            key={tool.path}
            {...tool}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Safety Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass-card border-l-4 border-accent">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Safety First - Always
              </h3>
              <p className="text-gray-600 mb-4">
                Remember to complete all safety checklists before starting any work. 
                Your safety and the safety of your team is our top priority.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Hard Hat Required</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Safety Harness</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Weather Check</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Equipment Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnSite;
