import { useState } from 'react';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {['All Projects', ...categories].map((category) => (
        <button 
          key={category}
          className={`px-5 py-2 rounded-full font-medium transition ${
            activeCategory === category 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;
