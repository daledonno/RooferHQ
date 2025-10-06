import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Ruler, 
  Calendar, 
  Map,
  Cloud,
  Calculator,
  Users,
  StickyNote,
  BookOpen,
  FileText,
  Clock,
  GripVertical,
  RotateCcw
} from 'lucide-react';

const Office = () => {
  // Icon mapping
  const iconMap = {
    Phone,
    Mail,
    MapPin,
    Ruler,
    Calendar,
    Map,
    Cloud,
    Calculator,
    Users,
    StickyNote,
    BookOpen,
    FileText,
    Clock
  };

  // Default module order with icon names instead of components
  const defaultOfficeTools = [
    {
      title: 'Phone Scripts',
      description: 'Professional scripts for cold calls, follow-ups, and customer service interactions.',
      icon: 'Phone',
      path: '/office/phone-scripts',
      image: placeholderImages.phone
    },
    {
      title: 'Email Templates',
      description: 'Pre-written email templates for various business communications and follow-ups.',
      icon: 'Mail',
      path: '/office/email-templates',
      image: placeholderImages.email
    },
    {
      title: 'Route Planning',
      description: 'Optimize your daily routes and schedule appointments efficiently.',
      icon: 'MapPin',
      path: '/office/route-planning',
      image: placeholderImages.map
    },
    {
      title: 'Roof Measurement',
      description: 'Tools and guides for accurate roof measurements and calculations.',
      icon: 'Ruler',
      path: '/office/roof-measurement',
      image: placeholderImages.measurement
    },
        {
          title: 'Calendar',
          description: 'Schedule appointments, track deadlines, and manage your daily workflow.',
          icon: 'Calendar',
          path: '/office/calendar',
          image: placeholderImages.calendar
        },
    {
      title: 'Postcode Map',
      description: 'Interactive map showing service areas and postcode coverage.',
      icon: 'Map',
      path: '/office/postcode-map',
      image: placeholderImages.postcode
    },
    {
      title: 'Check Weather',
      description: 'Check weather conditions before heading to job sites for safety.',
      icon: 'Cloud',
      path: '/office/check-weather',
      image: placeholderImages.weather
    },
    {
      title: 'Quote Builder',
      description: 'Create professional quotes with detailed pricing and project breakdowns.',
      icon: 'Calculator',
      path: '/office/quote-builder',
      image: placeholderImages.quote
    },
    {
      title: 'Customer Database',
      description: 'Manage customer relationships, project history, and contact information.',
      icon: 'Users',
      path: '/office/customer-database',
      image: placeholderImages.customers
    },
    {
      title: 'Daily Notepad',
      description: 'Quick note-taking and todo lists with day navigation and auto-save.',
      icon: 'StickyNote',
      path: '/office/daily-notepad',
      image: placeholderImages.notepad
    },
    {
      title: 'Office Training',
      description: 'Comprehensive training modules covering company values, processes, and systems.',
      icon: 'BookOpen',
      path: '/office/training',
      image: placeholderImages.training
    },
    {
      title: 'Send Quote/Invoice',
      description: 'Create and send professional quotes and invoices to customers.',
      icon: 'FileText',
      path: '/office/send-quote',
      onClick: () => window.open('https://www.powerednow.com', '_blank')
    },
    {
      title: 'Attendance',
      description: 'Track daily attendance and calculate weekly wages for team members.',
      icon: 'Clock',
      path: '/office/attendance',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80'
    }
  ];

  // Use drag and drop hook
  const {
    items: officeTools,
    draggedIndex,
    dragOverIndex,
    isReordering,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    resetOrder,
    toggleReordering
  } = useDragAndDrop(defaultOfficeTools, 'office-modules-order');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-8"
    >
      {/* Header with Reorder Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Office Tools</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage your office workflow and tools</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={toggleReordering}
            className={`flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 ${
              isReordering
                ? 'bg-accent text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <GripVertical size={16} className="lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">
              {isReordering ? 'Done Reordering' : 'Reorder Modules'}
            </span>
          </button>
          
          {isReordering && (
            <button
              onClick={resetOrder}
              className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RotateCcw size={16} className="lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base">Reset Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Reorder Instructions */}
      {isReordering && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 lg:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4"
        >
          <p className="text-blue-800 text-xs lg:text-sm">
            <strong>Reorder Mode:</strong> Drag and drop modules to rearrange them. Your changes will be saved automatically.
          </p>
        </motion.div>
      )}

      {/* Tools Grid */}
      <div className="module-grid">
        {officeTools.map((tool, index) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: draggedIndex === index ? 1.05 : 1,
              rotate: draggedIndex === index ? 2 : 0
            }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              scale: { duration: 0.2 },
              rotate: { duration: 0.2 }
            }}
            draggable={isReordering}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            className={`relative ${
              isReordering ? 'cursor-move' : ''
            } ${
              dragOverIndex === index && draggedIndex !== index
                ? 'ring-2 ring-accent ring-opacity-50'
                : ''
            } ${
              draggedIndex === index
                ? 'opacity-50 z-10'
                : ''
            }`}
          >
            {/* Drag Handle */}
            {isReordering && (
              <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-6 h-6 lg:w-8 lg:h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg z-20">
                <GripVertical size={12} className="lg:w-4 lg:h-4" />
              </div>
            )}
            
            {/* Drop Indicator */}
            {dragOverIndex === index && draggedIndex !== index && (
              <div className="absolute inset-0 border-2 border-dashed border-accent rounded-2xl bg-accent/10 z-10" />
            )}
            
            <ModuleCard
              {...tool}
              icon={iconMap[tool.icon]}
              delay={0}
            />
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default Office;
