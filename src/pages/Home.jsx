import { motion } from 'framer-motion';
import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { 
  Building2, 
  HardHat, 
  GraduationCap, 
  HelpCircle, 
  Share2, 
  FileText,
  Grid3X3,
  List
} from 'lucide-react';

const Home = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const modules = [
    {
      title: 'Office',
      description: 'Phone scripts, email templates, route planning, and objection handling tools for office operations.',
      icon: Building2,
      path: '/office'
    },
    {
      title: 'On-Site',
      description: 'Field tools, safety checklists, measurement guides, and on-site documentation.',
      icon: HardHat,
      path: '/onsite'
    },
    {
      title: 'Training Center',
      description: 'Learning modules, certification programs, and skill development resources.',
      icon: GraduationCap,
      path: '/training'
    },
    {
      title: 'FAQ & Knowledge Base',
      description: 'Common questions, troubleshooting guides, and company knowledge resources.',
      icon: HelpCircle,
      path: '/faq'
    },
    {
      title: 'Social Media Tools',
      description: 'Content templates, posting schedules, and social media management tools.',
      icon: Share2,
      path: '/social'
    },
    {
      title: 'Document Center',
      description: 'Company documents, forms, templates, and resource library.',
      icon: FileText,
      path: '/documents'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-8"
    >
      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">RooferHQ Modules</h1>
        <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-md transition-all duration-200 flex-1 sm:flex-none ${
              viewMode === 'grid'
                ? 'bg-white text-accent shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Grid3X3 size={16} className="lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-md transition-all duration-200 flex-1 sm:flex-none ${
              viewMode === 'list'
                ? 'bg-white text-accent shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List size={16} className="lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">List</span>
          </button>
        </div>
      </div>

      {/* Modules Display */}
      {viewMode === 'grid' ? (
        <div className="module-grid">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.path}
              {...module}
              delay={index * 0.1}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.path}
              {...module}
              delay={index * 0.05}
              isVertical={true}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Home;
