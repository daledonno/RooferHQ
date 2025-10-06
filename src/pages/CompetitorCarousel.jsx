import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react';

const CompetitorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock data for competitor posts - will be replaced with backend data later
  const competitorPosts = [
    {
      id: 1,
      company: "Elite Roofing Co.",
      platform: "Instagram",
      content: "Just completed this stunning metal roof installation! The durability and modern look are unmatched. #MetalRoofing #HomeImprovement",
      image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6c5?w=400&h=300&fit=crop",
      likes: 127,
      comments: 23,
      shares: 8,
      timestamp: "2 hours ago",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      company: "Premier Roof Solutions",
      platform: "Facebook",
      content: "Before and after transformation! Our team worked tirelessly to restore this historic home's roof. Quality craftsmanship that stands the test of time.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      likes: 89,
      comments: 15,
      shares: 12,
      timestamp: "4 hours ago",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 3,
      company: "Apex Roofing",
      platform: "LinkedIn",
      content: "Industry insights: Why proper ventilation is crucial for your roof's longevity. Our latest blog post covers everything you need to know about roof ventilation systems.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      likes: 45,
      comments: 8,
      shares: 6,
      timestamp: "6 hours ago",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 4,
      company: "StormGuard Roofing",
      platform: "Instagram",
      content: "Weather doesn't wait! Our emergency response team is always ready. 24/7 storm damage assessment and repair services. #EmergencyRoofing #StormDamage",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      likes: 156,
      comments: 31,
      shares: 19,
      timestamp: "8 hours ago",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 5,
      company: "Heritage Roofing",
      platform: "Facebook",
      content: "Customer spotlight: The Johnson family's new slate roof installation. Natural beauty meets exceptional durability. Thank you for trusting us with your home!",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      likes: 203,
      comments: 42,
      shares: 25,
      timestamp: "1 day ago",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === competitorPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, competitorPosts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === competitorPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? competitorPosts.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Facebook': return 'bg-blue-600';
      case 'LinkedIn': return 'bg-blue-700';
      default: return 'bg-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🏆 Competitor Carousel
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor competitor social media activity and engagement to stay ahead of the competition
        </p>
      </motion.div>

      {/* Main Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Live Competitor Posts
            </h3>
            <p className="text-gray-600 text-sm">
              Real-time social media posts from your top competitors
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isAutoPlaying 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isAutoPlaying ? 'Auto' : 'Manual'}
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {competitorPosts.map((post, index) => (
              <div key={post.id} className="w-full flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.profileImage}
                          alt={post.company}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{post.company}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getPlatformColor(post.platform)}`}>
                              {post.platform}
                            </span>
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ExternalLink size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                    
                    {/* Post Image */}
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} className="text-red-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} className="text-blue-500" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 size={16} className="text-green-500" />
                          <span>{post.shares}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Engagement Rate: {((post.likes + post.comments + post.shares) / 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {competitorPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-accent w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <div className="glass-card p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            📊 Competitor Analytics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">2.3K</div>
              <div className="text-gray-600 text-sm">Total Engagement</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">4.2%</div>
              <div className="text-gray-600 text-sm">Avg. Engagement Rate</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">5</div>
              <div className="text-gray-600 text-sm">Active Competitors</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">12</div>
              <div className="text-gray-600 text-sm">Posts This Week</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Competitor Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8"
      >
        <div className="glass-card p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            💡 Key Insights & Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-accent font-semibold mb-3">Top Performing Content</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Before/after project photos get 40% more engagement</li>
                <li>• Customer testimonials drive 60% more shares</li>
                <li>• Emergency services posts have highest reach</li>
                <li>• Video content performs 3x better than images</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-semibold mb-3">Competitive Advantages</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Post during peak hours (7-9 AM, 5-7 PM)</li>
                <li>• Use trending hashtags in roofing industry</li>
                <li>• Respond to comments within 2 hours</li>
                <li>• Share behind-the-scenes content weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompetitorCarousel;
