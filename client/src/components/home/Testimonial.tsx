import { useEffect, useState } from 'react';

const Testimonial = () => {
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

    const element = document.querySelector('.testimonial-container');
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
    <div className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div 
          className={`max-w-3xl mx-auto text-center testimonial-container ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <svg className="w-12 h-12 mx-auto text-white opacity-50 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"/>
          </svg>
          <p className="text-xl md:text-2xl italic mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            "Kakamega Empowerment Network has transformed our community. We've gone from food insecurity to sustainability champions in just 18 months. Their approach combines education, technology and community involvement perfectly."
          </p>
          <div>
            <p className="font-semibold">Maria Johnson</p>
            <p className="text-white/80">Community Leader, Riverdale</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
