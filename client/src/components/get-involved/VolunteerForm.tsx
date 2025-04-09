import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Create schema for the volunteer form
const volunteerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interests: z.array(z.string()).optional(),
  availability: z.string().min(1, "Please select your availability"),
  message: z.string().min(10, "Please tell us why you'd like to volunteer (minimum 10 characters)")
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const VolunteerForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interests: [],
      availability: '',
      message: ''
    }
  });
  
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const onSubmit = async (data: VolunteerFormData) => {
    // Include the selected interests
    data.interests = interests;
    
    try {
      await apiRequest('POST', '/api/volunteer', data);
      toast({
        title: "Application Received!",
        description: "Thanks for your interest in volunteering. We'll be in touch soon.",
      });
      reset();
      setInterests([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not submit your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div id="volunteer-form" className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mb-16 scroll-reveal">
      <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Volunteer Application</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
            <input 
              type="text" 
              id="firstName"
              {...register('firstName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              {...register('lastName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            {...register('phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Areas of Interest</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Gardening', 'Education', 'Event Planning', 
              'Administration', 'Marketing', 'Policy Advocacy'
            ].map(interest => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                <span className="ml-2 text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
          {errors.interests && <p className="mt-1 text-sm text-red-500">{errors.interests.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="availability" className="block text-gray-700 font-medium mb-2">Availability</label>
          <select 
            id="availability"
            {...register('availability')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>Select your availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
            <option value="flexible">Flexible</option>
          </select>
          {errors.availability && <p className="mt-1 text-sm text-red-500">{errors.availability.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Why do you want to volunteer with us?</label>
          <textarea 
            id="message"
            {...register('message')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
