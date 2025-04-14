import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import kalesImage1 from '@/assets/KALES IMAGE 1.jpeg';
import kalesImage2 from '@/assets/KALES IMAGE 2.jpeg';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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

    const elements = document.querySelectorAll('.project-card');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success';
      case 'In Progress': return 'bg-warning/10 text-warning';
      case 'Completed': return 'bg-accent/10 text-accent';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'Climate Initiative': return 'bg-accent/10 text-accent';
      case 'Urban Farming': return 'bg-primary/10 text-primary';
      case 'Education': return 'bg-secondary/10 text-secondary';
      case 'Policy': return 'bg-primary/10 text-primary';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Get the image source based on the project
  const getImageSource = () => {
    if (project.image === 'kale-farming-project') {
      return kalesImage1;
    }
    return project.image;
  };

  return (
    <div 
      id={`project-${project.id}`}
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition project-card ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <img 
        src={getImageSource()} 
        alt={project.title} 
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 ${getCategoryColorClass(project.category)} text-sm rounded-full`}>
            {project.category}
          </span>
          <span className={`px-3 py-1 ${getStatusColorClass(project.status)} text-sm rounded-full`}>
            {project.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Impact Metrics:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {project.impactMetrics.map((metric, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-4 h-4 text-success mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>{metric.value} {metric.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <a href="#" className="inline-block text-primary font-medium hover:text-primary-dark">View Details →</a>
      </div>
    </div>
  );
};

export default ProjectCard;
