import { createClient } from '@supabase/supabase-js';
import kalesImage1 from '@/assets/KALES IMAGE 1.jpeg';
import kalesImage2 from '@/assets/KALES IMAGE 2.jpeg';

// Get the Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Export the kales images for use in other components
export const kalesImages = {
  image1: kalesImage1,
  image2: kalesImage2
};

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for the different form submissions
export const submitNewsletterSignup = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting newsletter signup:', error);
    return { success: false, error };
  }
};

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
};

export const submitVolunteerApplication = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  message: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        interests: formData.interests,
        availability: formData.availability,
        message: formData.message
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting volunteer application:', error);
    return { success: false, error };
  }
};

export const submitPartnershipInquiry = async (formData: {
  organization: string;
  contactName: string;
  contactPosition: string;
  email: string;
  phone: string;
  partnershipType: string;
  goals: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('partnership_inquiries')
      .insert([{
        organization: formData.organization,
        contact_name: formData.contactName,
        contact_position: formData.contactPosition,
        email: formData.email,
        phone: formData.phone,
        partnership_type: formData.partnershipType,
        goals: formData.goals
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting partnership inquiry:', error);
    return { success: false, error };
  }
};

export const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error };
  }
};
