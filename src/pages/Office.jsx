import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
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
  Clock
} from 'lucide-react';

const Office = () => {
  const officeTools = [
    {
      title: 'Phone Scripts',
      description: 'Professional scripts for cold calls, follow-ups, and customer service interactions.',
      icon: Phone,
      path: '/office/phone-scripts',
      image: placeholderImages.phone
    },
    {
      title: 'Email Templates',
      description: 'Pre-written email templates for various business communications and follow-ups.',
      icon: Mail,
      path: '/office/email-templates',
      image: placeholderImages.email
    },
    {
      title: 'Route Planning',
      description: 'Optimize your daily routes and schedule appointments efficiently.',
      icon: MapPin,
      path: '/office/route-planning',
      image: placeholderImages.map
    },
    {
      title: 'Roof Measurement',
      description: 'Tools and guides for accurate roof measurements and calculations.',
      icon: Ruler,
      path: '/office/roof-measurement',
      image: placeholderImages.measurement
    },
        {
          title: 'Calendar',
          description: 'Schedule appointments, track deadlines, and manage your daily workflow.',
          icon: Calendar,
          path: '/office/calendar',
          image: placeholderImages.calendar
        },
    {
      title: 'Postcode Map',
      description: 'Interactive map showing service areas and postcode coverage.',
      icon: Map,
      path: '/office/postcode-map',
      image: placeholderImages.postcode
    },
    {
      title: 'Check Weather',
      description: 'Check weather conditions before heading to job sites for safety.',
      icon: Cloud,
      path: '/office/check-weather',
      image: placeholderImages.weather
    },
    {
      title: 'Quote Builder',
      description: 'Create professional quotes with detailed pricing and project breakdowns.',
      icon: Calculator,
      path: '/office/quote-builder',
      image: placeholderImages.quote
    },
    {
      title: 'Customer Database',
      description: 'Manage customer relationships, project history, and contact information.',
      icon: Users,
      path: '/office/customer-database',
      image: placeholderImages.customers
    },
    {
      title: 'Daily Notepad',
      description: 'Quick note-taking and todo lists with day navigation and auto-save.',
      icon: StickyNote,
      path: '/office/daily-notepad',
      image: placeholderImages.notepad
    },
    {
      title: 'Office Training',
      description: 'Comprehensive training modules covering company values, processes, and systems.',
      icon: BookOpen,
      path: '/office/training',
      image: placeholderImages.training
    },
    {
      title: 'Send Quote/Invoice',
      description: 'Create and send professional quotes and invoices to customers.',
      icon: FileText,
      path: '/office/send-quote',
      onClick: () => window.open('https://www.powerednow.com', '_blank')
    },
    {
      title: 'Attendance',
      description: 'Track daily attendance and calculate weekly wages for team members.',
      icon: Clock,
      path: '/office/attendance',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80'
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
        {officeTools.map((tool, index) => (
          <ModuleCard
            key={tool.path}
            {...tool}
            delay={index * 0.1}
          />
        ))}
      </div>

    </motion.div>
  );
};

export default Office;
