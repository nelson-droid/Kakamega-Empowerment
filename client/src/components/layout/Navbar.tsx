import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import logoImage from '@assets/LOGO IMAGE.jpeg';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src={logoImage} alt="Kakamega Empowerment Network Logo" className="h-12 w-auto" />
            <span className="ml-2 text-xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Kakamega Empowerment Network</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className={`font-medium ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition`}>
            Home
          </Link>
          <Link href="/about" className={`font-medium ${isActive('/about') ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition`}>
            About Us
          </Link>
          <Link href="/projects" className={`font-medium ${isActive('/projects') ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition`}>
            Projects
          </Link>
          <Link href="/get-involved" className={`font-medium ${isActive('/get-involved') ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition`}>
            Get Involved
          </Link>
          <Link href="/contact" className={`font-medium ${isActive('/contact') ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition`}>
            Contact
          </Link>
          <a 
            href="#donate" 
            className="ml-4 px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition"
            onClick={(e) => {
              e.preventDefault();
              // Scroll to donate section or navigate to it
              const donateSection = document.getElementById('donate');
              if (donateSection) {
                donateSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/get-involved#donate';
              }
            }}
          >
            Donate
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          id="mobile-menu-button" 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg absolute w-full`}>
        <div className="px-4 py-3 space-y-4">
          <Link href="/" className="block font-medium text-gray-700 hover:text-primary" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link href="/about" className="block font-medium text-gray-700 hover:text-primary" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link href="/projects" className="block font-medium text-gray-700 hover:text-primary" onClick={closeMobileMenu}>
            Projects
          </Link>
          <Link href="/get-involved" className="block font-medium text-gray-700 hover:text-primary" onClick={closeMobileMenu}>
            Get Involved
          </Link>
          <Link href="/contact" className="block font-medium text-gray-700 hover:text-primary" onClick={closeMobileMenu}>
            Contact
          </Link>
          <a 
            href="#donate"
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              // Scroll to donate section or navigate to it
              const donateSection = document.getElementById('donate');
              if (donateSection) {
                donateSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/get-involved#donate';
              }
            }} 
            className="block px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark text-center"
          >
            Donate
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
