import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Upload, 
  Wand2, 
  Send, 
  Download, 
  Copy, 
  RefreshCw,
  Sparkles,
  Camera,
  FileImage,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Save,
  Eye,
  Settings,
  Lightbulb,
  Hash,
  AtSign,
  Calendar,
  Clock
} from 'lucide-react';
import { useDataManager } from '../hooks/useDataManager';

const SocialPostCreation = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [postType, setPostType] = useState('image');
  const [imageSource, setImageSource] = useState('ai'); // 'ai' or 'upload'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  // Use data manager for persistent data
  const {
    data: postData,
    setData: setPostData,
    loading,
    saving,
    error,
    hasUnsavedChanges,
    saveData: forceSave
  } = useDataManager('social-post-creation', {
    posts: [],
    templates: [],
    settings: {
      defaultPlatform: 'instagram',
      autoSave: true,
      aiImageStyle: 'professional',
      contentTone: 'friendly'
    }
  });

  // Pre-written prompts for different industries
  const promptTemplates = [
    {
      id: 'roofing-before-after',
      title: 'Before & After Transformation',
      prompt: 'Create a social media post showcasing a dramatic roof transformation. Include before and after photos, highlight the quality of work, and emphasize customer satisfaction.',
      industry: 'roofing',
      platforms: ['instagram', 'facebook']
    },
    {
      id: 'roofing-safety-tip',
      title: 'Safety Tip Tuesday',
      prompt: 'Create an educational post about roof safety tips for homeowners. Make it informative but engaging, with a call-to-action for professional inspection.',
      industry: 'roofing',
      platforms: ['instagram', 'facebook', 'linkedin']
    },
    {
      id: 'roofing-seasonal',
      title: 'Seasonal Maintenance',
      prompt: 'Create a seasonal maintenance reminder post. Include weather-specific advice and encourage homeowners to prepare their roofs for the upcoming season.',
      industry: 'roofing',
      platforms: ['facebook', 'linkedin']
    },
    {
      id: 'roofing-customer-story',
      title: 'Customer Success Story',
      prompt: 'Create a customer testimonial post highlighting a successful roofing project. Include quotes, project details, and showcase the team\'s expertise.',
      industry: 'roofing',
      platforms: ['instagram', 'facebook', 'linkedin']
    },
    {
      id: 'roofing-educational',
      title: 'Roofing Education',
      prompt: 'Create an educational post explaining different roofing materials, their benefits, and when to choose each type. Make it informative for homeowners.',
      industry: 'roofing',
      platforms: ['linkedin', 'facebook']
    },
    {
      id: 'roofing-team-spotlight',
      title: 'Team Spotlight',
      prompt: 'Create a team spotlight post introducing your roofing professionals. Highlight their experience, certifications, and commitment to quality work.',
      industry: 'roofing',
      platforms: ['instagram', 'facebook', 'linkedin']
    }
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setPostData(prev => ({
          ...prev,
          currentPost: {
            ...prev.currentPost,
            image: e.target.result,
            imageSource: 'upload'
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIImage = async () => {
    if (!aiImagePrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI image generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would call the OpenAI DALL-E API
      const mockImage = `https://picsum.photos/800/600?random=${Date.now()}`;
      setGeneratedImage(mockImage);
      
      setPostData(prev => ({
        ...prev,
        currentPost: {
          ...prev.currentPost,
          image: mockImage,
          imageSource: 'ai',
          aiPrompt: aiImagePrompt
        }
      }));
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContent = async () => {
    const prompt = selectedPrompt || customPrompt;
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would call the OpenAI API
      const mockContent = `🏠 **Roofing Excellence at Its Finest!** 🏠

Just completed another stunning roof transformation! Our team worked tirelessly to deliver exceptional results that exceeded our customer's expectations.

✨ **What we accomplished:**
• Complete roof replacement
• Premium materials used
• Weather-resistant installation
• 25-year warranty included

Our customer couldn't be happier with the results! 

#Roofing #HomeImprovement #QualityWork #CustomerSatisfaction #BeforeAndAfter #ProfessionalRoofing #HomeRenovation #Excellence`;

      setGeneratedContent(mockContent);
      
      setPostData(prev => ({
        ...prev,
        currentPost: {
          ...prev.currentPost,
          content: mockContent,
          prompt: prompt
        }
      }));
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = async () => {
    setIsPosting(true);
    try {
      // Simulate posting to social media
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPost = {
        id: Date.now(),
        platform: selectedPlatform,
        content: generatedContent,
        image: uploadedImage || generatedImage,
        scheduledDate: scheduledDate,
        scheduledTime: scheduledTime,
        createdAt: new Date().toISOString(),
        status: scheduledDate ? 'scheduled' : 'posted'
      };
      
      setPostData(prev => ({
        ...prev,
        posts: [...(prev.posts || []), newPost],
        currentPost: {}
      }));
      
      // Reset form
      setGeneratedContent('');
      setUploadedImage(null);
      setGeneratedImage(null);
      setAiImagePrompt('');
      setCustomPrompt('');
      setSelectedPrompt('');
      
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = uploadedImage || generatedImage;
    link.download = `social-post-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Sparkles className="w-8 h-8 text-accent mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Social Media Post Creation</h1>
            <p className="text-gray-600">Create engaging posts with AI-powered content and image generation</p>
          </div>
        </div>
        
        {/* Save Status */}
        <div className="flex items-center space-x-2">
          {saving && (
            <div className="flex items-center text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
              Saving...
            </div>
          )}
          {hasUnsavedChanges && !saving && (
            <div className="flex items-center text-orange-600 text-sm">
              <RefreshCw size={16} className="mr-1" />
              Unsaved
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Creation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-accent" />
              Select Platform
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPlatform === platform.id
                        ? 'border-accent bg-accent/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{platform.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2 text-accent" />
              Image Selection
            </h3>
            
            {/* Image Source Toggle */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setImageSource('ai')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
                  imageSource === 'ai'
                    ? 'bg-white text-accent shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI Generate
              </button>
              <button
                onClick={() => setImageSource('upload')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
                  imageSource === 'upload'
                    ? 'bg-white text-accent shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </button>
            </div>

            {/* AI Image Generation */}
            {imageSource === 'ai' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe the image you want to generate
                  </label>
                  <textarea
                    value={aiImagePrompt}
                    onChange={(e) => setAiImagePrompt(e.target.value)}
                    placeholder="e.g., A professional roofing team working on a modern house with blue sky background, high quality, realistic"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    rows={3}
                  />
                </div>
                <button
                  onClick={generateAIImage}
                  disabled={!aiImagePrompt.trim() || isGenerating}
                  className="w-full flex items-center justify-center px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Image Upload */}
            {imageSource === 'upload' && (
              <div className="space-y-4">
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload an image</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
            )}

            {/* Image Preview */}
            {(uploadedImage || generatedImage) && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                <div className="relative">
                  <img
                    src={uploadedImage || generatedImage}
                    alt="Post preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={downloadImage}
                      className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                      title="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Generation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-accent" />
              Content Generation
            </h3>
            
            {/* Prompt Templates */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a pre-written prompt or create your own
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {promptTemplates
                  .filter(template => template.platforms.includes(selectedPlatform))
                  .map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedPrompt(template.prompt)}
                      className={`p-4 text-left rounded-lg border transition-all duration-200 ${
                        selectedPrompt === template.prompt
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-medium text-gray-800 mb-1">{template.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{template.prompt}</p>
                    </button>
                  ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or write your own prompt
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe what kind of post you want to create..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                rows={3}
              />
            </div>

            <button
              onClick={generateContent}
              disabled={(!selectedPrompt && !customPrompt.trim()) || isGenerating}
              className="w-full flex items-center justify-center px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </button>

            {/* Generated Content */}
            {generatedContent && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Generated Content</h4>
                  <button
                    onClick={() => copyToClipboard(generatedContent)}
                    className="flex items-center text-sm text-accent hover:text-accent/80"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scheduling */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent" />
              Schedule Post
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Send className="w-5 h-5 mr-2 text-accent" />
              Post Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={handlePost}
                disabled={!generatedContent || isPosting}
                className="w-full flex items-center justify-center px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPosting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {scheduledDate ? 'Schedule Post' : 'Post Now'}
                  </>
                )}
              </button>
              
              <button
                onClick={() => forceSave()}
                className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              Recent Posts
            </h3>
            <div className="space-y-3">
              {(postData?.posts || []).slice(0, 3).map((post) => (
                <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 capitalize">
                      {post.platform}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'posted' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialPostCreation;
