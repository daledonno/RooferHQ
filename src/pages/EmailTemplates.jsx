import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Info, Copy, Check } from 'lucide-react';

const EmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      id: 0,
      title: "New Lead / Enquiry Email",
      template: {
        subject: "Thank you for your enquiry – [Company Name]",
        greeting: "Hi [Customer Name],",
        acknowledgment: "Thank you for reaching out regarding [Service Type].",
        nextSteps: "One of our specialists will contact you shortly to arrange a [quote / inspection].",
        closing: "We look forward to helping you with your roofing project. Best regards, [Your Name / Company Name]"
      },
      tooltip: {
        tone: "Friendly, prompt, professional",
        bestPractices: "Personalize with customer name, acknowledge their specific service need, set clear expectations for next steps."
      }
    },
    {
      id: 1,
      title: "Quote / Proposal Email",
      template: {
        subject: "Your Roofing Quote – [Company Name]",
        greeting: "Hi [Customer Name],",
        summary: "Please find attached your quote for [Service Type] at [Address].",
        details: "The total cost is [£Amount]. Please review and let us know if you would like to proceed. We're happy to schedule the work at a convenient time for you.",
        closing: "Thank you for considering [Company Name], we look forward to working with you."
      },
      tooltip: {
        tone: "Clear, transparent, professional",
        bestPractices: "Be transparent about costs, provide clear call-to-action, offer flexibility in scheduling."
      }
    },
    {
      id: 2,
      title: "Follow-Up / Reminder Email",
      template: {
        subject: "Follow-up on Your Roofing Quote – [Company Name]",
        greeting: "Hi [Customer Name],",
        reminder: "We wanted to follow up regarding the quote we sent on [Date] for [Service Type].",
        callToAction: "Please let us know if you have any questions or would like to schedule the work.",
        closing: "We look forward to hearing from you soon. Best regards, [Your Name / Company Name]"
      },
      tooltip: {
        tone: "Polite, gentle nudge, maintain professionalism",
        bestPractices: "Reference specific date and service, avoid being pushy, offer to answer questions."
      }
    },
    {
      id: 3,
      title: "Job Confirmation / Scheduling Email",
      template: {
        subject: "Booking Confirmation – [Company Name]",
        greeting: "Hi [Customer Name],",
        details: "Your roofing appointment for [Service Type] is confirmed for [Date / Time] at [Address].",
        instructions: "Please ensure [access / safety instructions].",
        closing: "We look forward to providing you with excellent service. Best regards, [Company Name]"
      },
      tooltip: {
        tone: "Friendly, informative, reassuring",
        bestPractices: "Confirm all details clearly, provide necessary instructions, reassure about service quality."
      }
    },
    {
      id: 4,
      title: "Job Completion / Thank You Email",
      template: {
        subject: "Thank You for Choosing [Company Name]",
        greeting: "Hi [Customer Name],",
        acknowledgment: "We hope you're happy with the completed [Service Type] at [Address].",
        callToAction: "If you have a moment, we'd greatly appreciate a review on [Google / Facebook / Trustpilot].",
        closing: "Thanks again for trusting [Company Name]. Best regards, [Your Name / Company Name]"
      },
      tooltip: {
        tone: "Warm, appreciative, gentle CTA for review",
        bestPractices: "Express genuine gratitude, gently request review without pressure, reinforce trust."
      }
    },
    {
      id: 5,
      title: "Complaint / Issue Resolution Email",
      template: {
        subject: "Regarding Your Recent Concern – [Company Name]",
        greeting: "Hi [Customer Name],",
        acknowledgment: "We understand your concern regarding [Issue] and apologize for the inconvenience.",
        resolutionSteps: "Our team will [inspect / repair / follow-up] on [Date / Time] to resolve this matter.",
        closing: "Thank you for your patience. Best regards, [Your Name / Company Name]"
      },
      tooltip: {
        tone: "Empathetic, solution-focused, professional",
        bestPractices: "Acknowledge the issue, take responsibility, provide clear resolution steps, maintain professionalism."
      }
    },
    {
      id: 6,
      title: "Payment / Invoice Email",
      template: {
        subject: "Invoice [#Invoice] – [Company Name]",
        greeting: "Hi [Customer Name],",
        statement: "Please find attached your invoice of [£Amount] for [Service Type] completed on [Date].",
        paymentInstructions: "Payment is due by [Due Date]. You can pay via [Bank Transfer / Online Payment].",
        closing: "Thank you for your business. Best regards, [Your Name / Company Name]"
      },
      tooltip: {
        tone: "Professional, clear, polite but firm",
        bestPractices: "Be clear about amounts and due dates, provide multiple payment options, maintain professional tone."
      }
    },
    {
      id: 7,
      title: "Seasonal / Marketing Email",
      template: {
        subject: "Is Your Roof Ready for [Winter/Summer]?",
        greeting: "Hi [Customer Name],",
        content: "Ensure your roof is protected with our [Inspection / Maintenance / Cleaning] services.",
        callToAction: "Book your appointment now for [Date / Offer].",
        closing: "Stay safe and dry, [Company Name]"
      },
      tooltip: {
        tone: "Friendly, informative, lightly persuasive",
        bestPractices: "Make it relevant to season, offer value, keep it conversational, include clear call-to-action."
      }
    }
  ];

  const copyToClipboard = async () => {
    const template = templates[selectedTemplate];
    let emailContent = `Subject: ${template.template.subject}\n\n`;
    
    emailContent += `${template.template.greeting}\n\n`;
    
    if (template.template.acknowledgment) {
      emailContent += `${template.template.acknowledgment}\n\n`;
    }
    
    if (template.template.summary) {
      emailContent += `${template.template.summary}\n\n`;
    }
    
    if (template.template.details) {
      emailContent += `${template.template.details}\n\n`;
    }
    
    if (template.template.reminder) {
      emailContent += `${template.template.reminder}\n\n`;
    }
    
    if (template.template.callToAction) {
      emailContent += `${template.template.callToAction}\n\n`;
    }
    
    if (template.template.instructions) {
      emailContent += `${template.template.instructions}\n\n`;
    }
    
    if (template.template.resolutionSteps) {
      emailContent += `${template.template.resolutionSteps}\n\n`;
    }
    
    if (template.template.statement) {
      emailContent += `${template.template.statement}\n\n`;
    }
    
    if (template.template.paymentInstructions) {
      emailContent += `${template.template.paymentInstructions}\n\n`;
    }
    
    if (template.template.content) {
      emailContent += `${template.template.content}\n\n`;
    }
    
    if (template.template.nextSteps) {
      emailContent += `${template.template.nextSteps}\n\n`;
    }
    
    emailContent += `${template.template.closing}`;

    try {
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto"
    >

      {/* Template Selector Toggle */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {templates.map((template, index) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(index)}
                className={`px-3 py-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedTemplate === index
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Display */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Mail size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {templates[selectedTemplate].title}
                </h2>
              </div>
              <motion.button
                onClick={copyToClipboard}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="space-y-6">
              {/* Subject */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Subject:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg font-medium">
                  "{templates[selectedTemplate].template.subject}"
                </p>
              </div>

              {/* Greeting */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Greeting:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  "{templates[selectedTemplate].template.greeting}"
                </p>
              </div>

              {/* Acknowledgment */}
              {templates[selectedTemplate].template.acknowledgment && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Acknowledgment:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.acknowledgment}"
                  </p>
                </div>
              )}

              {/* Summary */}
              {templates[selectedTemplate].template.summary && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.summary}"
                  </p>
                </div>
              )}

              {/* Details */}
              {templates[selectedTemplate].template.details && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Details:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.details}"
                  </p>
                </div>
              )}

              {/* Reminder */}
              {templates[selectedTemplate].template.reminder && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Reminder:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.reminder}"
                  </p>
                </div>
              )}

              {/* Call to Action */}
              {templates[selectedTemplate].template.callToAction && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Call to Action:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.callToAction}"
                  </p>
                </div>
              )}

              {/* Instructions */}
              {templates[selectedTemplate].template.instructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.instructions}"
                  </p>
                </div>
              )}

              {/* Resolution Steps */}
              {templates[selectedTemplate].template.resolutionSteps && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Resolution Steps:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.resolutionSteps}"
                  </p>
                </div>
              )}

              {/* Statement */}
              {templates[selectedTemplate].template.statement && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Statement:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.statement}"
                  </p>
                </div>
              )}

              {/* Payment Instructions */}
              {templates[selectedTemplate].template.paymentInstructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Instructions:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.paymentInstructions}"
                  </p>
                </div>
              )}

              {/* Content */}
              {templates[selectedTemplate].template.content && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Content:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.content}"
                  </p>
                </div>
              )}

              {/* Next Steps */}
              {templates[selectedTemplate].template.nextSteps && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Steps:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{templates[selectedTemplate].template.nextSteps}"
                  </p>
                </div>
              )}

              {/* Closing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Closing:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  "{templates[selectedTemplate].template.closing}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg sticky top-8">
            <div className="flex items-center mb-4">
              <Info size={20} className="text-accent mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Tooltips</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tone:</h4>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                  {templates[selectedTemplate].tooltip.tone}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Best Practices:</h4>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                  {templates[selectedTemplate].tooltip.bestPractices}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Pro Tip:</h4>
              <p className="text-gray-600 text-sm">
                Always personalize emails with the customer's name and specific details about their project. Keep subject lines clear and actionable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailTemplates;