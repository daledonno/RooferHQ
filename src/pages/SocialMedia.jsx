import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { 
  Share2, 
  Camera, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Users,
  TrendingUp,
  Sparkles,
  Wand2
} from 'lucide-react';

const SocialMedia = () => {
  const socialTools = [
    {
      title: 'Post Creation',
      description: 'AI-powered social media post creation with image generation and content optimization.',
      icon: Sparkles,
      path: '/social/post-creation'
    },
    {
      title: 'Content Templates',
      description: 'Pre-designed social media posts and content templates for consistent branding.',
      icon: Share2,
      path: '/social/templates'
    },
    {
      title: 'Photo Gallery',
      description: 'Professional photos and before/after project images for social sharing.',
      icon: Camera,
      path: '/social/photos'
    },
    {
      title: 'Posting Schedule',
      description: 'Optimal posting times and content calendar for maximum engagement.',
      icon: Calendar,
      path: '/social/schedule'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track social media performance and engagement metrics.',
      icon: BarChart3,
      path: '/social/analytics'
    },
    {
      title: 'Customer Reviews',
      description: 'Manage and showcase customer testimonials and reviews.',
      icon: MessageSquare,
      path: '/social/reviews'
    },
    {
      title: 'Community Management',
      description: 'Tools for engaging with followers and building community.',
      icon: Users,
      path: '/social/community'
    },
    {
      title: 'Competitor Carousel',
      description: 'Monitor competitor social media activity and engagement to stay ahead.',
      icon: TrendingUp,
      path: '/competitor-carousel'
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
        {socialTools.map((tool, index) => (
          <ModuleCard
            key={tool.path}
            {...tool}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Social Media Tips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass-card">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            📱 Social Media Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-accent font-semibold mb-3">Content Strategy</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Post before/after project photos</li>
                <li>• Share customer testimonials</li>
                <li>• Highlight team expertise</li>
                <li>• Show behind-the-scenes content</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-semibold mb-3">Engagement Tips</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Respond to comments within 2 hours</li>
                <li>• Use relevant hashtags (#roofing #homeimprovement)</li>
                <li>• Tag customers in project photos</li>
                <li>• Share seasonal maintenance tips</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialMedia;
