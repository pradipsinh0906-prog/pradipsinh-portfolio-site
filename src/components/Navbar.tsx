import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'ai-journey', label: 'AI Journey' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/85 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none min-w-0"
            aria-label="Pradipsinh Jadeja - Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.35)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all shrink-0">
              <div className="w-full h-full bg-[#0D1117] rounded-[11px] flex items-center justify-center text-white font-mono text-xs sm:text-sm font-semibold tracking-wider">
                PJ
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs sm:text-base font-semibold text-[#F8FAFC] tracking-tight group-hover:text-[#6366F1] transition-colors truncate max-w-[150px] sm:max-w-[260px] md:max-w-none">
                Pradipsinh Jadeja
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#94A3B8] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate max-w-[140px] sm:max-w-[240px] md:max-w-none">Python &amp; Django • AI/LLM</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on Large Desktops) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#0D1117]/80 backdrop-blur-md border border-white/5 px-3 xl:px-4 py-1.5 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 text-[#F8FAFC] border border-[#6366F1]/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pradipsinh_Jadeja_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
              aria-label="Download Pradipsinh Jadeja Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0D1117] border border-white/10 text-[#94A3B8] hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 sm:p-5 rounded-2xl bg-[#0D1117]/95 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-center transition-all ${
                      isActive
                        ? 'bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30 font-semibold'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between sm:hidden">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Pradipsinh_Jadeja_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
