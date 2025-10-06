import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  Trash2, 
  Save, 
  Clock,
  StickyNote,
  List,
  Edit3,
  Archive
} from 'lucide-react';

const DailyNotepad = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const notesRef = useRef(null);
  const todoInputRef = useRef(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadDayData();
  }, [selectedDate]);

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveDayData();
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(saveTimeout);
  }, [notes, todos]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const loadDayData = () => {
    const dateKey = formatDateKey(selectedDate);
    const savedData = localStorage.getItem(`notepad-${dateKey}`);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setNotes(parsed.notes || '');
        setTodos(parsed.todos || []);
        // Convert string back to Date object if it exists
        setLastSaved(parsed.lastSaved ? new Date(parsed.lastSaved) : null);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    } else {
      setNotes('');
      setTodos([]);
      setLastSaved(null);
    }
  };

  const saveDayData = () => {
    const dateKey = formatDateKey(selectedDate);
    const dataToSave = {
      notes,
      todos,
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem(`notepad-${dateKey}`, JSON.stringify(dataToSave));
    setLastSaved(new Date());
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      todoInputRef.current?.focus();
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getCompletedCount = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const getTotalCount = () => {
    return todos.length;
  };

  const isToday = () => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  };

  const getDateStatus = () => {
    if (isToday()) return 'Today';
    const today = new Date();
    const diffTime = selectedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Date Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {formatDate(selectedDate)}
                </h2>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Calendar size={14} />
                  {getDateStatus()}
                </p>
              </div>
              
              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={24} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              {!isToday() && (
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 flex items-center gap-2"
                >
                  <Calendar size={16} />
                  Go to Today
                </button>
              )}
              
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  Saved {lastSaved instanceof Date ? lastSaved.toLocaleTimeString() : new Date(lastSaved).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notes Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <StickyNote size={24} className="text-accent" />
                Notes
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={isEditing ? "View mode" : "Edit mode"}
                >
                  <Edit3 size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={saveDayData}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Save manually"
                >
                  <Save size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <textarea
              ref={notesRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down your thoughts, ideas, meeting notes, or anything else for today..."
              className="w-full h-96 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              style={{ 
                fontFamily: 'inherit',
                lineHeight: '1.6'
              }}
            />
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{notes.length} characters</span>
              <span>Auto-saves as you type</span>
            </div>
          </div>

          {/* Todo List Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <List size={24} className="text-accent" />
                Todo List
              </h2>
              {getCompletedCount() > 0 && (
                <button
                  onClick={clearCompletedTodos}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                >
                  <Archive size={14} />
                  Clear Completed
                </button>
              )}
            </div>

            {/* Add Todo Input */}
            <div className="flex gap-2 mb-6">
              <input
                id="new-todo"
                name="new-todo"
                ref={todoInputRef}
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                onClick={addTodo}
                className="px-4 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {/* Todo Stats */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {getCompletedCount()} of {getTotalCount()} completed
                </span>
                {getTotalCount() > 0 && (
                  <span className="text-gray-500">
                    {Math.round((getCompletedCount() / getTotalCount()) * 100)}% done
                  </span>
                )}
              </div>
              {getTotalCount() > 0 && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(getCompletedCount() / getTotalCount()) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Todo List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <List size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-accent'
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>
                    
                    <div className="flex-1">
                      <input
                        id={`edit-todo-${todo.id}`}
                        name={`edit-todo-${todo.id}`}
                        type="text"
                        value={todo.text}
                        onChange={(e) => editTodo(todo.id, e.target.value)}
                        className={`w-full bg-transparent border-none outline-none ${
                          todo.completed 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-800'
                        }`}
                        onBlur={() => {
                          if (!todo.text.trim()) {
                            deleteTodo(todo.id);
                          }
                        }}
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        Added {new Date(todo.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setNotes('');
                setTodos([]);
              }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-left"
            >
              <div className="font-medium text-red-800 mb-1">Clear All</div>
              <div className="text-sm text-red-600">Remove all notes and todos for this day</div>
            </button>
            
            <button
              onClick={() => {
                const today = new Date();
                const dateKey = formatDateKey(today);
                const todayData = localStorage.getItem(`notepad-${dateKey}`);
                if (todayData) {
                  const parsed = JSON.parse(todayData);
                  setNotes(parsed.notes || '');
                  setTodos(parsed.todos || []);
                }
              }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
            >
              <div className="font-medium text-blue-800 mb-1">Copy from Today</div>
              <div className="text-sm text-blue-600">Copy today's notes and todos to this day</div>
            </button>
            
            <button
              onClick={saveDayData}
              className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
            >
              <div className="font-medium text-green-800 mb-1">Save Now</div>
              <div className="text-sm text-green-600">Manually save current data</div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyNotepad;
