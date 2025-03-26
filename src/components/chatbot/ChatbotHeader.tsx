
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Save, Upload, Code, Eye } from 'lucide-react';

interface ChatbotHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  onEmbed: () => void;
  onPreview: () => void;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  onSave,
  onPublish,
  onEmbed,
  onPreview
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-600" />
        <h1 className="text-xl font-medium text-purple-700">Chatbot Manager</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          onClick={onPreview}
          variant="outline" 
          className="button-premium bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
        >
          <Eye className="w-4 h-4 mr-1" />
          PREVIEW
        </Button>
        <Button 
          onClick={onSave}
          variant="outline" 
          className="button-premium bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100"
        >
          <Save className="w-4 h-4 mr-1" />
          SAVE
        </Button>
        <Button 
          onClick={onPublish}
          variant="default" 
          className="button-premium bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Upload className="w-4 h-4 mr-1" />
          PUBLISH
        </Button>
        <Button 
          onClick={onEmbed}
          variant="ghost" 
          className="button-premium hover:bg-gray-100"
        >
          <Code className="w-4 h-4 mr-1" />
          EMBED Code
        </Button>
      </div>
    </div>
  );
};

export default ChatbotHeader;
