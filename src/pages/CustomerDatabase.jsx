import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Filter,
  Download,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  Home
} from 'lucide-react';

const CustomerDatabase = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    status: 'lead',
    lastContact: '',
    notes: '',
    projectHistory: []
  });

  // Sample customer data
  const sampleCustomers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+44 123 456 7890',
      address: '123 Main Street, London',
      postcode: 'SW1A 1AA',
      status: 'active',
      lastContact: '2024-01-15',
      notes: 'Interested in roof repair, prefers morning appointments',
      projectHistory: [
        { date: '2024-01-15', type: 'Quote Request', amount: 2500, status: 'pending' },
        { date: '2023-12-10', type: 'Roof Inspection', amount: 150, status: 'completed' }
      ],
      rating: 5,
      totalSpent: 150
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+44 987 654 3210',
      address: '456 Oak Avenue, Manchester',
      postcode: 'M1 1AA',
      status: 'lead',
      lastContact: '2024-01-10',
      notes: 'Emergency roof leak, needs urgent attention',
      projectHistory: [
        { date: '2024-01-10', type: 'Emergency Call', amount: 0, status: 'pending' }
      ],
      rating: 0,
      totalSpent: 0
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+44 555 123 4567',
      address: '789 Pine Road, Birmingham',
      postcode: 'B1 1AA',
      status: 'completed',
      lastContact: '2023-11-20',
      notes: 'Satisfied customer, may need gutter work in future',
      projectHistory: [
        { date: '2023-11-20', type: 'Roof Replacement', amount: 8500, status: 'completed' },
        { date: '2023-10-15', type: 'Quote', amount: 8500, status: 'completed' }
      ],
      rating: 5,
      totalSpent: 8500
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+44 333 444 5555',
      address: '321 Elm Street, Leeds',
      postcode: 'LS1 1AA',
      status: 'follow-up',
      lastContact: '2024-01-05',
      notes: 'Waiting for insurance approval, follow up in 2 weeks',
      projectHistory: [
        { date: '2024-01-05', type: 'Insurance Assessment', amount: 0, status: 'pending' },
        { date: '2023-12-28', type: 'Initial Quote', amount: 4200, status: 'pending' }
      ],
      rating: 0,
      totalSpent: 0
    }
  ];

  useEffect(() => {
    setCustomers(sampleCustomers);
    setFilteredCustomers(sampleCustomers);
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.postcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => customer.status === filterStatus);
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, filterStatus, customers]);

  const getStatusColor = (status) => {
    const colors = {
      'lead': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'follow-up': 'bg-yellow-100 text-yellow-800',
      'inactive': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'lead': Clock,
      'active': CheckCircle,
      'completed': Star,
      'follow-up': AlertCircle,
      'inactive': AlertCircle
    };
    return icons[status] || Clock;
  };

  const handleAddCustomer = () => {
    const customer = {
      ...newCustomer,
      id: Date.now(),
      projectHistory: [],
      rating: 0,
      totalSpent: 0
    };
    setCustomers([...customers, customer]);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      postcode: '',
      status: 'lead',
      lastContact: '',
      notes: '',
      projectHistory: []
    });
    setShowAddModal(false);
  };

  const handleEditCustomer = () => {
    setCustomers(customers.map(customer =>
      customer.id === selectedCustomer.id ? selectedCustomer : customer
    ));
    setShowEditModal(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const exportCustomers = () => {
    // In a real app, this would export to CSV/Excel
    alert('Export functionality would be implemented here');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
              </div>
              <Users className="text-accent" size={32} />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-blue-600">
                  {customers.filter(c => c.status === 'lead').length}
                </p>
              </div>
              <Clock className="text-blue-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-accent">
                  £{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <Building className="text-accent" size={32} />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="customer-search"
                  name="customer-search"
                  type="text"
                  placeholder="Search customers by name, email, phone, or postcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="lead">Leads</option>
                <option value="active">Active</option>
                <option value="follow-up">Follow-up</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 flex items-center gap-2"
              >
                <Plus size={20} />
                Add Customer
              </button>
              
              <button
                onClick={exportCustomers}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center gap-2"
              >
                <Download size={20} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Last Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => {
                  const StatusIcon = getStatusIcon(customer.status);
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-800">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.postcode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} className="text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-400" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          <StatusIcon size={12} />
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(customer.lastContact).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">£{customer.totalSpent.toLocaleString()}</div>
                        {customer.rating > 0 && (
                          <div className="flex items-center gap-1 text-sm text-yellow-600">
                            <Star size={12} fill="currentColor" />
                            {customer.rating}/5
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Customer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Customer</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
                  <input
                    type="text"
                    value={newCustomer.postcode}
                    onChange={(e) => setNewCustomer({...newCustomer, postcode: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="completed">Completed</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Contact</label>
                  <input
                    type="date"
                    value={newCustomer.lastContact}
                    onChange={(e) => setNewCustomer({...newCustomer, lastContact: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    rows="3"
                    placeholder="Additional notes about the customer..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Detail Modal */}
        {selectedCustomer && !showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer.name}</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={20} />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400" size={20} />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-400" size={20} />
                      <span>{selectedCustomer.address}, {selectedCustomer.postcode}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400" size={20} />
                      <span>Last contact: {new Date(selectedCustomer.lastContact).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedCustomer.notes}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Project History</h3>
                  <div className="space-y-3">
                    {selectedCustomer.projectHistory.map((project, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{project.type}</h4>
                            <p className="text-sm text-gray-600">{new Date(project.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">£{project.amount.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800' :
                              project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90"
                >
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerDatabase;
