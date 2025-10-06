import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  PoundSterling,
  Calendar,
  CheckCircle
} from 'lucide-react';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', dayRate: '' });

  // Get start of week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Get all days of the week
  const getWeekDays = (weekStart) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekStart = getWeekStart(new Date(currentWeek));
  const weekDays = getWeekDays(weekStart);

  // Load employees from localStorage
  useEffect(() => {
    const savedEmployees = localStorage.getItem('attendance_employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Save employees to localStorage
  useEffect(() => {
    localStorage.setItem('attendance_employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.dayRate) {
      const employee = {
        id: Date.now(),
        name: newEmployee.name,
        dayRate: parseFloat(newEmployee.dayRate),
        attendance: {}
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', dayRate: '' });
      setShowAddEmployee(false);
    }
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const toggleAttendance = (employeeId, date) => {
    const dateKey = date.toISOString().split('T')[0];
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        const newAttendance = { ...emp.attendance };
        if (newAttendance[dateKey]) {
          delete newAttendance[dateKey];
        } else {
          newAttendance[dateKey] = true;
        }
        return { ...emp, attendance: newAttendance };
      }
      return emp;
    }));
  };

  const getWeekTotal = (employee) => {
    let totalDays = 0;
    weekDays.forEach(day => {
      const dateKey = day.toISOString().split('T')[0];
      if (employee.attendance[dateKey]) {
        totalDays++;
      }
    });
    return totalDays * employee.dayRate;
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatWeekRange = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Week Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-accent" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Week of {formatWeekRange(weekStart)}</h2>
                <p className="text-gray-600 text-xs">Track daily attendance and calculate wages</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentWeek(new Date())}
                className="px-3 py-1 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                This Week
              </button>
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Employee Management & Attendance */}
          <div className="lg:col-span-2 space-y-4">
            {/* Add Employee Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  Team Members
                </h3>
                <button
                  onClick={() => setShowAddEmployee(!showAddEmployee)}
                  className="flex items-center gap-1 px-3 py-1 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>

              {showAddEmployee && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 rounded-lg p-3 mb-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                      <input
                        id="employee-name"
                        name="employee-name"
                        type="text"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-accent focus:border-transparent"
                        placeholder="Employee name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Day Rate (£)</label>
                      <input
                        id="employee-rate"
                        name="employee-rate"
                        type="number"
                        step="0.01"
                        value={newEmployee.dayRate}
                        onChange={(e) => setNewEmployee({ ...newEmployee, dayRate: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-accent focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={addEmployee}
                        className="w-full px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Employees List - Compact */}
              {employees.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No employees added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                            <User size={14} className="text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">{employee.name}</h4>
                            <p className="text-xs text-gray-600">£{employee.dayRate.toFixed(2)}/day</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEmployee(employee.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Compact Daily Checkboxes */}
                      <div className="grid grid-cols-7 gap-1">
                        {weekDays.map((day, index) => {
                          const dateKey = day.toISOString().split('T')[0];
                          const isPresent = employee.attendance[dateKey];
                          const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                          
                          return (
                            <div key={dateKey} className="text-center">
                              <p className="text-xs text-gray-500 mb-1">{dayNames[index]}</p>
                              <button
                                onClick={() => toggleAttendance(employee.id, day)}
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                  isPresent
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-300 hover:border-accent hover:bg-accent/10'
                                }`}
                              >
                                {isPresent && <CheckCircle size={12} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Calculations & Summary */}
          <div className="space-y-4">
            {/* Individual Employee Totals */}
            {employees.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <PoundSterling size={16} className="text-accent" />
                  Weekly Totals
                </h3>
                <div className="space-y-2">
                  {employees.map((employee) => {
                    const daysWorked = weekDays.filter(day => 
                      employee.attendance[day.toISOString().split('T')[0]]
                    ).length;
                    const weekTotal = getWeekTotal(employee);
                    
                    return (
                      <div key={employee.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{employee.name}</p>
                          <p className="text-xs text-gray-600">{daysWorked} days worked</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">
                            £{weekTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Summary */}
            {employees.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <PoundSterling size={16} className="text-accent" />
                  Company Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Total Employees</span>
                    <span className="text-sm font-bold text-gray-800">{employees.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Total Days Worked</span>
                    <span className="text-sm font-bold text-gray-800">
                      {employees.reduce((total, emp) => {
                        return total + weekDays.filter(day => 
                          emp.attendance[day.toISOString().split('T')[0]]
                        ).length;
                      }, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-gray-800">Total Weekly Pay</span>
                    <span className="text-lg font-bold text-green-600 flex items-center gap-1">
                      <PoundSterling size={16} />
                      {employees.reduce((total, emp) => total + getWeekTotal(emp), 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            {employees.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-accent" />
                  Quick Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Days/Employee</span>
                    <span className="font-medium">
                      {(employees.reduce((total, emp) => {
                        return total + weekDays.filter(day => 
                          emp.attendance[day.toISOString().split('T')[0]]
                        ).length;
                      }, 0) / employees.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Rate/Day</span>
                    <span className="font-medium">
                      £{(employees.reduce((total, emp) => total + emp.dayRate, 0) / employees.length).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance Rate</span>
                    <span className="font-medium">
                      {((employees.reduce((total, emp) => {
                        return total + weekDays.filter(day => 
                          emp.attendance[day.toISOString().split('T')[0]]
                        ).length;
                      }, 0) / (employees.length * 7)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Attendance;
