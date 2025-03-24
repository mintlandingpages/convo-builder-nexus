
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChatbotBasicDetails from './ChatbotBasicDetails';
import ChatbotTeamMembers from './ChatbotTeamMembers';
import ChatbotCustomisation from './ChatbotCustomisation';

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
            className={`tab-button ${activeTab === 'basic-details' ? 'text-purple-700' : ''}`}
          >
            Practice Details
          </TabsTrigger>
          <TabsTrigger 
            value="team-dentists" 
            className={`tab-button ${activeTab === 'team-dentists' ? 'text-purple-700' : ''}`}
          >
            Team (Dentists)
          </TabsTrigger>
          <TabsTrigger 
            value="customisation" 
            className={`tab-button ${activeTab === 'customisation' ? 'text-purple-700' : ''}`}
          >
            Customisation
          </TabsTrigger>
          <TabsTrigger 
            value="services" 
            className={`tab-button ${activeTab === 'services' ? 'text-purple-700' : ''}`}
          >
            Services
          </TabsTrigger>
          <TabsTrigger 
            value="ai-prompting" 
            className={`tab-button ${activeTab === 'ai-prompting' ? 'text-purple-700' : ''}`}
          >
            AI Prompting
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-details" className="animate-slide-in">
          <ChatbotBasicDetails />
        </TabsContent>
        
        <TabsContent value="team-dentists">
          <div className="p-6 chatbot-card">
            <ChatbotTeamMembers />
          </div>
        </TabsContent>
        
        <TabsContent value="customisation">
          <ChatbotCustomisation />
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
