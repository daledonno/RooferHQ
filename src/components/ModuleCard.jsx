import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ModuleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  image, 
  delay = 0,
  onClick,
  isVertical = false
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const content = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-white border border-gray-200 cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${
        isVertical 
          ? 'flex items-center p-6 h-24' 
          : 'flex flex-col h-64 p-6'
      }`}
    >
      {/* Content */}
      <div className={`flex ${isVertical ? 'items-center w-full' : 'flex-col h-full'}`}>
        {/* Icon */}
        <div className={`flex items-center ${isVertical ? 'mr-6' : 'justify-between mb-4'}`}>
          <div className={`${isVertical ? 'w-12 h-12' : 'w-12 h-12'} bg-accent/15 rounded-xl flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-200`}>
            {Icon && <Icon size={24} className="text-accent" />}
          </div>
          {!isVertical && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          )}
        </div>

        {/* Title and Description */}
        <div className={`${isVertical ? 'flex-1' : 'flex-1'}`}>
          <h3 className={`font-semibold text-gray-800 group-hover:text-accent transition-colors duration-200 ${
            isVertical ? 'text-lg mb-1' : 'text-xl mb-3'
          }`}>
            {title}
          </h3>
          <p className={`text-gray-600 leading-relaxed ${
            isVertical ? 'text-sm line-clamp-2' : 'text-sm flex-1'
          }`}>
            {description}
          </p>
        </div>

        {/* Arrow for vertical view */}
        {isVertical && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-accent ml-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.div>
        )}

        {/* Hover Effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className={`absolute ${isVertical ? 'bottom-0 left-0 right-0 h-1' : 'bottom-0 left-0 right-0 h-1'} bg-accent origin-left`}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        {content}
      </div>
    );
  }

  return (
    <Link to={path}>
      {content}
    </Link>
  );
};

export default ModuleCard;
