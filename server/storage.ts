import { 
  users, type User, type InsertUser,
  type InsertNewsletterSubscription,
  type NewsletterSubscription,
  type InsertContactSubmission,
  type ContactSubmission,
  type InsertVolunteerApplication,
  type VolunteerApplication,
  type InsertPartnershipInquiry,
  type PartnershipInquiry,
  type InsertProject,
  type Project
} from "@shared/schema";

export interface IStorage {
  // User operations (required to maintain compatibility)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter operations
  addNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  
  // Contact form operations
  addContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Volunteer application operations
  addVolunteerApplication(data: InsertVolunteerApplication): Promise<VolunteerApplication>;
  
  // Partnership inquiry operations
  addPartnershipInquiry(data: InsertPartnershipInquiry): Promise<PartnershipInquiry>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  addProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private volunteerApplications: Map<number, VolunteerApplication>;
  private partnershipInquiries: Map<number, PartnershipInquiry>;
  private projects: Map<number, Project>;
  
  private userCurrentId: number;
  private newsletterCurrentId: number;
  private contactCurrentId: number;
  private volunteerCurrentId: number;
  private partnershipCurrentId: number;
  private projectCurrentId: number;

  constructor() {
    this.users = new Map();
    this.newsletterSubscriptions = new Map();
    this.contactSubmissions = new Map();
    this.volunteerApplications = new Map();
    this.partnershipInquiries = new Map();
    this.projects = new Map();
    
    this.userCurrentId = 1;
    this.newsletterCurrentId = 1;
    this.contactCurrentId = 1;
    this.volunteerCurrentId = 1;
    this.partnershipCurrentId = 1;
    this.projectCurrentId = 1;
    
    // Initialize with example projects
    this.seedProjects();
  }

  // Seed with sample projects
  private seedProjects() {
    const projectsData: InsertProject[] = [
      {
        title: "Rooftop Gardens Project",
        description: "Converting unused rooftops into productive gardens to reduce urban heat islands and provide fresh produce.",
        category: "Climate Initiative",
        status: "Active",
        image: "https://images.unsplash.com/photo-1592991538534-50fdc2a01031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        impactMetrics: [
          { label: "Rooftops Converted", value: "12" },
          { label: "Produce Yearly", value: "3.5 Tons" },
          { label: "Heat Reduction", value: "15%" },
          { label: "Families Served", value: "200+" }
        ]
      },
      {
        title: "Vertical Farm Initiative",
        description: "Implementing space-efficient vertical farming technologies to maximize yield in limited urban spaces.",
        category: "Urban Farming",
        status: "Active",
        image: "https://images.unsplash.com/photo-1584299342583-05e456782260?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        impactMetrics: [
          { label: "Vertical Farms", value: "8" },
          { label: "Less Water Used", value: "90%" },
          { label: "Yield vs Traditional", value: "5x" },
          { label: "Pesticides", value: "Zero" }
        ]
      },
      {
        title: "School Garden Program",
        description: "Teaching children sustainable farming practices through hands-on experience in school gardens.",
        category: "Education",
        status: "Active",
        image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        impactMetrics: [
          { label: "Schools Participating", value: "15" },
          { label: "Students Reached", value: "1,200+" },
          { label: "Different Crops", value: "18" },
          { label: "Teaching Hours", value: "40+" }
        ]
      }
    ];

    projectsData.forEach(project => this.addProject(project));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Newsletter operations
  async addNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.newsletterCurrentId++;
    const createdAt = new Date();
    const subscription: NewsletterSubscription = { ...data, id, createdAt };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  // Contact form operations
  async addContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const submission: ContactSubmission = { ...data, id, createdAt };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  // Volunteer application operations
  async addVolunteerApplication(data: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const id = this.volunteerCurrentId++;
    const createdAt = new Date();
    const application: VolunteerApplication = { ...data, id, createdAt };
    this.volunteerApplications.set(id, application);
    return application;
  }

  // Partnership inquiry operations
  async addPartnershipInquiry(data: InsertPartnershipInquiry): Promise<PartnershipInquiry> {
    const id = this.partnershipCurrentId++;
    const createdAt = new Date();
    const inquiry: PartnershipInquiry = { ...data, id, createdAt };
    this.partnershipInquiries.set(id, inquiry);
    return inquiry;
  }

  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async addProject(projectData: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const createdAt = new Date();
    const project: Project = { ...projectData, id, createdAt };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: InsertProject): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject: Project = { 
      ...projectData, 
      id, 
      createdAt: existingProject.createdAt 
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
