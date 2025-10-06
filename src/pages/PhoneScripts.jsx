import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Info } from 'lucide-react';

const PhoneScripts = () => {
  const [selectedScript, setSelectedScript] = useState(0);

  const scripts = [
    {
      id: 0,
      title: "New Lead / Enquiry Call",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name], how are you today?",
        purpose: "I understand you're interested in [service type]. Can I ask a few quick questions to get everything right for your quote?",
        collectInfo: [
          "Customer Name: [Full Name]",
          "Address: [Street, City, Postcode]",
          "Phone / Email: [Contact Info]",
          "Property Type: [House, Flat, Commercial]",
          "Service Required: [Leak repair, full replacement, inspection, etc.]",
          "Preferred Date / Urgency: [Date / ASAP]"
        ],
        nextSteps: "Thank you! One of our specialists will be [visiting / calling back] on [date/time] to provide a detailed quote.",
        closing: "We really appreciate your interest in [Company Name], and we look forward to helping you with your roof!"
      },
      tooltip: {
        tone: "Friendly, professional, confident",
        rapport: "Use customer's name, acknowledge urgency, smile while talking (voice warmth), mirror their language slightly."
      }
    },
    {
      id: 1,
      title: "Emergency Call",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name]. I understand you're experiencing a roofing emergency?",
        collectInfo: [
          "Customer Name: [Full Name]",
          "Address: [Street, City, Postcode]",
          "Phone / Email: [Contact Info]",
          "Issue Description: [Leak, storm damage, fallen tiles, etc.]",
          "Severity / Danger: [Active leak, structural risk, safety hazard]"
        ],
        nextSteps: "We can have a team [on-site / call you back] within [timeframe]. Please ensure [safety instructions] until we arrive.",
        closing: "You're in safe hands, [Customer Name]. Help is on the way."
      },
      tooltip: {
        tone: "Calm, reassuring, prompt",
        rapport: "Empathize with stress, repeat their concerns for reassurance, avoid filler words, be action-oriented."
      }
    },
    {
      id: 2,
      title: "Complaint / Issue Call",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name], I understand you have some concerns?",
        collectInfo: [
          "Customer Name: [Full Name]",
          "Address / Job Reference: [Street, City, Postcode / Quote #]",
          "Complaint Details: [Problem, date, any previous contact]"
        ],
        acknowledgement: "I completely understand your concern, and I'm here to make sure we resolve this for you.",
        nextSteps: "Here's what we'll do: [outline solution / technician visit / manager callback]. Can I confirm [date / time] works for you?",
        closing: "Thank you for bringing this to our attention, [Customer Name]. We'll make it right."
      },
      tooltip: {
        tone: "Empathetic, professional, solution-focused",
        rapport: "Acknowledge their frustration, mirror emotions lightly, maintain calm, avoid blaming language."
      }
    },
    {
      id: 3,
      title: "Follow-Up / Post-Quote Call",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name], I just wanted to follow up regarding your roofing quote.",
        collectInfo: [
          "Customer Name: [Full Name]",
          "Quote Reference / Date: [Quote # / Date]"
        ],
        engagement: "I wanted to check if you had any questions or if there's anything I can clarify for you?",
        nextSteps: "If you're ready, we can schedule [installation / inspection / repair] at a time convenient for you.",
        closing: "Thanks again, [Customer Name], for considering [Company Name]. We'd love to help you with your roofing project!"
      },
      tooltip: {
        tone: "Polite, helpful, patient",
        rapport: "Offer value (answer questions), reference previous conversation to show attentiveness."
      }
    },
    {
      id: 4,
      title: "Asking for a Review",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name], I hope your roof work went well!",
        confirmation: "We just wanted to check everything went smoothly and that you're satisfied with the work.",
        requestReview: "If you have a moment, we'd greatly appreciate it if you could leave us a review on [Google / Facebook / Trustpilot]. It really helps our business.",
        closing: "Thanks so much for your time, [Customer Name], and for choosing [Company Name]!"
      },
      tooltip: {
        tone: "Warm, appreciative, polite",
        rapport: "Keep it short, affirm their satisfaction first, don't pressure; gratitude goes a long way."
      }
    },
    {
      id: 5,
      title: "Non-Payment / Overdue Call",
      script: {
        greeting: "Hi, this is [Your Name] from [Company Name], I'm calling regarding invoice [Invoice # / Date].",
        statement: "Our records show that the payment of [Amount] is currently outstanding.",
        confirmation: "Can you confirm if there's been any issue with processing this payment?",
        nextSteps: "We can arrange [payment plan / immediate payment / resend invoice] to make it easier for you.",
        closing: "Thanks for your time, [Customer Name], we appreciate your prompt attention to this matter."
      },
      tooltip: {
        tone: "Professional, polite, firm",
        rapport: "Avoid accusatory language, focus on resolution, stay calm and neutral, keep conversation short and clear."
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto"
    >

      {/* Script Selector Toggle */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {scripts.map((script, index) => (
              <button
                key={script.id}
                onClick={() => setSelectedScript(index)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedScript === index
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {script.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Script Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Script Display */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Phone size={24} className="text-accent mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                {scripts[selectedScript].title}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Greeting */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Greeting:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  "{scripts[selectedScript].script.greeting}"
                </p>
              </div>

              {/* Purpose/Statement */}
              {(scripts[selectedScript].script.purpose || scripts[selectedScript].script.statement) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {scripts[selectedScript].script.purpose ? 'Purpose:' : 'Statement:'}
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.purpose || scripts[selectedScript].script.statement}"
                  </p>
                </div>
              )}

              {/* Collect Information */}
              {scripts[selectedScript].script.collectInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Collect Information:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {scripts[selectedScript].script.collectInfo.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Acknowledgement */}
              {scripts[selectedScript].script.acknowledgement && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Acknowledgement:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.acknowledgement}"
                  </p>
                </div>
              )}

              {/* Engagement */}
              {scripts[selectedScript].script.engagement && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Engagement:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.engagement}"
                  </p>
                </div>
              )}

              {/* Confirmation */}
              {scripts[selectedScript].script.confirmation && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirmation:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.confirmation}"
                  </p>
                </div>
              )}

              {/* Request Review */}
              {scripts[selectedScript].script.requestReview && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Request Review:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.requestReview}"
                  </p>
                </div>
              )}

              {/* Next Steps */}
              {scripts[selectedScript].script.nextSteps && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Steps:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    "{scripts[selectedScript].script.nextSteps}"
                  </p>
                </div>
              )}

              {/* Closing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Closing:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  "{scripts[selectedScript].script.closing}"
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
                  {scripts[selectedScript].tooltip.tone}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Rapport Building:</h4>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                  {scripts[selectedScript].tooltip.rapport}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Pro Tip:</h4>
              <p className="text-gray-600 text-sm">
                Always use the customer's name multiple times in the conversation and keep your tone consistent with the script category.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneScripts;
