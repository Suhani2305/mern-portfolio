import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const credentials = btoa(`${username}:${password}`);
      console.log('Sending credentials:', { username, password }); // Debug log
      
      const response = await fetch('/api/admin/messages', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Messages loaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setIsAuthenticated(false);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black p-4">
        <Card className="w-full max-w-md space-container border-purple-500/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-200">Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-purple-900/30 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-purple-900/30 border-purple-500/30 text-white"
                />
              </div>
              <Button
                onClick={fetchMessages}
                className="w-full gradient-button text-white"
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black p-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-4">Contact Messages</h1>
          <p className="text-gray-300 text-center">View and manage messages from your contact form</p>
        </motion.div>

        <div className="grid gap-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="space-container border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{message.name}</h3>
                      <p className="text-purple-300">{message.email}</p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages; 