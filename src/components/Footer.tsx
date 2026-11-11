import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 bg-[#05070D] text-[#94A3B8] relative overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-[1px]">
              <div className="w-full h-full bg-[#0D1117] rounded-[11px] flex items-center justify-center text-white font-mono text-xs font-bold">
                {PERSONAL_INFO.shortName}
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-[#F8FAFC] text-sm">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs font-mono text-[#94A3B8]">
                Python &amp; Django Developer | AI/LLM Enthusiast
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6366F1] flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[#06B6D4] flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Scroll to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="text-[11px] text-[#94A3B8]/80">
            Engineered with React, TypeScript, Tailwind CSS &amp; Modern Glassmorphism
          </p>
        </div>
      </div>
    </footer>
  );
};
