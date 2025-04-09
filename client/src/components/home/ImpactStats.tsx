import { useEffect, useState } from 'react';

interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="text-center scroll-reveal">
      <p className="text-primary text-5xl font-bold mb-2">{value}</p>
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
};

const ImpactStats = () => {
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

    const element = document.querySelector('.stats-container');
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
    <div className="bg-[#F7F3E3] py-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 stats-container ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.6s ease-out' }}>
          <Stat value="25+" label="Community Gardens" />
          <Stat value="1,200" label="Families Supported" />
          <Stat value="45%" label="Carbon Footprint Reduction" />
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
