
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMember {
  id: string;
  name: string;
  profilePicture: string | null;
  specialisms: string[];
  bio: string;
}

const ChatbotTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [specialism1, setSpecialism1] = useState("");
  const [specialism2, setSpecialism2] = useState("");
  const [specialism3, setSpecialism3] = useState("");
  const [bio, setBio] = useState("");
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const specialisms = [specialism1, specialism2, specialism3].filter(s => s.trim() !== "");
    
    const newTeamMember: TeamMember = {
      id: Date.now().toString(),
      name,
      profilePicture,
      specialisms,
      bio
    };
    
    setTeamMembers([...teamMembers, newTeamMember]);
    
    // Reset form
    setName("");
    setProfilePicture(null);
    setSpecialism1("");
    setSpecialism2("");
    setSpecialism3("");
    setBio("");
    
    // Close dialog
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Members (Dentists)</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  {profilePicture && (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={profilePicture} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <Label 
                    htmlFor="profileUpload" 
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input 
                      id="profileUpload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialism1">Treatment Specialism 1</Label>
                <Input 
                  id="specialism1" 
                  value={specialism1} 
                  onChange={(e) => setSpecialism1(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialism2">Treatment Specialism 2</Label>
                <Input 
                  id="specialism2" 
                  value={specialism2} 
                  onChange={(e) => setSpecialism2(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialism3">Treatment Specialism 3</Label>
                <Input 
                  id="specialism3" 
                  value={specialism3} 
                  onChange={(e) => setSpecialism3(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  rows={4} 
                />
              </div>
              
              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Add Team Member
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {teamMembers.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          No team members added yet. Click the button above to add your first team member.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {member.profilePicture && (
                    <div className="sm:w-1/3 h-40 sm:h-auto">
                      <img 
                        src={member.profilePicture} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div className={`p-4 ${member.profilePicture ? 'sm:w-2/3' : 'w-full'}`}>
                    <h4 className="font-medium text-lg">{member.name}</h4>
                    {member.specialisms.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {member.specialisms.map((specialism, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1"
                          >
                            {specialism}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatbotTeamMembers;
