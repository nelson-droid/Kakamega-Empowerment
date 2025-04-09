import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter', { email });
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-[#F7F3E3]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center scroll-reveal">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Stay Updated with Our Progress</h2>
          <p className="text-gray-600 mb-8">
            Join our newsletter to receive updates about our projects, climate initiatives, and upcoming volunteer opportunities.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-0" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-full sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-primary text-white rounded-full sm:rounded-l-none font-medium hover:bg-[#1F6A4D] transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
