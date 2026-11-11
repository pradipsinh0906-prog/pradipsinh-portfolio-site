import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F5F6F8]/90 backdrop-blur-md border-b border-[#1B2430]/10 shadow-[0_1px_3px_rgba(27,36,48,0.03)]'
          : 'bg-[#F5F6F8] border-b border-[#1B2430]/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Mark */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-[#1B2430] hover:text-[#2E6DA4] transition-colors focus-visible:ring-2 focus-visible:ring-[#2E6DA4] focus-visible:outline-none rounded px-1 -mx-1"
          aria-label="Pradipsinh homepage"
        >
          <span className="flex items-center gap-1 font-mono text-sm tracking-tight text-[#1B2430]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2E6DA4] group-hover:scale-125 transition-transform" />
            <span className="inline-block w-2 h-2 rounded-full bg-[#C98F2B] group-hover:scale-125 transition-transform" />
            <span className="font-medium">pradipsinh.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium tracking-normal transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#2E6DA4] focus-visible:outline-none rounded ${
                  isActive
                    ? 'text-[#2E6DA4]'
                    : 'text-[#536070] hover:text-[#1B2430]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E6DA4] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#536070] hover:text-[#1B2430] focus-visible:ring-2 focus-visible:ring-[#2E6DA4] focus-visible:outline-none rounded"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1B2430]/10 bg-[#F5F6F8] px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#536070] hover:text-[#2E6DA4] py-1.5 focus-visible:ring-2 focus-visible:ring-[#2E6DA4] focus-visible:outline-none rounded"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
