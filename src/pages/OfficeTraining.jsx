import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Target,
  Wrench,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  ChevronRight,
  ChevronLeft,
  Home,
  Building,
  MessageSquare,
  Settings,
  BarChart3,
  DollarSign
} from 'lucide-react';

const OfficeTraining = () => {
  const [selectedModule, setSelectedModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());

  const trainingModules = [
    {
      id: 0,
      title: 'Core Office Foundations',
      duration: '45 minutes',
      icon: Home,
      description: 'Getting new admin staff aligned with company standards and systems',
      lessons: [
        {
          title: 'Welcome to [Your Company Name]',
          content: `Content to be expanded - Company introduction and overview.`
        },
        {
          title: 'Company Values & Mission',
          content: `Content to be expanded - Core company values and mission statement.`
        },
        {
          title: 'Brand Voice & Professionalism',
          content: `Content to be expanded - Professional communication standards.`
        },
        {
          title: "Who's Who in the Team",
          content: `Content to be expanded - Team structure and key contacts.`
        },
        {
          title: 'Day-to-Day Responsibilities',
          content: `Content to be expanded - Daily tasks and responsibilities.`
        },
        {
          title: 'Tone, Language & Customer Rapport',
          content: `Content to be expanded - Communication guidelines and rapport building.`
        }
      ]
    },
    {
      id: 1,
      title: 'Understanding the Roofing Process',
      duration: '30 minutes',
      icon: Building,
      description: 'Complete overview of roofing services and processes',
      lessons: [
        {
          title: 'Brief Overview of Each Service',
          content: `Content to be expanded - Repairs, re-roofs, flat roofs, gutters, etc.`
        },
        {
          title: 'From Enquiry to Invoice - Step by Step',
          content: `Content to be expanded - Complete process walkthrough.`
        },
        {
          title: 'Key Terms and Materials Overview',
          content: `Content to be expanded - Technical terminology and materials.`
        },
        {
          title: 'What Makes a "Good Job"',
          content: `Content to be expanded - Quality, cleanliness, safety standards.`
        }
      ]
    },
    {
      id: 2,
      title: 'Office Tools & Systems Setup',
      duration: '25 minutes',
      icon: Settings,
      description: 'Master the essential office tools and systems',
      lessons: [
        {
          title: 'CRM Walkthrough',
          content: `Content to be expanded - Adding leads, updating statuses.`
        },
        {
          title: 'Email Templates & Phone Scripts',
          content: `Content to be expanded - Communication templates and scripts.`
        },
        {
          title: 'Calendar / Route Planning Overview',
          content: `Content to be expanded - Scheduling and routing systems.`
        },
        {
          title: 'File Management & Naming Conventions',
          content: `Content to be expanded - Organization and storage systems.`
        },
        {
          title: 'Daily & Weekly Reporting Checklist',
          content: `Content to be expanded - Reporting procedures and checklists.`
        }
      ]
    },
    {
      id: 3,
      title: 'Lead Handling & Customer Contact',
      duration: '35 minutes',
      icon: Phone,
      description: 'Turning enquiries into booked quotes confidently and efficiently',
      lessons: [
        {
          title: 'Answering Incoming Calls',
          content: `Content to be expanded - Phone scripts, information capture, CRM logging.`
        },
        {
          title: 'Responding to Web Enquiries & Emails',
          content: `Content to be expanded - Email templates, lead qualification, assignment.`
        },
        {
          title: 'Booking Appointments',
          content: `Content to be expanded - Calendar system, confirmations, CRM updates.`
        },
        {
          title: 'Objection Handling & Lead Recovery',
          content: `Content to be expanded - Common objections, follow-up strategies.`
        }
      ]
    },
    {
      id: 4,
      title: 'Quoting & Follow-Up',
      duration: '30 minutes',
      icon: Target,
      description: 'Creating accurate, professional quotes that convert into paying jobs',
      lessons: [
        {
          title: 'How to Prepare & Send Quotes',
          content: `Content to be expanded - Quote builder, formatting, sending procedures.`
        },
        {
          title: 'Quote Follow-Up Strategy',
          content: `Content to be expanded - Follow-up timing, scripts, tracking.`
        },
        {
          title: 'Price Sensitivity & Negotiation',
          content: `Content to be expanded - Value holding, competitor responses, alternatives.`
        }
      ]
    },
    {
      id: 5,
      title: 'Job Scheduling & Coordination',
      duration: '25 minutes',
      icon: Calendar,
      description: 'Keeping the flow of work efficient and communication clear',
      lessons: [
        {
          title: 'Turning Quotes into Jobs',
          content: `Content to be expanded - Acceptance confirmation, job cards, scheduling.`
        },
        {
          title: 'Job Communication & Updates',
          content: `Content to be expanded - Delays, progress updates, photo uploads.`
        },
        {
          title: 'Aftercare & Complaints Handling',
          content: `Content to be expanded - Complaints process, follow-up tickets.`
        }
      ]
    },
    {
      id: 6,
      title: 'Invoicing, Payments & Aftercare',
      duration: '25 minutes',
      icon: DollarSign,
      description: 'Ensuring the money comes in and the client leaves happy',
      lessons: [
        {
          title: 'Creating & Sending Invoices',
          content: `Content to be expanded - Accounting software, templates, VAT handling.`
        },
        {
          title: 'Tracking Payments & Outstanding Invoices',
          content: `Content to be expanded - Reconciliation, follow-up procedures.`
        },
        {
          title: 'Aftercare & Review Collection',
          content: `Content to be expanded - Thank you messages, review requests, portfolio.`
        }
      ]
    },
    {
      id: 7,
      title: 'Reporting & Continuous Improvement',
      duration: '20 minutes',
      icon: BarChart3,
      description: 'Building awareness of performance and office impact on profit',
      lessons: [
        {
          title: 'Daily Office Dashboard Review',
          content: `Content to be expanded - Key metrics, manager updates.`
        },
        {
          title: 'End-of-Week Summary',
          content: `Content to be expanded - Weekly reporting, lessons learned.`
        },
        {
          title: 'Customer Feedback Insights',
          content: `Content to be expanded - Review analysis, trend identification.`
        }
      ]
    }
  ];

  const toggleModuleCompletion = (moduleId) => {
    const newCompleted = new Set(completedModules);
    if (newCompleted.has(moduleId)) {
      newCompleted.delete(moduleId);
    } else {
      newCompleted.add(moduleId);
    }
    setCompletedModules(newCompleted);
  };

  const currentModule = trainingModules[selectedModule];
  const currentLesson = currentModule.lessons[0]; // For now, showing first lesson

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Horizontal Module Progress Bar */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Training Progress</h2>
              <div className="text-sm text-gray-600">
                {completedModules.size}/{trainingModules.length} modules completed
              </div>
            </div>
            
            {/* Horizontal Module Bar */}
            <div className="flex items-center gap-2 mb-4">
              {trainingModules.map((module, index) => {
                const IconComponent = module.icon;
                const isCompleted = completedModules.has(module.id);
                const isSelected = selectedModule === index;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex-1 relative group cursor-pointer`}
                    onClick={() => setSelectedModule(index)}
                  >
                    {/* Module Item */}
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      isSelected 
                        ? 'bg-accent text-white shadow-lg transform scale-105' 
                        : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                          isSelected ? 'bg-white/20' : isCompleted ? 'bg-green-200' : 'bg-gray-200'
                        }`}>
                          <IconComponent size={16} className={
                            isSelected ? 'text-white' : isCompleted ? 'text-green-600' : 'text-gray-500'
                          } />
                        </div>
                        <div className="text-xs font-medium">
                          {index + 1}
                        </div>
                        {isCompleted && !isSelected && (
                          <CheckCircle size={12} className="text-green-500 mt-1" />
                        )}
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    {index < trainingModules.length - 1 && (
                      <div className={`absolute top-1/2 left-full w-2 h-0.5 transform -translate-y-1/2 -translate-x-1 ${
                        isCompleted ? 'bg-green-400' : 'bg-gray-300'
                      }`} />
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedModules.size / trainingModules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            {/* Module Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center">
                    {(() => {
                      const IconComponent = currentModule.icon;
                      return <IconComponent size={24} className="text-accent" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Module {selectedModule + 1}: {currentModule.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {currentModule.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {currentModule.lessons.length} lessons
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{currentModule.description}</p>
              </div>
              
              <button
                onClick={() => toggleModuleCompletion(currentModule.id)}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  completedModules.has(currentModule.id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-accent text-white hover:bg-accent/90'
                }`}
              >
                {completedModules.has(currentModule.id) ? (
                  <>
                    <CheckCircle size={20} />
                    Completed
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    Mark Complete
                  </>
                )}
              </button>
            </div>

            {/* Lesson Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentLesson.title}
                </h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {currentLesson.content}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedModule(Math.max(0, selectedModule - 1))}
                disabled={selectedModule === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="text-sm text-gray-500">
                Module {selectedModule + 1} of {trainingModules.length}
              </div>
              
              <button
                onClick={() => setSelectedModule(Math.min(trainingModules.length - 1, selectedModule + 1))}
                disabled={selectedModule === trainingModules.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfficeTraining;
