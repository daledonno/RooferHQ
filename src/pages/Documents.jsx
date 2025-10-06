import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
import { 
  FileText, 
  Folder, 
  Download, 
  Search, 
  Calendar, 
  Shield 
} from 'lucide-react';

const Documents = () => {
  const documentCategories = [
    {
      title: 'Company Policies',
      description: 'HR policies, safety procedures, and company guidelines.',
      icon: Shield,
      path: '/documents/policies',
      image: placeholderImages.documents
    },
    {
      title: 'Forms & Templates',
      description: 'Business forms, contracts, and document templates.',
      icon: FileText,
      path: '/documents/forms',
      image: placeholderImages.documents
    },
    {
      title: 'Training Materials',
      description: 'Training guides, manuals, and educational resources.',
      icon: Folder,
      path: '/documents/training',
      image: placeholderImages.documents
    },
    {
      title: 'Legal Documents',
      description: 'Contracts, agreements, and legal compliance documents.',
      icon: Shield,
      path: '/documents/legal',
      image: placeholderImages.documents
    },
    {
      title: 'Archive',
      description: 'Historical documents, old policies, and archived materials.',
      icon: Calendar,
      path: '/documents/archive',
      image: placeholderImages.documents
    },
    {
      title: 'Document Search',
      description: 'Search and find specific documents across all categories.',
      icon: Search,
      path: '/documents/search',
      image: placeholderImages.documents
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
              id="documents-search"
              name="documents-search"
              type="text"
              placeholder="Search documents, policies, or forms..."
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
        {documentCategories.map((category, index) => (
          <ModuleCard
            key={category.path}
            {...category}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass-card">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            📄 Recently Updated Documents
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">Safety Protocol 2024</h4>
                  <p className="text-gray-600 text-sm">Updated 2 days ago</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">Employee Handbook</h4>
                  <p className="text-gray-600 text-sm">Updated 1 week ago</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">Customer Contract Template</h4>
                  <p className="text-gray-600 text-sm">Updated 2 weeks ago</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Documents;
