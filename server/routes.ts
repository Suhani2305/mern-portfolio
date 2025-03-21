import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add CORS middleware for development
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate request body
      const result = contactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      // Store contact message
      const contactMessage = await storage.createContactMessage(result.data);
      
      res.status(201).json({ 
        message: "Message sent successfully",
        contactId: contactMessage.id
      });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Admin route to view messages (protected with basic auth)
  app.get('/api/admin/messages', async (req, res) => {
    try {
      // Basic authentication check
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ 
          error: true,
          message: "Authentication required" 
        });
      }

      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      // Replace these with your desired admin credentials
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ 
          error: true,
          message: "Invalid credentials" 
        });
      }

      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ 
        error: true,
        message: "Failed to fetch messages" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
