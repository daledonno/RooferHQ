import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Plus, Filter, Search, ExternalLink, Settings } from 'lucide-react';
import { useState } from 'react';

const CalendarPage = () => {
  const [calendarUrl, setCalendarUrl] = useState('');
  const [showSetup, setShowSetup] = useState(true);

  // Replace this with your actual Google Calendar embed URL
  const defaultCalendarUrl = 'https://calendar.google.com/calendar/embed?src=your-calendar-id%40gmail.com&ctz=Europe%2FLondon';

  const handleSetupCalendar = () => {
    if (calendarUrl.trim()) {
      setShowSetup(false);
    } else {
      alert('Please enter a valid Google Calendar embed URL');
    }
  };

  const getEmbedUrl = () => {
    return calendarUrl || defaultCalendarUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-7xl mx-auto"
    >
      {/* Controls */}
      <div className="flex items-center justify-end mb-6">
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowSetup(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Settings size={16} />
            <span>Setup</span>
          </button>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Open Google Calendar</span>
          </a>
        </div>
      </div>

      {/* Setup Panel */}
      {showSetup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mb-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Setup Google Calendar Integration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Calendar Embed URL
              </label>
              <input
                id="calendar-url"
                name="calendar-url"
                type="url"
                value={calendarUrl}
                onChange={(e) => setCalendarUrl(e.target.value)}
                placeholder="https://calendar.google.com/calendar/embed?src=your-calendar-id@gmail.com&ctz=Europe/London"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">How to get your Google Calendar embed URL:</h4>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Go to <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Calendar</a></li>
                <li>Click the three dots next to your calendar name</li>
                <li>Select "Settings and sharing"</li>
                <li>Scroll down to "Integrate calendar"</li>
                <li>Copy the "Public URL to this calendar"</li>
                <li>Paste it above and click "Load Calendar"</li>
              </ol>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSetupCalendar}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Load Calendar
              </button>
              <button
                onClick={() => setShowSetup(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Calendar Display */}
      {!showSetup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Company Schedule</h3>
            <p className="text-gray-600 text-sm">All appointments, site visits, and important dates</p>
          </div>
          
          <div className="relative" style={{ height: '600px' }}>
            <iframe
              src={getEmbedUrl()}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0 0 1rem 1rem'
              }}
              title="Company Calendar"
            />
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-center mb-3">
            <Clock size={20} className="text-accent mr-2" />
            <h4 className="font-semibold text-gray-800">Quick Add</h4>
          </div>
          <p className="text-gray-600 text-sm mb-3">Add new appointments directly to your Google Calendar</p>
          <a
            href="https://calendar.google.com/calendar/r/eventedit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline"
          >
            Create Event →
          </a>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-center mb-3">
            <MapPin size={20} className="text-accent mr-2" />
            <h4 className="font-semibold text-gray-800">Site Visits</h4>
          </div>
          <p className="text-gray-600 text-sm mb-3">Schedule and track on-site appointments</p>
          <a
            href="https://calendar.google.com/calendar/r/eventedit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline"
          >
            Schedule Visit →
          </a>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-center mb-3">
            <User size={20} className="text-accent mr-2" />
            <h4 className="font-semibold text-gray-800">Team Calendar</h4>
          </div>
          <p className="text-gray-600 text-sm mb-3">View team availability and schedules</p>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline"
          >
            View Team →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarPage;
