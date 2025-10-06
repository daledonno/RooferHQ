import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from '../assets/Top-Logowhite.png';
import { 
  Home, 
  Building2, 
  HardHat, 
  HelpCircle, 
  GraduationCap, 
  Share2, 
  FileText,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/pipeline', icon: TrendingUp, label: 'Pipeline' },
    { path: '/metrics', icon: BarChart3, label: 'Metrics' },
    { path: '/office', icon: Building2, label: 'Office' },
    { path: '/onsite', icon: HardHat, label: 'On-Site' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
    { path: '/training', icon: GraduationCap, label: 'Training' },
    { path: '/social', icon: Share2, label: 'Social Media' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-accent text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          ${isCollapsed ? 'w-16' : 'w-64'} 
          bg-black flex flex-col transition-all duration-300
          fixed lg:relative z-50 h-full
          ${isMobileOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'}
        `}
      >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="RooferHQ Logo" 
              className="h-8 w-auto"
            />
            {!isCollapsed && (
              <span className="text-white font-bold text-lg">RooferHQ</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X size={20} className="text-white" />
            </button>
            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {isCollapsed ? (
                <ChevronRight size={20} className="text-white" />
              ) : (
                <ChevronLeft size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-accent/20 text-accent border border-accent/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon size={20} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-auto"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <span className="text-white font-medium">TM</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Welcome back</p>
                <p className="text-white/60 text-xs">Team Member</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <span className="text-white font-medium">TM</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-white/50 text-xs">
                © 2024 Company
              </p>
              <p className="text-white/40 text-xs mt-1">
                Internal Use Only
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
    </>
  );
};

export default Sidebar;
