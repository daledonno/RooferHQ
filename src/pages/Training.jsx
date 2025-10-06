import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import { placeholderImages } from '../utils/placeholderImages';
import { 
  Building2, 
  TrendingUp, 
  HardHat, 
  Briefcase, 
  Award, 
  Share2 
} from 'lucide-react';

const Training = () => {
  const trainingModules = [
    {
      title: 'Office Training',
      description: 'Administrative skills, customer service, and office management training.',
      icon: Building2,
      path: '/training/office',
      image: placeholderImages.training
    },
    {
      title: 'Sales Training',
      description: 'Sales techniques, lead generation, and customer relationship management.',
      icon: TrendingUp,
      path: '/training/sales',
      image: placeholderImages.training
    },
    {
      title: 'On-Site Training',
      description: 'Practical roofing skills, safety protocols, and field operations.',
      icon: HardHat,
      path: '/training/onsite',
      image: placeholderImages.training
    },
    {
      title: 'Business',
      description: 'Business management, financial planning, and operational excellence.',
      icon: Briefcase,
      path: '/training/business',
      image: placeholderImages.training
    },
    {
      title: 'Certs & Compliance',
      description: 'Professional certifications, licensing, and regulatory compliance.',
      icon: Award,
      path: '/training/certifications',
      image: placeholderImages.training
    },
    {
      title: 'Online Presence',
      description: 'Digital marketing, social media, and online reputation management.',
      icon: Share2,
      path: '/training/online-presence',
      image: placeholderImages.training
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >


      {/* Training Modules Grid */}
      <div className="module-grid">
        {trainingModules.map((module, index) => (
          <ModuleCard
            key={module.path}
            {...module}
            delay={index * 0.1}
          />
        ))}
      </div>

    </motion.div>
  );
};

export default Training;
