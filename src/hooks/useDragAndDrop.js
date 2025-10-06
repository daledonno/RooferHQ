import { useState, useEffect } from 'react';

/**
 * Custom hook for drag and drop functionality
 * @param {Array} defaultItems - Default array of items
 * @param {string} storageKey - localStorage key for persistence
 * @returns {Object} - Drag and drop state and handlers
 */
export const useDragAndDrop = (defaultItems, storageKey) => {
  const [items, setItems] = useState(defaultItems);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  // Load saved order from localStorage on component mount
  useEffect(() => {
    const savedOrder = localStorage.getItem(storageKey);
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        // Validate that all items are present
        if (parsedOrder.length === defaultItems.length) {
          setItems(parsedOrder);
        }
      } catch (error) {
        console.error(`Error loading saved order for ${storageKey}:`, error);
      }
    }
  }, [defaultItems.length, storageKey]);

  // Save order to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey]);

  // Handle drag start
  const handleDragStart = (e, index) => {
    if (!isReordering) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    if (!isReordering) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Handle drop
  const handleDrop = (e, dropIndex) => {
    if (!isReordering) return;
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    // Remove dragged item
    newItems.splice(draggedIndex, 1);
    
    // Insert at new position
    newItems.splice(dropIndex, 0, draggedItem);
    
    setItems(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Reset to default order
  const resetOrder = () => {
    setItems(defaultItems);
  };

  // Toggle reorder mode
  const toggleReordering = () => {
    setIsReordering(!isReordering);
  };

  return {
    items,
    setItems,
    draggedIndex,
    dragOverIndex,
    isReordering,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    resetOrder,
    toggleReordering
  };
};

export default useDragAndDrop;
