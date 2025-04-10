import { useEffect } from 'react';
import InvolvementCards from '@/components/get-involved/InvolvementCards';
import VolunteerForm from '@/components/get-involved/VolunteerForm';
import PartnershipForm from '@/components/get-involved/PartnershipForm';

const GetInvolved = () => {
  // Set page title
  useEffect(() => {
    document.title = "Get Involved - Kakamega Empowerment Network";
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get Involved</h2>
          <p className="text-gray-600">
            Join our mission to create sustainable communities and fight climate change. There are many ways to contribute.
          </p>
        </div>

        {/* Involvement Cards - Volunteer, Donate, Partner */}
        <InvolvementCards />

        {/* Volunteer Form Section */}
        <VolunteerForm />

        {/* Partnership Form Section */}
        <PartnershipForm />

        {/* Donation Section */}
        <div id="donate" className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Support Our Mission</h3>
          <p className="text-gray-600 mb-6">
            Your financial contribution helps us create more community gardens, educate more people, and make a bigger impact on climate change.
          </p>
          <p className="text-gray-600 mb-8">
            We accept donations through various methods. Choose the one that works best for you:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">One-time Donation</h4>
              <p className="text-gray-600 text-sm mb-4">Support a specific project or our general operations</p>
              <button className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition w-full">
                Donate Now
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Monthly Giving</h4>
              <p className="text-gray-600 text-sm mb-4">Become a sustaining donor with automatic monthly donations</p>
              <button className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition w-full">
                Give Monthly
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Corporate Giving</h4>
              <p className="text-gray-600 text-sm mb-4">Partner with us as a business or organization</p>
              <button className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition w-full">
                Corporate Donations
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Kakamega Empowerment Network is a 501(c)(3) organization. Your donation may be tax-deductible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
