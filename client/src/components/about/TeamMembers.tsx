import { useState, useEffect } from 'react';

interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, position, bio }) => {
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

    const elements = document.querySelectorAll('.team-member');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div 
      className={`text-center team-member ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
      />
      <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
      <p className="text-primary font-medium mb-2">{position}</p>
      <p className="text-gray-600 text-sm">{bio}</p>
    </div>
  );
};

const TeamMembers = () => {
  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      name: "Dr. Sarah Chen",
      position: "Founder & Executive Director",
      bio: "Environmental scientist with 15+ years of experience in sustainable agriculture and climate policy."
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      name: "Marcus Johnson",
      position: "Director of Operations",
      bio: "Former urban planner who specializes in designing efficient, sustainable community spaces."
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      name: "Aisha Patel",
      position: "Education Director",
      bio: "Develops our curriculum and training programs for schools and community workshops."
    },
    {
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      name: "James Wilson",
      position: "Climate Initiatives Lead",
      bio: "Specializes in measuring and optimizing the climate impact of our farming practices."
    }
  ];

  return (
    <div>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Meet Our Team</h3>
        <p className="text-gray-600">
          Passionate individuals dedicated to creating sustainable change in our communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember 
            key={index}
            image={member.image}
            name={member.name}
            position={member.position}
            bio={member.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
