import { useState } from 'react';
import { kalesImages } from '@/lib/supabase';

const KaleFarmingProject = () => {
  const [activeImage, setActiveImage] = useState<1 | 2>(1);

  return (
    <div className="py-12 bg-white" id="kale-project">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="p-6">
              <div className="relative overflow-hidden rounded-lg mb-4 h-96">
                <img 
                  src={activeImage === 1 ? kalesImages.image1 : kalesImages.image2} 
                  alt="Kale Farming Project" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveImage(1)} 
                  className={`w-1/2 h-24 rounded-lg overflow-hidden ${activeImage === 1 ? 'ring-2 ring-primary' : 'opacity-70'}`}
                >
                  <img src={kalesImages.image1} alt="Kale Farm View 1" className="w-full h-full object-cover" />
                </button>
                <button 
                  onClick={() => setActiveImage(2)} 
                  className={`w-1/2 h-24 rounded-lg overflow-hidden ${activeImage === 2 ? 'ring-2 ring-primary' : 'opacity-70'}`}
                >
                  <img src={kalesImages.image2} alt="Kale Farm View 2" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6 flex flex-col justify-center">
              <div className="mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Urban Farming</span>
                <span className="ml-2 px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">Food Security</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Innovative Kale Vertical Farming Project
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                This project showcases innovative urban farming techniques using vertical gardening and sack gardening to grow nutritious vegetables like kale and spinach in limited spaces. By utilizing recycled materials such as large containers and sacks, we maximize productivity while minimizing costs and land usage.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                This method not only provides a sustainable solution to food insecurity in urban areas but also promotes environmental conservation through recycling. With the rising demand for fresh, organic produce in cities, our project demonstrates a practical, affordable, and eco-friendly approach to urban agriculture, empowering communities to grow their own food even in the smallest of spaces.
              </p>
              
              {/* Impact Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">75%</p>
                  <p className="text-sm text-gray-500">Space Saved</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">90%</p>
                  <p className="text-sm text-gray-500">Water Saved</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-500">Organic</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">3x</p>
                  <p className="text-sm text-gray-500">Yield Increase</p>
                </div>
              </div>
              
              <button className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition self-start">
                Join This Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaleFarmingProject;