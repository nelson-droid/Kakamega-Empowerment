import Hero from '@/components/home/Hero';
import ImpactStats from '@/components/home/ImpactStats';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonial from '@/components/home/Testimonial';
import Newsletter from '@/components/home/Newsletter';
import { useEffect } from 'react';

const Home = () => {
  // Set page title
  useEffect(() => {
    document.title = "GreenRoots - Empowering Rural Communities Through Sustainable Farming";
  }, []);

  return (
    <>
      <Hero />
      <ImpactStats />
      <FeaturedProjects />
      <Testimonial />
      <Newsletter />
    </>
  );
};

export default Home;
