import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, category, link }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition scroll-reveal">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <span className={`px-3 py-1 ${
          category === 'Climate Initiative' ? 'bg-accent/10 text-accent' :
          category === 'Urban Farming' ? 'bg-primary/10 text-primary' :
          'bg-secondary/10 text-secondary'
        } text-sm rounded-full`}>
          {category}
        </span>
        <h3 className="mt-3 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <Link href={link} className="mt-4 inline-block text-primary font-medium hover:text-primary-dark">Learn more →</Link>
      </div>
    </div>
  );
};

interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

const FeaturedProjects = () => {
  const { data: response, isLoading, error } = useQuery<ProjectsResponse>({
    queryKey: ['/api/projects'],
    staleTime: 60000, // 1 minute
  });

  // Filter for just 3 featured projects from the data array in the response
  const featuredProjects = response?.data?.slice(0, 3) || [];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our innovative initiatives that are creating sustainable impact across rural communities.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="w-full h-56 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load projects. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                link={`/projects#project-${project.id}`}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/projects" className="px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition">
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
