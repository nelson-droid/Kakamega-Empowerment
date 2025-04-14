import { useEffect } from 'react';
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';

export default function DonationSuccess() {
  useEffect(() => {
    document.title = 'Donation Successful - Kakamega Empowerment';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You for Your Donation!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your contribution will help us continue our mission to empower communities and fight climate change.
        </p>
        <div className="mt-8">
          <Link href="/">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Return to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
} 