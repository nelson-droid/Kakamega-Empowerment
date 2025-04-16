import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSchema, 
  insertContactSchema,
  insertVolunteerSchema,
  insertPartnershipSchema,
  insertProjectSchema
} from "@shared/schema";

// Response helper function
const sendResponse = (res: Response, status: number, data: any) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    data
  });
};

// Error response helper function
const sendError = (res: Response, status: number, error: any) => {
  res.status(status).json({
    success: false,
    error: error instanceof Error ? error.message : String(error)
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for Newsletters
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.addNewsletterSubscription(validatedData);
      sendResponse(res, 201, subscription);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  // API Routes for Contact Form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const submission = await storage.addContactSubmission(validatedData);
      sendResponse(res, 201, submission);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  // API Routes for Volunteer Applications
  app.post("/api/volunteer", async (req: Request, res: Response) => {
    try {
      const validatedData = insertVolunteerSchema.parse(req.body);
      const application = await storage.addVolunteerApplication(validatedData);
      sendResponse(res, 201, application);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  // API Routes for Partnership Inquiries
  app.post("/api/partnership", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPartnershipSchema.parse(req.body);
      const inquiry = await storage.addPartnershipInquiry(validatedData);
      sendResponse(res, 201, inquiry);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  // API Routes for Projects
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      sendResponse(res, 200, projects);
    } catch (error) {
      sendError(res, 500, error);
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return sendError(res, 400, "Invalid project ID");
      }

      const project = await storage.getProject(id);
      if (!project) {
        return sendError(res, 404, "Project not found");
      }
      sendResponse(res, 200, project);
    } catch (error) {
      sendError(res, 500, error);
    }
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.addProject(validatedData);
      sendResponse(res, 201, project);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  app.put("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return sendError(res, 400, "Invalid project ID");
      }

      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (!project) {
        return sendError(res, 404, "Project not found");
      }
      sendResponse(res, 200, project);
    } catch (error) {
      sendError(res, 400, error);
    }
  });

  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return sendError(res, 400, "Invalid project ID");
      }

      const success = await storage.deleteProject(id);
      if (!success) {
        return sendError(res, 404, "Project not found");
      }
      sendResponse(res, 200, { message: "Project deleted successfully" });
    } catch (error) {
      sendError(res, 500, error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
