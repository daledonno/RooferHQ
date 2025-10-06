import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, TrendingUp, Calendar, Clock, MapPin, User } from 'lucide-react';

const Pipeline = () => {
  const [customers, setCustomers] = useState([]);
  const [customerCounter, setCustomerCounter] = useState(1);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedCustomerForCalendar, setSelectedCustomerForCalendar] = useState(null);

  // Zone information data
  const zoneInfo = {
    'lead-intake': {
      title: 'Lead Intake',
      tasks: [
        'Answer phone calls promptly',
        'Collect contact information',
        'Record lead source (referral, website, etc.)',
        'Schedule initial contact call',
        'Add to CRM system'
      ],
      notes: 'First impression is crucial. Be professional and helpful.'
    },
    'initial-contact': {
      title: 'Initial Contact',
      tasks: [
        'Call customer within 24 hours',
        'Introduce company and services',
        'Gather project details',
        'Assess urgency and timeline',
        'Schedule site visit if interested'
      ],
      notes: 'Build rapport and understand customer needs.'
    },
    'site-visit': {
      title: 'Site Visit / Inspection',
      tasks: [
        'Arrive on time with proper equipment',
        'Take detailed photos of roof',
        'Measure roof dimensions',
        'Assess damage and materials needed',
        'Discuss timeline and process with customer'
      ],
      notes: 'Professional appearance and thorough inspection build trust.'
    },
    'quote-sent': {
      title: 'Quote Sent',
      tasks: [
        'Prepare detailed written estimate',
        'Include material specifications',
        'List all work to be performed',
        'Provide timeline and payment terms',
        'Follow up within 48 hours'
      ],
      notes: 'Clear, detailed quotes reduce questions and increase close rate.'
    },
    'customer-decision': {
      title: 'Customer Decision',
      tasks: [
        'Follow up on quote within 3 days',
        'Address any questions or concerns',
        'Offer financing options if needed',
        'Provide references if requested',
        'Be available for additional discussions'
      ],
      notes: 'Stay engaged but not pushy. Help them make an informed decision.'
    },
    'job-scheduled': {
      title: 'Job Scheduled',
      tasks: [
        'Confirm start date and timeline',
        'Order materials and equipment',
        'Schedule crew and subcontractors',
        'Notify customer of schedule',
        'Prepare job site access'
      ],
      notes: 'Clear communication prevents delays and customer frustration.'
    },
    'work-progress': {
      title: 'Work in Progress',
      tasks: [
        'Maintain clean work site',
        'Protect customer property',
        'Provide daily progress updates',
        'Address any issues immediately',
        'Ensure quality workmanship'
      ],
      notes: 'Professional work site management reflects company quality.'
    },
    'invoice-sent': {
      title: 'Invoice Sent',
      tasks: [
        'Send final invoice promptly',
        'Include all work performed',
        'Provide payment options',
        'Set clear payment terms',
        'Follow up on payment status'
      ],
      notes: 'Clear invoicing ensures timely payment.'
    },
    'payment-received': {
      title: 'Payment Received',
      tasks: [
        'Process payment promptly',
        'Send payment confirmation',
        'Update customer records',
        'Issue warranty documentation',
        'Schedule follow-up call'
      ],
      notes: 'Professional payment processing maintains customer satisfaction.'
    },
    'aftercare': {
      title: 'Aftercare / Follow-Up',
      tasks: [
        'Call customer 1 week after completion',
        'Address any concerns or issues',
        'Provide maintenance tips',
        'Request online review',
        'Add to referral program'
      ],
      notes: 'Excellent aftercare leads to referrals and repeat business.'
    }
  };

  const workflowZones = [
    'lead-intake', 'initial-contact', 'site-visit', 'quote-sent',
    'customer-decision', 'job-scheduled', 'work-progress',
    'invoice-sent', 'payment-received', 'aftercare'
  ];

  // Load workflow from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('roofing-workflow');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCustomers(data.customers || []);
        setCustomerCounter(data.counter || 1);
      } catch (error) {
        console.error('Error loading workflow data:', error);
        // Reset to defaults if data is corrupted
        setCustomers([]);
        setCustomerCounter(1);
      }
    }
  }, []);

  // Save workflow to localStorage whenever customers change (but not on initial load)
  useEffect(() => {
    // Only save if we have customers or if this isn't the initial load
    if (customers.length > 0 || customerCounter > 1) {
      try {
        localStorage.setItem('roofing-workflow', JSON.stringify({
          customers: customers,
          counter: customerCounter
        }));
        console.log('Pipeline data saved:', { customers: customers.length, counter: customerCounter });
        
        // Dispatch custom event to update header stats
        window.dispatchEvent(new CustomEvent('pipelineStatsUpdate', {
          detail: {
            total: customers.length,
            active: customers.length,
            completed: 0
          }
        }));
      } catch (error) {
        console.error('Error saving workflow data:', error);
      }
    }
  }, [customers, customerCounter]);

  const addNewCustomer = (customerData) => {
    const newCustomer = {
      id: customerCounter,
      name: customerData.name,
      gender: customerData.gender,
      character: customerData.character,
      phone: customerData.phone || `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: customerData.email || `customer${customerCounter}@email.com`,
      zone: 'lead-intake',
      completed: false
    };
    
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    setCustomerCounter(customerCounter + 1);
    setShowCustomerForm(false);
    
    // Force save immediately
    setTimeout(() => {
      localStorage.setItem('roofing-workflow', JSON.stringify({
        customers: updatedCustomers,
        counter: customerCounter + 1
      }));
    }, 100);
  };

  const moveCustomer = (customerId, newZone) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === customerId ? { ...customer, zone: newZone } : customer
    );
    setCustomers(updatedCustomers);
    
    // Force save immediately
    setTimeout(() => {
      localStorage.setItem('roofing-workflow', JSON.stringify({
        customers: updatedCustomers,
        counter: customerCounter
      }));
    }, 100);
  };

  const removeCustomer = (customerId) => {
    const updatedCustomers = customers.filter(customer => customer.id !== customerId);
    setCustomers(updatedCustomers);
    
    // Force save immediately
    setTimeout(() => {
      localStorage.setItem('roofing-workflow', JSON.stringify({
        customers: updatedCustomers,
        counter: customerCounter
      }));
    }, 100);
  };

  const updateCustomer = (customerId, updatedData) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === customerId ? { ...customer, ...updatedData } : customer
    );
    setCustomers(updatedCustomers);
    setShowCustomerDetails(false);
    setEditingCustomer(null);
    
    // Force save immediately
    setTimeout(() => {
      localStorage.setItem('roofing-workflow', JSON.stringify({
        customers: updatedCustomers,
        counter: customerCounter
      }));
    }, 100);
  };

  const handleDragStart = (e, customerId) => {
    e.dataTransfer.setData('text/plain', customerId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneName) => {
    e.preventDefault();
    const customerId = parseInt(e.dataTransfer.getData('text/plain'));
    moveCustomer(customerId, zoneName);
  };

  const handleContextMenu = (e, customerId) => {
    e.preventDefault();
    setSelectedCustomerId(customerId);
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  const markCustomerDone = () => {
    if (selectedCustomerId) {
      removeCustomer(selectedCustomerId);
      setShowContextMenu(false);
      setSelectedCustomerId(null);
    }
  };

  const getCustomersInZone = (zoneName) => {
    return customers.filter(customer => customer.zone === zoneName);
  };

  // Calendar functionality
  const openCalendarModal = (customer) => {
    setSelectedCustomerForCalendar(customer);
    setShowCalendarModal(true);
  };

  const generateGoogleCalendarUrl = (customer, eventData) => {
    const { title, description, startDate, endDate, location } = eventData;
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${start}/${end}`,
      details: description,
      location: location,
      trp: 'false'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const addToCalendar = (customer, eventData) => {
    const calendarUrl = generateGoogleCalendarUrl(customer, eventData);
    window.open(calendarUrl, '_blank');
    setShowCalendarModal(false);
    setSelectedCustomerForCalendar(null);
  };

  const getEventSuggestion = (customer) => {
    const zone = customer.zone;
    const now = new Date();
    
    switch (zone) {
      case 'lead-intake':
        return {
          title: `Follow up with ${customer.name}`,
          description: `Initial contact call for roofing project. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
          location: 'Phone Call'
        };
      case 'initial-contact':
        return {
          title: `Site Visit - ${customer.name}`,
          description: `Schedule site visit for roofing inspection. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
          endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
          location: customer.address || 'Customer Address'
        };
      case 'site-visit':
        return {
          title: `Send Quote - ${customer.name}`,
          description: `Prepare and send roofing quote. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
          location: 'Office'
        };
      case 'quote-sent':
        return {
          title: `Follow up Quote - ${customer.name}`,
          description: `Follow up on sent quote. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
          location: 'Phone Call'
        };
      case 'customer-decision':
        return {
          title: `Final Follow up - ${customer.name}`,
          description: `Final follow up call for decision. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
          location: 'Phone Call'
        };
      case 'job-scheduled':
        return {
          title: `Roofing Job - ${customer.name}`,
          description: `Scheduled roofing work. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
          endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8 hours later
          location: customer.address || 'Customer Address'
        };
      default:
        return {
          title: `Follow up - ${customer.name}`,
          description: `General follow up. Phone: ${customer.phone}`,
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
          location: 'Phone Call'
        };
    }
  };

  const getZoneIcon = (zoneName) => {
    const icons = {
      'lead-intake': '📞',
      'initial-contact': '🤝',
      'site-visit': '🔍',
      'quote-sent': '📋',
      'customer-decision': '🤔',
      'job-scheduled': '📅',
      'work-progress': '🔨',
      'invoice-sent': '🧾',
      'payment-received': '💰',
      'aftercare': '❤️'
    };
    return icons[zoneName] || '📋';
  };

  const getZoneTitle = (zoneName) => {
    const titles = {
      'lead-intake': 'Lead Intake',
      'initial-contact': 'Initial Contact',
      'site-visit': 'Site Visit',
      'quote-sent': 'Quote Sent',
      'customer-decision': 'Customer Decision',
      'job-scheduled': 'Job Scheduled',
      'work-progress': 'Work in Progress',
      'invoice-sent': 'Invoice Sent',
      'payment-received': 'Payment Received',
      'aftercare': 'Aftercare'
    };
    return titles[zoneName] || zoneName;
  };

  const getZoneDescription = (zoneName) => {
    const descriptions = {
      'lead-intake': 'New leads come in through phone, website, or referrals',
      'initial-contact': 'First contact with customer, gather basic info',
      'site-visit': 'Inspect roof, take measurements, assess damage',
      'quote-sent': 'Detailed estimate sent to customer',
      'customer-decision': 'Customer reviews quote and makes decision',
      'job-scheduled': 'Work scheduled, materials ordered',
      'work-progress': 'Roofing work is being performed',
      'invoice-sent': 'Final invoice sent to customer',
      'payment-received': 'Payment received and processed',
      'aftercare': 'Follow-up, warranty, and customer satisfaction'
    };
    return descriptions[zoneName] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-2 sm:p-4 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
        <button
          onClick={() => setShowCustomerForm(true)}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-xs sm:text-sm lg:text-base"
        >
          <Plus size={14} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
          <span>Add New Lead</span>
        </button>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all customers?')) {
              setCustomers([]);
              setCustomerCounter(1);
              // Force save immediately
              setTimeout(() => {
                localStorage.setItem('roofing-workflow', JSON.stringify({
                  customers: [],
                  counter: 1
                }));
              }, 100);
            }
          }}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs sm:text-sm lg:text-base"
        >
          <Trash2 size={14} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
          <span>Clear All</span>
        </button>
        <button
          onClick={() => {
            // Manual save function
            try {
              localStorage.setItem('roofing-workflow', JSON.stringify({
                customers: customers,
                counter: customerCounter
              }));
              alert(`Progress saved! ${customers.length} customers saved.`);
            } catch (error) {
              alert('Error saving data. Please try again.');
            }
          }}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm lg:text-base"
        >
          <Save size={14} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
          <span>Save Progress</span>
        </button>
      </div>

      {/* Workflow Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-4 lg:mb-8">
        {workflowZones.map((zoneName, index) => {
          const zoneCustomers = getCustomersInZone(zoneName);
          const isFirstRow = index < 5;
          const isLastInRow = (index + 1) % 5 === 0;
          
          return (
            <motion.div
              key={zoneName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 min-h-[120px] sm:min-h-[150px] lg:min-h-[200px] relative cursor-pointer hover:shadow-lg transition-all duration-300"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zoneName)}
              onClick={() => {
                // Show zone info modal
                const info = zoneInfo[zoneName];
                if (info) {
                  alert(`${info.title}\n\nTasks:\n${info.tasks.map(task => `• ${task}`).join('\n')}\n\nNotes: ${info.notes}`);
                }
              }}
            >
              {/* Zone Header */}
              <div className="flex items-center mb-1 sm:mb-2 lg:mb-3">
                <span className="text-base sm:text-lg lg:text-xl mr-1 sm:mr-2">{getZoneIcon(zoneName)}</span>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-sm truncate">{getZoneTitle(zoneName)}</h3>
              </div>
              
              {/* Zone Description */}
              <p className="text-xs text-gray-600 mb-2 sm:mb-3 lg:mb-4 leading-tight sm:leading-relaxed line-clamp-2">
                {getZoneDescription(zoneName)}
              </p>
              
              {/* Customer Heads */}
              <div className="min-h-[30px] sm:min-h-[40px] lg:min-h-[60px] flex flex-wrap gap-1 lg:gap-2">
                {zoneCustomers.map((customer, customerIndex) => (
                  <motion.div
                    key={customer.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full cursor-grab active:cursor-grabbing border-2 border-white shadow-lg relative group"
                    draggable
                    onDragStart={(e) => handleDragStart(e, customer.id)}
                    onContextMenu={(e) => handleContextMenu(e, customer.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCustomer(customer);
                      setShowCustomerDetails(true);
                    }}
                    style={{
                      backgroundImage: `url(/src/assets/characters/${customer.character}.svg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Customer Info Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      <div className="font-semibold">{customer.name}</div>
                      <div>{customer.phone}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>

                    {/* Calendar Button */}
                    <button
                      className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCalendarModal(customer);
                      }}
                      title="Add to Calendar"
                    >
                      <Calendar size={8} className="sm:w-2 sm:h-2 lg:w-3 lg:h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Arrow indicators */}
              {!isLastInRow && (
                <div className="absolute right-[-10px] lg:right-[-20px] top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:block">
                  <span className="text-lg lg:text-xl">→</span>
                </div>
              )}
              {!isFirstRow && index === 9 && (
                <div className="absolute bottom-[-10px] lg:bottom-[-20px] left-1/2 transform -translate-x-1/2 text-gray-400 hidden sm:block">
                  <span className="text-lg lg:text-xl">↓</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <CustomerForm
          onAdd={addNewCustomer}
          onCancel={() => setShowCustomerForm(false)}
        />
      )}

      {/* Customer Details Modal */}
      {showCustomerDetails && editingCustomer && (
        <CustomerDetails
          customer={editingCustomer}
          onSave={updateCustomer}
          onCancel={() => {
            setShowCustomerDetails(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50 py-1 min-w-[150px]"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          onMouseLeave={() => setShowContextMenu(false)}
        >
          <button
            onClick={markCustomerDone}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 text-gray-800"
          >
            <span>✓</span>
            <span>Mark as Done & Remove</span>
          </button>
          <button
            onClick={() => {
              if (selectedCustomerId && confirm('Are you sure you want to remove this customer?')) {
                removeCustomer(selectedCustomerId);
                setShowContextMenu(false);
                setSelectedCustomerId(null);
              }
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 text-gray-800"
          >
            <Trash2 size={14} />
            <span>Remove Customer</span>
          </button>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && selectedCustomerForCalendar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCalendarModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-4 lg:p-6 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-blue-500" />
                Add to Calendar
              </h3>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200"
                  style={{
                    backgroundImage: `url(/src/assets/characters/${selectedCustomerForCalendar.character}.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{selectedCustomerForCalendar.name}</h4>
                  <p className="text-sm text-gray-600">{selectedCustomerForCalendar.phone}</p>
                </div>
              </div>

              {(() => {
                const eventSuggestion = getEventSuggestion(selectedCustomerForCalendar);
                return (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Suggested Event
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-16">Title:</span>
                        <span className="text-gray-600">{eventSuggestion.title}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-16">Date:</span>
                        <span className="text-gray-600">
                          {eventSuggestion.startDate.toLocaleDateString()} at {eventSuggestion.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-16">Duration:</span>
                        <span className="text-gray-600">
                          {Math.round((eventSuggestion.endDate - eventSuggestion.startDate) / (1000 * 60))} minutes
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-16">Location:</span>
                        <span className="text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {eventSuggestion.location}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-16">Details:</span>
                        <span className="text-gray-600">{eventSuggestion.description}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => {
                  const eventSuggestion = getEventSuggestion(selectedCustomerForCalendar);
                  addToCalendar(selectedCustomerForCalendar, eventSuggestion);
                }}
                className="flex-1 bg-blue-500 text-white py-2 lg:py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm lg:text-base"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Google Calendar
              </button>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 lg:py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm lg:text-base"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Customer Form Component
const CustomerForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    character: '00',
    phone: '',
    email: ''
  });

  const characters = ['00', '01', '02', '10', '11', '12', '20', '21', '22', '30', '31', '32', '40', '41', '42'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd(formData);
    } else {
      alert('Please enter a customer name');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-4 lg:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Add New Customer</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer-name" className="block text-sm font-medium text-gray-800 mb-1">Customer Name</label>
            <input
              id="customer-name"
              name="customer-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Choose Character</label>
            <div className="flex flex-wrap gap-2">
              {characters.map(char => (
                <button
                  key={char}
                  type="button"
                  onClick={() => setFormData({ ...formData, character: char })}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    formData.character === char 
                      ? 'border-accent ring-2 ring-accent/30' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundImage: `url(/src/assets/characters/${char}.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
            <input
              id="customer-phone"
              name="customer-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="customer-email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
            <input
              id="customer-email"
              name="customer-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base"
              placeholder="customer@email.com"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-accent text-white py-2 lg:py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm lg:text-base"
            >
              Add Customer
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 lg:py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm lg:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Customer Details Component
const CustomerDetails = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState(customer);

  const characters = ['00', '01', '02', '10', '11', '12', '20', '21', '22', '30', '31', '32', '40', '41', '42'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(customer.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-4 lg:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Edit Customer Details</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-customer-name" className="block text-sm font-medium text-gray-800 mb-1">Customer Name</label>
            <input
              id="edit-customer-name"
              name="edit-customer-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Choose Character</label>
            <div className="flex flex-wrap gap-2">
              {characters.map(char => (
                <button
                  key={char}
                  type="button"
                  onClick={() => setFormData({ ...formData, character: char })}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    formData.character === char 
                      ? 'border-accent ring-2 ring-accent/30' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundImage: `url(/src/assets/characters/${char}.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="edit-customer-phone" className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
            <input
              id="edit-customer-phone"
              name="edit-customer-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            />
          </div>

          <div>
            <label htmlFor="edit-customer-email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
            <input
              id="edit-customer-email"
              name="edit-customer-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Current Stage</label>
            <select
              value={formData.zone}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 text-sm lg:text-base"
            >
              <option value="lead-intake">Lead Intake</option>
              <option value="initial-contact">Initial Contact</option>
              <option value="site-visit">Site Visit</option>
              <option value="quote-sent">Quote Sent</option>
              <option value="customer-decision">Customer Decision</option>
              <option value="job-scheduled">Job Scheduled</option>
              <option value="work-progress">Work in Progress</option>
              <option value="invoice-sent">Invoice Sent</option>
              <option value="payment-received">Payment Received</option>
              <option value="aftercare">Aftercare</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-accent text-white py-2 lg:py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm lg:text-base"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 lg:py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm lg:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Pipeline;