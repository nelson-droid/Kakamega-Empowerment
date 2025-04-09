// Project related types
export interface ImpactMetric {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string; 
  status: string;
  image: string;
  impactMetrics: ImpactMetric[];
  createdAt: Date;
}

// Team member type
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

// Form submission types
export interface NewsletterSubmission {
  email: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface VolunteerApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  message: string;
}

export interface PartnershipInquiry {
  organization: string;
  contactName: string;
  contactPosition: string;
  email: string;
  phone: string;
  partnershipType: string;
  goals: string;
}
