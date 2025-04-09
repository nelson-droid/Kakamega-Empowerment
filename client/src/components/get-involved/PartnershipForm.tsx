import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Create schema for the partnership form
const partnershipSchema = z.object({
  organization: z.string().min(1, "Organization name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactPosition: z.string().min(1, "Position is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  partnershipType: z.string().min(1, "Please select a partnership type"),
  goals: z.string().min(20, "Please provide more details about your partnership goals (minimum 20 characters)")
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

const PartnershipForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      organization: '',
      contactName: '',
      contactPosition: '',
      email: '',
      phone: '',
      partnershipType: '',
      goals: ''
    }
  });
  
  const { toast } = useToast();

  const onSubmit = async (data: PartnershipFormData) => {
    try {
      await apiRequest('POST', '/api/partnership', data);
      toast({
        title: "Inquiry Received!",
        description: "Thanks for your interest in partnering with us. We'll be in touch soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not submit your inquiry. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div id="partnership-form" className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 scroll-reveal">
      <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Partnership Inquiry</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">Organization Name</label>
          <input 
            type="text" 
            id="organization" 
            {...register('organization')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.organization && <p className="mt-1 text-sm text-red-500">{errors.organization.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">Contact Person</label>
            <input 
              type="text" 
              id="contactName" 
              {...register('contactName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.contactName && <p className="mt-1 text-sm text-red-500">{errors.contactName.message}</p>}
          </div>
          <div>
            <label htmlFor="contactPosition" className="block text-gray-700 font-medium mb-2">Position/Title</label>
            <input 
              type="text" 
              id="contactPosition" 
              {...register('contactPosition')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.contactPosition && <p className="mt-1 text-sm text-red-500">{errors.contactPosition.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="partnershipType" className="block text-gray-700 font-medium mb-2">Partnership Type</label>
          <select 
            id="partnershipType"
            {...register('partnershipType')} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>Select partnership type</option>
            <option value="corporate">Corporate Sponsor</option>
            <option value="educational">Educational Institution</option>
            <option value="nonprofit">Nonprofit Organization</option>
            <option value="government">Government Agency</option>
            <option value="other">Other</option>
          </select>
          {errors.partnershipType && <p className="mt-1 text-sm text-red-500">{errors.partnershipType.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="goals" className="block text-gray-700 font-medium mb-2">Partnership Goals & Ideas</label>
          <textarea 
            id="goals"
            {...register('goals')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          {errors.goals && <p className="mt-1 text-sm text-red-500">{errors.goals.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default PartnershipForm;
