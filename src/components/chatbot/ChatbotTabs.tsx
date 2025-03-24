
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChatbotBasicDetails from './ChatbotBasicDetails';
import ChatbotTeamMembers from './ChatbotTeamMembers';
import ChatbotCustomisation from './ChatbotCustomisation';
import ChatbotOptions from './ChatbotOptions';
import ChatbotAIPrompting from './ChatbotAIPrompting';

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
            value="options" 
            className={`tab-button ${activeTab === 'options' ? 'text-purple-700' : ''}`}
          >
            Options
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
        
        <TabsContent value="options">
          <ChatbotOptions />
        </TabsContent>
        
        <TabsContent value="ai-prompting">
          <ChatbotAIPrompting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotTabs;
