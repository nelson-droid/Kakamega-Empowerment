import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import KaleFarmingProject from '@/components/projects/KaleFarmingProject';
import { Project } from '@/lib/types';

interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

const Projects = () => {
  // Set page title
  useEffect(() => {
    document.title = "Our Projects - Kakamega Empowerment Network";
  }, []);

  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch all projects
  const { data: response, isLoading, error } = useQuery<ProjectsResponse>({
    queryKey: ['/api/projects'],
    staleTime: 60000, // 1 minute
  });
  
  // Get projects from the response
  const projects = response?.data || [];

  // Extract unique categories from projects
  const categories = projects.length > 0
    ? [...new Set(projects.map(p => p.category))]
    : [];

  // Filter projects based on selected category
  useEffect(() => {
    if (projects) {
      const filtered = activeCategory === 'All Projects'
        ? projects
        : projects.filter(project => project.category === activeCategory);
      
      setDisplayedProjects(filtered);
    }
  }, [activeCategory, projects]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset visible count when changing category
  };

  // Load more projects
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section className="py-20 bg-[#F7F3E3]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Projects</h2>
          <p className="text-gray-600">
            Explore our initiatives that are making a difference in communities and fighting climate change.
          </p>
        </div>

        {/* Project Filters */}
        {!isLoading && !error && (
          <ProjectFilters 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="w-full h-56 bg-gray-300"></div>
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading projects. Please try again later.</p>
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.slice(0, visibleCount).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !error && displayedProjects.length > visibleCount && (
          <div className="mt-10 text-center">
            <button 
              onClick={handleLoadMore}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition shadow"
            >
              Load More Projects
            </button>
          </div>
        )}
        
        {/* Featured Kale Farming Project with Images */}
        {!isLoading && !error && (activeCategory === 'All Projects' || activeCategory === 'Urban Farming') && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Featured Project Highlight
            </h3>
            <KaleFarmingProject />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
