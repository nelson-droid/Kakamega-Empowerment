import { Link } from 'wouter';
import { useEffect, useState } from 'react';

interface InvolvementCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

const InvolvementCard: React.FC<InvolvementCardProps> = ({ icon, title, description, actionText, actionLink }) => {
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

    const elements = document.querySelectorAll('.involvement-card');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div 
      className={`bg-[#F7F3E3] rounded-lg p-8 text-center shadow-md hover:shadow-lg transition involvement-card ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <a href={actionLink} className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition inline-block">
        {actionText}
      </a>
    </div>
  );
};

const InvolvementCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <InvolvementCard 
        icon={
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        }
        title="Volunteer"
        description="Share your time and skills to help with gardening, education, events, and more."
        actionText="Become a Volunteer"
        actionLink="#volunteer-form"
      />

      <InvolvementCard 
        icon={
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        }
        title="Donate"
        description="Support our projects financially. Every contribution makes a difference in our mission."
        actionText="Make a Donation"
        actionLink="#donate"
      />

      <InvolvementCard 
        icon={
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        }
        title="Partner"
        description="Collaborate with us as a business, school, or organization to create greater impact."
        actionText="Become a Partner"
        actionLink="#partnership-form"
      />
    </div>
  );
};

export default InvolvementCards;
