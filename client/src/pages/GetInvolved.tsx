import { useEffect } from 'react';
import InvolvementCards from '@/components/get-involved/InvolvementCards';
import VolunteerForm from '@/components/get-involved/VolunteerForm';
import PartnershipForm from '@/components/get-involved/PartnershipForm';
import DonationForm from '@/components/get-involved/DonationForm';

const GetInvolved = () => {
  // Set page title
  useEffect(() => {
    document.title = "Get Involved - Kakamega Empowerment";
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
          
          <DonationForm />
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
