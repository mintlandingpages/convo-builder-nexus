
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
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger 
            value="basic-details" 
            className={`tab-button ${activeTab === 'basic-details' ? 'text-primary' : ''}`}
          >
            Basic Details
          </TabsTrigger>
          <TabsTrigger 
            value="start" 
            className={`tab-button ${activeTab === 'start' ? 'text-primary' : ''}`}
          >
            Start
          </TabsTrigger>
          <TabsTrigger 
            value="services" 
            className={`tab-button ${activeTab === 'services' ? 'text-primary' : ''}`}
          >
            Services
          </TabsTrigger>
          <TabsTrigger 
            value="design" 
            className={`tab-button ${activeTab === 'design' ? 'text-primary' : ''}`}
          >
            Design
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
        
        <TabsContent value="start">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">Start Configuration</h3>
            <p className="text-muted-foreground">Configure how your chatbot starts conversations.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">Services Configuration</h3>
            <p className="text-muted-foreground">Configure the services your chatbot can access.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="design">
          <div className="p-6 chatbot-card">
            <h3 className="text-lg font-medium mb-4">Design Configuration</h3>
            <p className="text-muted-foreground">Customize how your chatbot looks.</p>
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
