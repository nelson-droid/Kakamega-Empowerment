import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSchema, 
  insertContactSchema,
  insertVolunteerSchema,
  insertPartnershipSchema,
  insertProjectSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for Newsletters
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.addNewsletterSubscription(validatedData);
      res.status(201).json({ success: true, data: subscription });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  // API Routes for Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const submission = await storage.addContactSubmission(validatedData);
      res.status(201).json({ success: true, data: submission });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  // API Routes for Volunteer Applications
  app.post("/api/volunteer", async (req, res) => {
    try {
      const validatedData = insertVolunteerSchema.parse(req.body);
      const application = await storage.addVolunteerApplication(validatedData);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  // API Routes for Partnership Inquiries
  app.post("/api/partnership", async (req, res) => {
    try {
      const validatedData = insertPartnershipSchema.parse(req.body);
      const inquiry = await storage.addPartnershipInquiry(validatedData);
      res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  // API Routes for Projects
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.addProject(validatedData);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(parseInt(req.params.id), validatedData);
      if (!project) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
