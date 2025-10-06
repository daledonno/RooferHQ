import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import logo from '../assets/Top-Logowhite.png';
import homeBanner from '../assets/Homebanner.png';
import { useState, useEffect } from 'react';

// Banner images for different pages
const bannerImages = {
  '/': homeBanner,
  '/pipeline': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/metrics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/onsite': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/training': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/faq': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/social': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/documents': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80',
  '/settings': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=400&q=80'
};

const Header = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pipelineStats, setPipelineStats] = useState({ total: 0, active: 0, completed: 0 });
  
  // Example metrics data - in production this would come from APIs
  const metricsData = {
    leadsThisWeek: { value: 25, target: 25, trend: '+12%' },
    conversionRate: { value: 40, target: 40, trend: '+3%' },
    jobsOnSite: { value: 8, target: 10, trend: '-2' },
    invoicesPaid: { value: 85, target: 90, trend: '+5%' },
    profitMargin: { value: 30, target: 35, trend: '0%' },
    customerRating: { value: 4.8, target: 4.5, trend: '+0.2' },
    revenueGenerated: { value: 125000, target: 150000, trend: '+8%' }
  };

  // Load pipeline stats when on pipeline page
  useEffect(() => {
    if (location.pathname === '/pipeline') {
      const saved = localStorage.getItem('roofing-workflow');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          const customers = data.customers || [];
          setPipelineStats({
            total: customers.length,
            active: customers.length,
            completed: 0
          });
        } catch (error) {
          console.error('Error loading pipeline stats:', error);
        }
      }
    }
  }, [location.pathname]);

  // Listen for custom pipeline stats updates
  useEffect(() => {
    const handlePipelineStatsUpdate = (event) => {
      if (location.pathname === '/pipeline') {
        setPipelineStats(event.detail);
      }
    };

    window.addEventListener('pipelineStatsUpdate', handlePipelineStatsUpdate);
    return () => window.removeEventListener('pipelineStatsUpdate', handlePipelineStatsUpdate);
  }, [location.pathname]);

  const getPageTitle = (pathname) => {
      const titles = {
        '/': 'Main Business Hub',
        '/pipeline': 'Pipeline',
        '/metrics': 'Business Metrics',
        '/office': 'Office',
        '/onsite': 'On-Site',
        '/faq': 'FAQ & Knowledge Base',
        '/training': 'Training Center',
        '/social': 'Social Media Tools',
        '/documents': 'Document Center',
        '/settings': 'Settings',
      '/office/phone-scripts': 'Phone Scripts',
      '/office/email-templates': 'Email Templates',
      '/office/route-planning': 'Route Planning',
      '/office/roof-measurement': 'Roof Measurement',
          '/office/calendar': 'Calendar',
      '/office/postcode-map': 'Postcode Map',
      '/office/daily-notepad': 'Daily Notepad',
      '/office/training': 'Office Training',
      '/office/attendance': 'Attendance',
      '/training/office': 'Office Training',
      '/onsite/take-picture': 'Take A Picture',
    };
    return titles[pathname] || 'Company';
  };

  const isHomePage = location.pathname === '/';
  const isMainPage = ['/', '/pipeline', '/metrics', '/office', '/onsite', '/training', '/faq', '/social', '/documents', '/settings'].includes(location.pathname);
  
  // Check if we're on a tool-specific page (not main pages)
  const isToolPage = location.pathname.includes('/office/') || 
                     location.pathname.includes('/onsite/') || 
                     location.pathname.includes('/training/') || 
                     location.pathname.includes('/social/') || 
                     location.pathname.includes('/documents/') || 
                     location.pathname.includes('/faq/');
  
  // Get the parent page for back navigation
  const getParentPage = (pathname) => {
    if (pathname.includes('/office/')) return '/office';
    if (pathname.includes('/onsite/')) return '/onsite';
    if (pathname.includes('/training/')) return '/training';
    if (pathname.includes('/social/')) return '/social';
    if (pathname.includes('/documents/')) return '/documents';
    if (pathname.includes('/faq/')) return '/faq';
    return '/';
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${isHomePage ? 'h-32 lg:h-48' : 'h-20 lg:h-24'} ${isMainPage ? 'bg-transparent' : 'bg-background/50'} backdrop-blur-md border-b border-white/10 flex items-center px-4 lg:px-8 relative`}
      style={isMainPage ? {
        backgroundImage: `url(${bannerImages[location.pathname] || bannerImages['/']})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1b2e'
      } : {}}
    >
      {/* Dark Overlay for Main Pages */}
      {isMainPage && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
      <div className="flex items-center space-x-3 lg:space-x-6 relative z-10 w-full">
        {/* Back Button - only show on tool pages */}
        {isToolPage && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(getParentPage(location.pathname))}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
          >
            <ArrowLeft size={16} className="text-white" />
            <span className="text-white text-xs lg:text-sm font-medium hidden sm:inline">Go Back</span>
          </motion.button>
        )}

        {/* Logo */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <img 
            src={logo} 
            alt="RooferHQ Logo" 
            className="h-8 lg:h-12 w-auto"
          />
        </div>

            {/* Page Title */}
            <div className="flex-1 min-w-0">
              <motion.h1 
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg lg:text-2xl font-bold text-white text-shadow truncate"
              >
                {location.pathname === '/pipeline' ? 'Pipeline Management' : getPageTitle(location.pathname)}
              </motion.h1>
              <p className="text-white/60 text-xs lg:text-sm mt-1 hidden sm:block">
                {location.pathname === '/' ? 'Access all company tools and resources' : 
                 location.pathname === '/pipeline' ? 'Drag customer heads through workflow stages' : 
                 location.pathname === '/metrics' ? 'Real-time KPIs and performance indicators for your roofing business' :
                 location.pathname === '/office/daily-notepad' ? 'Capture your thoughts, tasks, and daily notes' :
                 location.pathname === '/office/training' ? 'Comprehensive training modules for office excellence' :
                 location.pathname === '/office/attendance' ? 'Track daily attendance and calculate weekly wages for team members' :
                 location.pathname === '/training/office' ? 'Comprehensive training modules for office excellence' :
                 location.pathname === '/onsite/take-picture' ? 'Capture photos on-site and automatically upload to Google Drive with geo-tagging' :
                 'Professional roofing solutions'}
              </p>
            </div>

            {/* Pipeline Stats - only show on pipeline page */}
            {location.pathname === '/pipeline' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex gap-2 lg:gap-4"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 lg:p-3 text-center min-w-[50px] lg:min-w-[60px]">
                  <div className="text-lg lg:text-xl font-bold text-white">{pipelineStats.total}</div>
                  <div className="text-xs text-white/70">Total</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 lg:p-3 text-center min-w-[50px] lg:min-w-[60px]">
                  <div className="text-lg lg:text-xl font-bold text-white">{pipelineStats.active}</div>
                  <div className="text-xs text-white/70">Active</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 lg:p-3 text-center min-w-[50px] lg:min-w-[60px]">
                  <div className="text-lg lg:text-xl font-bold text-white">{pipelineStats.completed}</div>
                  <div className="text-xs text-white/70">Completed</div>
                </div>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors border border-white/20"
            >
              <Menu size={20} />
            </button>


      </div>
    </motion.header>
  );
};

export default Header;
