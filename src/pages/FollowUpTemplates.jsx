import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Calendar, CheckCircle } from 'lucide-react';

const FollowUpTemplates = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      {/* Back Button */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/office')}
          className="btn-secondary mr-4 flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="glass-card max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw size={40} className="text-accent" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Follow-up Templates Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            We're creating systematic follow-up sequences to help you maintain strong customer relationships:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-accent" />
              </div>
              <h3 className="text-gray-800 font-semibold mb-2">Scheduled Follow-ups</h3>
              <p className="text-gray-600 text-sm">Automated sequence timing</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-accent" />
              </div>
              <h3 className="text-gray-800 font-semibold mb-2">Post-Service</h3>
              <p className="text-gray-600 text-sm">Quality check follow-ups</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <RefreshCw size={24} className="text-accent" />
              </div>
              <h3 className="text-gray-800 font-semibold mb-2">Renewal Reminders</h3>
              <p className="text-gray-600 text-sm">Maintenance reminders</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-accent font-semibold mb-3">Follow-up Types:</h4>
            <ul className="text-gray-600 text-left space-y-2">
              <li>• Initial quote follow-ups (3, 7, 14 days)</li>
              <li>• Post-installation satisfaction checks</li>
              <li>• Seasonal maintenance reminders</li>
              <li>• Referral request follow-ups</li>
              <li>• Anniversary and renewal contacts</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FollowUpTemplates;
