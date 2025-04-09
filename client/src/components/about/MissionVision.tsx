import { useEffect, useState } from 'react';

const MissionVision = () => {
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

    const element = document.querySelector('.mission-vision-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 mission-vision-container">
      <div className={isVisible ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.6s ease-out' }}>
        <img 
          src="https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="People working together in a community garden" 
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className={`self-center ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Mission</h3>
        <p className="text-gray-600 mb-6">
          GreenRoots is dedicated to combating climate change by promoting sustainable urban farming practices in rural communities. We believe in empowering individuals with the knowledge, skills, and resources to create self-sufficient and environmentally friendly food systems.
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Vision</h3>
        <p className="text-gray-600">
          We envision a world where every community has access to fresh, locally grown food, where sustainable farming practices help reverse climate change, and where people are reconnected to the land and their food sources.
        </p>
      </div>
    </div>
  );
};

export default MissionVision;
