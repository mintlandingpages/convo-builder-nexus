
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChatbotBasicDetails from './ChatbotBasicDetails';

interface ChatbotTabsProps {
  chatbotName: string;
}

const ChatbotTabs: React.FC<ChatbotTabsProps> = ({ chatbotName }) => {
  const [activeTab, setActiveTab] = useState("basic-details");
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-medium mb-6 animate-fade-in">{chatbotName || 'Chatbot Name'}</h2>
      
      <Tabs defaultValue="basic-details" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger 
            value="basic-details" 
            className={`tab-button ${activeTab === 'basic-details' ? 'text-primary' : ''}`}
          >
            Basic Details
          </TabsTrigger>
          <TabsTrigger 
            value="customisation" 
            className={`tab-button ${activeTab === 'customisation' ? 'text-primary' : ''}`}
          >
            Customisation
          </TabsTrigger>
          <TabsTrigger 
            value="services" 
            className={`tab-button ${activeTab === 'services' ? 'text-primary' : ''}`}
          >
            Services
          </TabsTrigger>
          <TabsTrigger 
            value="ai-prompting" 
            className={`tab-button ${activeTab === 'ai-prompting' ? 'text-primary' : ''}`}
          >
            AI Prompting
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-details" className="animate-slide-in">
          <ChatbotBasicDetails />
        </TabsContent>
        
        <TabsContent value="customisation">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">Customisation</h3>
            <p className="text-muted-foreground">Customize the appearance and behavior of your chatbot.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">Services Configuration</h3>
            <p className="text-muted-foreground">Configure the services your chatbot can access.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-prompting">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">AI Prompting</h3>
            <p className="text-muted-foreground">Configure AI prompts for your chatbot.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotTabs;
