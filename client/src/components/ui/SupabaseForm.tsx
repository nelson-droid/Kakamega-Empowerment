import { useState, FormEvent, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface SupabaseFormProps {
  endpoint: string;
  successMessage: string;
  errorMessage: string;
  children: ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const SupabaseForm: React.FC<SupabaseFormProps> = ({
  endpoint,
  successMessage,
  errorMessage,
  children,
  onSuccess,
  onError
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await apiRequest('POST', endpoint, data);
      toast({
        title: "Success!",
        description: successMessage,
      });
      
      if (onSuccess) onSuccess();
      
      // Reset the form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Apply disabled state to all form elements if isSubmitting is true */}
      {isSubmitting
        ? React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                disabled: true
              });
            }
            return child;
          })
        : children}
    </form>
  );
};

export default SupabaseForm;
