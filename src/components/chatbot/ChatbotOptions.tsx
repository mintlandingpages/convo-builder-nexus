
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, MoveVertical } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Option {
  id: string;
  text: string;
}

const ChatbotOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [draggedOption, setDraggedOption] = useState<Option | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addOption = () => {
    const newOption: Option = {
      id: `option-${Date.now()}`,
      text: "",
    };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (id: string, newText: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text: newText } : option
    ));
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleDragStart = (option: Option) => {
    setDraggedOption(option);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedOption) return;
    
    const draggedIndex = options.findIndex(option => option.id === draggedOption.id);
    if (draggedIndex === -1) return;
    
    // Create a new array without the dragged item
    const newOptions = [...options];
    newOptions.splice(draggedIndex, 1);
    
    // Insert the dragged item at the new position
    newOptions.splice(targetIndex, 0, draggedOption);
    
    setOptions(newOptions);
    setDraggedOption(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedOption(null);
    setDragOverIndex(null);
  };

  return (
    <div className="p-6 chatbot-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Options Configuration</h3>
        <Button onClick={addOption} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Option</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {options.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Click the "Add Option" button to add your first option.
          </p>
        ) : (
          options.map((option, index) => (
            <Card
              key={option.id}
              className={`p-4 flex items-center gap-3 ${
                dragOverIndex === index ? 'border-dashed border-2 border-primary' : ''
              }`}
              draggable
              onDragStart={() => handleDragStart(option)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <MoveVertical 
                size={18} 
                className="cursor-move text-muted-foreground" 
              />
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                className="flex-1"
              />
              {options.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                  className="text-destructive hover:text-destructive/90 p-1 h-auto"
                >
                  <X size={18} />
                </Button>
              )}
            </Card>
          ))
        )}
      </div>
      
      {options.length > 0 && (
        <div className="mt-6 text-sm text-muted-foreground">
          <p>* Drag and drop options to reorder them.</p>
        </div>
      )}
    </div>
  );
};

export default ChatbotOptions;
