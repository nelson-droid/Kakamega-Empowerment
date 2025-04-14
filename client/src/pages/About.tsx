import { useEffect } from 'react';
import MissionVision from '@/components/about/MissionVision';
import History from '@/components/about/History';
import TeamMembers from '@/components/about/TeamMembers';

const About = () => {
  // Set page title
  useEffect(() => {
    document.title = "About Us - Kakamega Empowerment";
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>About Kakamega Empowerment</h2>
          <p className="text-gray-600">
            Learn about our mission, vision, and the passionate team working to create sustainable communities.
          </p>
        </div>

        {/* Mission and Vision */}
        <MissionVision />

        {/* Our History */}
        <History />

        {/* Team Members */}
        <TeamMembers />
      </div>
    </section>
  );
};

export default About;
