import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `profile-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, gif, webp) are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  
  // Serve default profile photo
  app.get("/api/profile-photo", async (req, res) => {
    const profilePhotoPath = path.join(process.cwd(), 'uploads', 'profile-photo.jpg');
    try {
      await fs.access(profilePhotoPath);
      res.sendFile(profilePhotoPath);
    } catch (error) {
      // If no profile photo exists, return a placeholder or 404
      res.status(404).json({ message: "Profile photo not found" });
    }
  });
  
  // Photo upload endpoint
  app.post("/api/upload-photo", upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No photo file provided" 
        });
      }

      const photoUrl = `/uploads/${req.file.filename}`;
      
      res.json({ 
        success: true, 
        message: "Photo uploaded successfully",
        photoUrl: photoUrl
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to upload photo" 
      });
    }
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Here you would typically send an email notification
      // For now, we'll just return success
      res.json({ 
        success: true, 
        message: "Message sent successfully! I'll get back to you soon.",
        contact: { id: contact.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
