import { Link } from 'wouter';

const Hero = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1532467411038-57680e3dc0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt="Urban farm with vegetables growing in a community garden" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Empowering Rural Communities Through Sustainable Farming
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            Tackling climate change one community garden at a time
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/get-involved" className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#1F6A4D] transition shadow-lg inline-block">
              Join Our Mission
            </Link>
            <Link href="/projects" className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-neutral transition shadow-lg inline-block">
              See Our Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
