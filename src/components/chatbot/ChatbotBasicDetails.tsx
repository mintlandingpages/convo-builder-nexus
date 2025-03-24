
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ChatbotBasicDetails: React.FC = () => {
  const [selectedType, setSelectedType] = useState("type1");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  
  return (
    <div className="p-6 chatbot-card">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-sm font-medium">
            Business Name
          </Label>
          <Input 
            id="businessName" 
            placeholder="Enter business name" 
            className="input-with-animation"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tcoName" className="text-sm font-medium">
            TCO Name
          </Label>
          <Input 
            id="tcoName" 
            placeholder="Enter TCO name" 
            className="input-with-animation"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium">
            Practice Phone Number
          </Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter phone number" 
            className="input-with-animation"
            type="tel"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Practice Email
          </Label>
          <Input 
            id="email" 
            placeholder="Enter email address" 
            className="input-with-animation"
            type="email"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Chatbot Type
          </Label>
          <ToggleGroup 
            type="single" 
            variant="outline"
            value={selectedType}
            onValueChange={(value) => {
              if (value) setSelectedType(value);
            }}
            className="flex gap-2"
          >
            <ToggleGroupItem 
              value="type1" 
              className="rounded-md border border-muted px-3 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary transition-all duration-300"
            >
              Type 1
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="type2" 
              className="rounded-md border border-muted px-3 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary transition-all duration-300"
            >
              Type 2
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Color Picker
          </Label>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: selectedColor }}
              onClick={() => document.getElementById('colorPicker')?.click()}
            >
              <input 
                type="color"
                id="colorPicker"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
            <span className="text-sm text-muted-foreground">{selectedColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBasicDetails;
