import { useEffect, useState } from 'react';

interface HistoryItemProps {
  number: string;
  title: string;
  description: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ number, title, description }) => {
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

    const elements = document.querySelectorAll('.history-item');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div 
      className={`rounded-lg bg-[#F7F3E3] p-6 history-item ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <div className="flex items-center mb-4">
        <span className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full font-bold">{number}</span>
        <h4 className="ml-3 text-xl font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

const History = () => {
  return (
    <div className="mb-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our History</h3>
        <p className="text-gray-600">
          How we grew from a small neighborhood initiative to a climate-positive movement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <HistoryItem 
          number="1" 
          title="The Beginning" 
          description="Founded in 2015 by a group of environmental scientists and community organizers concerned about increasing food insecurity and climate challenges in rural areas."
        />

        <HistoryItem 
          number="2" 
          title="Growth Period" 
          description="Between 2017-2020, we expanded from a single community garden to 15 locations across three counties, developing our educational programs and farming techniques."
        />

        <HistoryItem 
          number="3" 
          title="Present Day" 
          description="Today, GreenRoots operates 25+ community gardens, employs innovative climate mitigation strategies, and partners with schools, local governments, and businesses."
        />
      </div>
    </div>
  );
};

export default History;
