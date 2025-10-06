import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Trash2, 
  Save, 
  Download, 
  FileText, 
  DollarSign,
  Percent,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Edit3
} from 'lucide-react';

const QuoteBuilder = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postcode: ''
  });

  const [quoteDetails, setQuoteDetails] = useState({
    projectType: 'Roof Repair',
    urgency: 'Standard',
    estimatedDuration: '1-2 days',
    notes: ''
  });

  const [lineItems, setLineItems] = useState([
    { id: 1, description: 'Roof inspection and assessment', quantity: 1, unitPrice: 150, category: 'Labor' },
    { id: 2, description: 'Material costs (tiles, underlay, etc.)', quantity: 1, unitPrice: 800, category: 'Materials' },
    { id: 3, description: 'Waste disposal', quantity: 1, unitPrice: 120, category: 'Disposal' }
  ]);

  const [discount, setDiscount] = useState(0);
  const [vatRate, setVatRate] = useState(20);

  const addLineItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      category: 'Labor'
    };
    setLineItems([...lineItems, newItem]);
  };

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  const calculateDiscountAmount = () => {
    return (calculateSubtotal() * discount) / 100;
  };

  const calculateVatAmount = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscountAmount();
    return (subtotalAfterDiscount * vatRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscountAmount() + calculateVatAmount();
  };

  const handleSaveQuote = () => {
    const quote = {
      customerInfo,
      quoteDetails,
      lineItems,
      discount,
      vatRate,
      subtotal: calculateSubtotal(),
      discountAmount: calculateDiscountAmount(),
      vatAmount: calculateVatAmount(),
      total: calculateTotal(),
      date: new Date().toISOString(),
      quoteNumber: `QUO-${Date.now().toString().slice(-6)}`
    };
    
    // In a real app, this would save to a database
    console.log('Saving quote:', quote);
    alert('Quote saved successfully!');
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here');
  };

  const projectTypes = [
    'Roof Repair',
    'Roof Replacement',
    'Gutter Installation',
    'Roof Inspection',
    'Emergency Repair',
    'Maintenance',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'Emergency', label: 'Emergency (Same day)', multiplier: 1.5 },
    { value: 'Urgent', label: 'Urgent (Within 24h)', multiplier: 1.25 },
    { value: 'Standard', label: 'Standard (1-2 weeks)', multiplier: 1.0 },
    { value: 'Flexible', label: 'Flexible (When convenient)', multiplier: 0.9 }
  ];

  const categories = ['Labor', 'Materials', 'Equipment', 'Disposal', 'Other'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer & Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User size={24} className="text-accent" />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="customer@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="+44 123 456 7890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
                  <input
                    type="text"
                    value={customerInfo.postcode}
                    onChange={(e) => setCustomerInfo({...customerInfo, postcode: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="SW1A 1AA"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  rows="3"
                  placeholder="Full address including street, city, county"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FileText size={24} className="text-accent" />
                Project Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select
                    value={quoteDetails.projectType}
                    onChange={(e) => setQuoteDetails({...quoteDetails, projectType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                  <select
                    value={quoteDetails.urgency}
                    onChange={(e) => setQuoteDetails({...quoteDetails, urgency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
                  <input
                    type="text"
                    value={quoteDetails.estimatedDuration}
                    onChange={(e) => setQuoteDetails({...quoteDetails, estimatedDuration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="e.g., 1-2 days, 1 week"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Notes</label>
                  <textarea
                    value={quoteDetails.notes}
                    onChange={(e) => setQuoteDetails({...quoteDetails, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    rows="3"
                    placeholder="Additional project details, special requirements, etc."
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Calculator size={24} className="text-accent" />
                  Quote Items
                </h2>
                <button
                  onClick={addLineItem}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Item description"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <select
                        value={item.category}
                        onChange={(e) => updateLineItem(item.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-1">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="font-semibold text-gray-800">
                        £{(item.quantity * item.unitPrice).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        onClick={() => removeLineItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quote Summary */}
          <div className="space-y-6">
            {/* Quote Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <DollarSign size={24} className="text-accent" />
                Quote Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">£{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Percent size={16} className="text-gray-400" />
                    <span className="text-gray-600">Discount ({discount}%):</span>
                  </div>
                  <span className="font-semibold text-green-600">-£{calculateDiscountAmount().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">VAT ({vatRate}%):</span>
                  <span className="font-semibold">£{calculateVatAmount().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-accent/10 rounded-lg px-4">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-accent">£{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Discount Input */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount %</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              {/* VAT Rate */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">VAT Rate %</label>
                <input
                  type="number"
                  value={vatRate}
                  onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSaveQuote}
                  className="w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Quote
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quote Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>Always include a detailed breakdown of materials and labor</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>Set clear terms and conditions for payment</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>Include warranty information and project timeline</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>Consider seasonal pricing adjustments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteBuilder;
