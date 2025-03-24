
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Image, Clock } from "lucide-react";

const ChatbotCustomisation = () => {
  const [startMessage1, setStartMessage1] = useState('');
  const [startMessage2, setStartMessage2] = useState('');
  const [startMessage3, setStartMessage3] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#9b87f5');
  const [secondaryColor, setSecondaryColor] = useState('#e5deff');
  const [chatTimeDelay, setChatTimeDelay] = useState('standard');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 chatbot-card">
      <h3 className="text-lg font-medium mb-6">Customisation</h3>
      
      <div className="space-y-8">
        {/* Start Messages Section */}
        <div className="space-y-4">
          <h4 className="text-md font-medium mb-2">Start Messages</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startMessage1">Start Message 1</Label>
              <Textarea 
                id="startMessage1"
                value={startMessage1}
                onChange={(e) => setStartMessage1(e.target.value)}
                placeholder="Enter your first greeting message"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="startMessage2">Start Message 2</Label>
              <Textarea 
                id="startMessage2"
                value={startMessage2}
                onChange={(e) => setStartMessage2(e.target.value)}
                placeholder="Enter your second greeting message"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="startMessage3">Start Message 3</Label>
              <Textarea 
                id="startMessage3"
                value={startMessage3}
                onChange={(e) => setStartMessage3(e.target.value)}
                placeholder="Enter your third greeting message"
                className="mt-1"
              />
            </div>
          </div>
        </div>
        
        {/* Avatar Section */}
        <div className="space-y-4">
          <h4 className="text-md font-medium mb-2">Avatar</h4>
          <div className="flex items-start gap-6">
            <div>
              <Avatar className="h-24 w-24 rounded-md">
                {avatar ? (
                  <AvatarImage src={avatar} alt="Chatbot avatar" />
                ) : (
                  <AvatarFallback className="rounded-md bg-purple-50">
                    <Image className="h-12 w-12 text-purple-300" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex-1">
              <Label htmlFor="avatar-upload" className="block mb-2">Upload Avatar Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  className="w-full"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                {avatar && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setAvatar(null)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                For best results, use a square image of at least 200x200 pixels
              </p>
            </div>
          </div>
        </div>
        
        {/* Colors Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Colour</Label>
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-md border" 
                style={{ backgroundColor: primaryColor }}
              ></div>
              <Input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Colour</Label>
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-md border" 
                style={{ backgroundColor: secondaryColor }}
              ></div>
              <Input
                id="secondary-color"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
        </div>
        
        {/* Chat Time Delay Section */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Chat Time Delay</h4>
          <Card>
            <CardContent className="pt-6">
              <RadioGroup 
                value={chatTimeDelay} 
                onValueChange={setChatTimeDelay}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    Standard (Default)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="0.5" id="half-second" />
                  <Label htmlFor="half-second" className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    0.5 Seconds
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="1" id="one-second" />
                  <Label htmlFor="one-second" className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    1 Second
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="two-seconds" />
                  <Label htmlFor="two-seconds" className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    2 Seconds
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCustomisation;
