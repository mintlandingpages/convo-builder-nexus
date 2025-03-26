
import React, { useState } from 'react';
import ChatbotHeader from './ChatbotHeader';
import ChatbotTabs from './ChatbotTabs';
import { toast } from 'sonner';

const ChatbotBuilder: React.FC = () => {
  const [chatbotName, setChatbotName] = useState("My First Chatbot");
  
  const handleSave = () => {
    toast.success('Chatbot configuration saved successfully');
  };
  
  const handlePublish = () => {
    toast.success('Chatbot published successfully');
  };
  
  const handleEmbed = () => {
    toast('Embed code copied to clipboard', {
      description: 'Paste this code into your website to show the chatbot',
      action: {
        label: 'Dismiss',
        onClick: () => console.log('Dismissed')
      },
    });
  };
  
  const handlePreview = () => {
    toast.success('Opening chatbot preview', {
      description: 'Previewing your chatbot configuration'
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <ChatbotHeader 
        onSave={handleSave}
        onPublish={handlePublish}
        onEmbed={handleEmbed}
        onPreview={handlePreview}
      />
      <ChatbotTabs 
        chatbotName={chatbotName}
      />
    </div>
  );
};

export default ChatbotBuilder;
