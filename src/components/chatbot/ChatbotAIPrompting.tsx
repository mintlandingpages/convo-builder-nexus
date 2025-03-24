
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Link, X, FileText } from "lucide-react";

interface DocumentItem {
  id: string;
  type: 'file' | 'url';
  name: string;
  guidance: string;
  url?: string;
}

const ChatbotAIPrompting = () => {
  const [mainPrompt, setMainPrompt] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [url, setUrl] = useState('');

  // Generate a unique ID for new document items
  const generateId = () => `doc_${Math.random().toString(36).substr(2, 9)}`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: DocumentItem = {
        id: generateId(),
        type: 'file',
        name: file.name,
        guidance: ''
      };
      
      setDocuments([...documents, newDoc]);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleAddUrl = () => {
    if (url.trim()) {
      const newDoc: DocumentItem = {
        id: generateId(),
        type: 'url',
        name: url,
        url: url,
        guidance: ''
      };
      
      setDocuments([...documents, newDoc]);
      setUrl(''); // Reset URL input
    }
  };

  const handleUpdateGuidance = (id: string, guidance: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, guidance } : doc
    ));
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="p-6 chatbot-card">
      <h3 className="text-lg font-medium mb-4">AI Prompting</h3>
      <p className="text-muted-foreground mb-6">Configure AI prompts and knowledge sources for your chatbot.</p>
      
      {/* Main prompt textarea */}
      <div className="mb-8">
        <label htmlFor="main-prompt" className="block text-sm font-medium mb-2">
          Main Prompt
        </label>
        <Textarea 
          id="main-prompt"
          value={mainPrompt}
          onChange={(e) => setMainPrompt(e.target.value)}
          placeholder="Enter your main AI prompt here..."
          className="min-h-[200px] text-base"
        />
      </div>
      
      {/* Document/URL section */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-4">Knowledge Sources</h4>
        <div className="flex flex-wrap gap-4 mb-6">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors">
            <Upload size={16} />
            <span>Upload File</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
          
          <div className="flex items-center gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="w-64"
            />
            <Button 
              onClick={handleAddUrl} 
              variant="outline"
              disabled={!url.trim()}
            >
              <Link size={16} className="mr-2" />
              Add Link
            </Button>
          </div>
        </div>
        
        {/* Documents list */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {doc.type === 'file' ? (
                      <FileText size={18} className="text-blue-500" />
                    ) : (
                      <Link size={18} className="text-green-500" />
                    )}
                    <span className="font-medium truncate max-w-[400px]">
                      {doc.name}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <label className="block text-sm font-medium mb-2">
                  Document Guidance
                </label>
                <Textarea
                  value={doc.guidance}
                  onChange={(e) => handleUpdateGuidance(doc.id, e.target.value)}
                  placeholder="Add specific guidance for this document/URL..."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotAIPrompting;
