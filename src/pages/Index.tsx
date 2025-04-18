
import ChatbotBuilder from '@/components/chatbot/ChatbotBuilder';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="chatbot-card p-8">
          <ChatbotBuilder />
        </div>
      </div>
    </div>
  );
};

export default Index;
