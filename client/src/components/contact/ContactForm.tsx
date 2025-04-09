import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useEffect, useState } from 'react';

// Create schema for the contact form
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message is too short (minimum 10 characters)")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.contact-form');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond shortly.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-8 contact-form ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Send Us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
          <input 
            type="text" 
            id="subject" 
            {...register('subject')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea 
            id="message" 
            {...register('message')}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
