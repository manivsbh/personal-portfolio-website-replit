// Simple storage implementation for serverless
class MemStorage {
  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }
  
  async createContact(insertContact) {
    const id = this.currentId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getAllContacts() {
    return Array.from(this.contacts.values());
  }
}

const storage = new MemStorage();

// Serverless function handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    // Contact form submission
    if (url === '/api/contact' && method === 'POST') {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      const contact = await storage.createContact({ name, email, subject, message });
      return res.json({ 
        message: "Contact form submitted successfully", 
        contact 
      });
    }
    
    // Get all contacts
    if (url === '/api/contacts' && method === 'GET') {
      const contacts = await storage.getAllContacts();
      return res.json(contacts);
    }
    
    // Photo upload placeholder (simplified for serverless)
    if (url === '/api/upload-photo' && method === 'POST') {
      return res.json({ 
        message: "Photo upload successful", 
        photoUrl: "/uploads/profile-photo.jpg" 
      });
    }
    
    // Serve uploaded files placeholder
    if (url?.startsWith('/uploads/')) {
      return res.status(404).json({ message: "File not found" });
    }
    
    return res.status(404).json({ message: "API endpoint not found" });
    
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}