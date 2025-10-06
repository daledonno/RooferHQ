import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Copy, 
  Download, 
  Edit3, 
  Calendar,
  Hash,
  Image,
  Type,
  Heart,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

const SocialTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'before-after', name: 'Before & After', count: 8 },
    { id: 'tips', name: 'Roofing Tips', count: 6 },
    { id: 'testimonials', name: 'Customer Reviews', count: 4 },
    { id: 'seasonal', name: 'Seasonal', count: 3 },
    { id: 'promotional', name: 'Promotional', count: 3 }
  ];

  const socialTemplates = [
    {
      id: 1,
      title: 'Before & After Roof Replacement',
      category: 'before-after',
      platform: 'Facebook',
      content: `🏠 AMAZING TRANSFORMATION! 

We just completed this stunning roof replacement in Liverpool! 

✅ New premium tiles
✅ Enhanced weather protection  
✅ 25-year warranty included

The difference is incredible! Contact us for your free roof assessment.

#RoofingLiverpool #BeforeAndAfter #HomeImprovement #QualityWork`,
      hashtags: ['#RoofingLiverpool', '#BeforeAndAfter', '#HomeImprovement', '#QualityWork'],
      imagePlaceholder: 'Before/After roof photos',
      engagement: { likes: 45, comments: 12, shares: 8 }
    },
    {
      id: 2,
      title: 'Winter Roof Maintenance Tips',
      category: 'tips',
      platform: 'Instagram',
      content: `❄️ WINTER ROOF CARE TIPS ❄️

As the weather gets colder, here are 5 essential tips to protect your roof:

1️⃣ Clear gutters of leaves and debris
2️⃣ Check for loose or damaged tiles
3️⃣ Inspect flashing around chimneys
4️⃣ Trim overhanging branches
5️⃣ Schedule a professional inspection

Stay warm and dry this winter! 🏠

Need a roof check? DM us for a free assessment!`,
      hashtags: ['#WinterRoofCare', '#RoofMaintenance', '#LiverpoolRoofing', '#HomeTips'],
      imagePlaceholder: 'Winter roof maintenance graphic',
      engagement: { likes: 32, comments: 7, shares: 15 }
    },
    {
      id: 3,
      title: 'Customer Testimonial - Sarah M.',
      category: 'testimonials',
      platform: 'Facebook',
      content: `💬 CUSTOMER SPOTLIGHT 💬

"Absolutely fantastic service from start to finish! The team was professional, punctual, and the quality of work is outstanding. My new roof looks amazing and I feel so much more secure in my home. Highly recommend!" 

- Sarah M., Liverpool

Thank you Sarah for trusting us with your home! 🙏

Ready for your own transformation? Get in touch today!`,
      hashtags: ['#CustomerReview', '#HappyCustomer', '#RoofingLiverpool', '#QualityService'],
      imagePlaceholder: 'Customer photo with new roof',
      engagement: { likes: 28, comments: 5, shares: 3 }
    },
    {
      id: 4,
      title: 'Spring Roof Inspection Special',
      category: 'seasonal',
      platform: 'Instagram',
      content: `🌸 SPRING ROOF SPECIAL 🌸

After a long winter, your roof deserves some TLC!

🌱 FREE Spring Roof Inspection
🌱 10% off any repairs needed
🌱 Peace of mind for the year ahead

Limited time offer - book before April 30th!

Swipe up to book your inspection ⬆️

#SpringRoofCheck #LiverpoolRoofing #HomeMaintenance #SpecialOffer`,
      hashtags: ['#SpringRoofCheck', '#LiverpoolRoofing', '#HomeMaintenance', '#SpecialOffer'],
      imagePlaceholder: 'Spring roof inspection graphic',
      engagement: { likes: 41, comments: 9, shares: 12 }
    },
    {
      id: 5,
      title: 'Emergency Roof Repair Service',
      category: 'promotional',
      platform: 'Facebook',
      content: `🚨 EMERGENCY ROOF REPAIRS 🚨

Storm damage? Leak emergency? We're here to help!

✅ 24/7 Emergency Service
✅ Same-day response
✅ Insurance claim assistance
✅ Temporary repairs available

Don't let a roof problem become a bigger issue. Call us now!

📞 0151 XXX XXXX

#EmergencyRoofing #StormDamage #LiverpoolRoofing #24HourService`,
      hashtags: ['#EmergencyRoofing', '#StormDamage', '#LiverpoolRoofing', '#24HourService'],
      imagePlaceholder: 'Emergency roof repair photo',
      engagement: { likes: 67, comments: 18, shares: 25 }
    },
    {
      id: 6,
      title: 'Roofing Material Quality Guide',
      category: 'tips',
      platform: 'LinkedIn',
      content: `🏗️ ROOFING MATERIAL QUALITY GUIDE

Choosing the right roofing materials is crucial for long-term protection:

🔹 SLATE: Premium, long-lasting (100+ years)
🔹 CLAY TILES: Traditional, weather-resistant (50+ years)  
🔹 CONCRETE TILES: Durable, cost-effective (30+ years)
🔹 METAL: Modern, energy-efficient (40+ years)

Quality materials = Peace of mind

What questions do you have about roofing materials? Comment below! 👇`,
      hashtags: ['#RoofingMaterials', '#QualityConstruction', '#HomeImprovement', '#ProfessionalAdvice'],
      imagePlaceholder: 'Different roofing materials collage',
      engagement: { likes: 23, comments: 8, shares: 6 }
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? socialTemplates 
    : socialTemplates.filter(template => template.category === selectedCategory);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification
    alert('Content copied to clipboard!');
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Facebook': 'bg-blue-600',
      'Instagram': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'LinkedIn': 'bg-blue-700',
      'Twitter': 'bg-blue-400'
    };
    return colors[platform] || 'bg-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Category Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {templateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              {/* Platform Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPlatformColor(template.platform)}`}>
                  {template.platform}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Heart size={14} />
                  {template.engagement.likes}
                </div>
              </div>

              {/* Template Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{template.title}</h3>

              {/* Content Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 line-clamp-4">
                  {template.content.substring(0, 150)}...
                </p>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.hashtags.slice(0, 3).map((hashtag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {hashtag}
                  </span>
                ))}
                {template.hashtags.length > 3 && (
                  <span className="text-xs text-gray-500">+{template.hashtags.length - 3} more</span>
                )}
              </div>

              {/* Image Placeholder */}
              <div className="bg-gray-200 rounded-lg p-4 mb-4 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Image size={24} className="mx-auto mb-2" />
                  <p className="text-sm">{template.imagePlaceholder}</p>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {template.engagement.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 size={14} />
                    {template.engagement.shares}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(template.content);
                  }}
                  className="flex items-center gap-1 text-accent hover:text-accent/80"
                >
                  <Copy size={14} />
                  Copy
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTemplate.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPlatformColor(selectedTemplate.platform)}`}>
                    {selectedTemplate.platform}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Full Content */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="whitespace-pre-line text-gray-700 mb-4">
                  {selectedTemplate.content}
                </div>
                
                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="bg-gray-200 rounded-lg p-8 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Image size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">{selectedTemplate.imagePlaceholder}</p>
                  <p className="text-sm mt-2">Upload your image here</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => copyToClipboard(selectedTemplate.content)}
                  className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  <Copy size={20} />
                  Copy Content
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would download the template
                    alert('Download functionality would be implemented here');
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Download size={20} />
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SocialTemplates;
