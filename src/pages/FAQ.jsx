import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
import { 
  HelpCircle, 
  BookOpen, 
  Search, 
  MessageCircle, 
  FileText, 
  Users 
} from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      title: 'General Questions',
      description: 'Common questions about company policies, procedures, and general information.',
      icon: HelpCircle,
      path: '/faq/general',
      image: placeholderImages.faq
    },
    {
      title: 'Technical Support',
      description: 'Technical issues, troubleshooting guides, and system help resources.',
      icon: Search,
      path: '/faq/technical',
      image: placeholderImages.faq
    },
    {
      title: 'Training Materials',
      description: 'Learning resources, tutorials, and training documentation.',
      icon: BookOpen,
      path: '/faq/training',
      image: placeholderImages.faq
    },
    {
      title: 'Contact Support',
      description: 'Get in touch with our support team for personalized assistance.',
      icon: MessageCircle,
      path: '/faq/contact',
      image: placeholderImages.faq
    },
    {
      title: 'Documentation',
      description: 'Company documents, manuals, and reference materials.',
      icon: FileText,
      path: '/faq/docs',
      image: placeholderImages.faq
    },
    {
      title: 'Team Directory',
      description: 'Contact information and roles of team members.',
      icon: Users,
      path: '/faq/team',
      image: placeholderImages.faq
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >

      {/* Quick Search */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-4 shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Search size={24} className="text-accent" />
            <input
              id="faq-search"
              name="faq-search"
              type="text"
              placeholder="Search FAQ, documentation, or help topics..."
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 border-none outline-none"
            />
            <button className="btn-primary">
              Search
            </button>
          </div>
        </div>
      </motion.div>


      {/* Categories Grid */}
      <div className="module-grid">
        {faqCategories.map((category, index) => (
          <ModuleCard
            key={category.path}
            {...category}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Popular Questions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass-card">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            🔥 Most Popular Questions
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-accent pl-4">
              <h4 className="text-gray-800 font-semibold mb-1">How do I reset my password?</h4>
              <p className="text-gray-600 text-sm">Use the "Forgot Password" link on the login page...</p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h4 className="text-gray-800 font-semibold mb-1">Where can I find training materials?</h4>
              <p className="text-gray-600 text-sm">All training resources are available in the Training section...</p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h4 className="text-gray-800 font-semibold mb-1">How do I submit a work order?</h4>
                <p className="text-gray-600 text-sm">Navigate to On-Site Tools → Work Orders to create...</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
