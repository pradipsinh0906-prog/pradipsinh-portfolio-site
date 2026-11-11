import React from 'react';
import { Server, Layout, Database, Cpu, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, QUICK_PROFILE_CARDS } from '../data/portfolioData';
import { DynamicIcon } from './DynamicIcon';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#0D1117] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
            <span className="text-[#06B6D4]">//</span>
            <span>ABOUT</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            About Me
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl">
            Engineering robust backends, scalable relational databases, and modern AI pipelines.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Narrative Summary */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 space-y-4 sm:space-y-5 leading-relaxed text-[#94A3B8] text-xs sm:text-sm md:text-base">
              <p>
                {PERSONAL_INFO.aboutDescription}
              </p>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#6366F1]/10 via-[#8B5CF6]/5 to-transparent border-l-2 border-[#6366F1]">
                <p className="text-xs sm:text-sm text-[#F8FAFC] font-medium leading-relaxed">
                  {PERSONAL_INFO.aboutFocusNote}
                </p>
              </div>

              <p>
                My background balances structured engineering rigor with forward-looking artificial intelligence tooling. Having worked directly on e-commerce customizations and production REST services, I focus on clean code separation, security controls, and reliable data contracts.
              </p>

              {/* Quick highlight checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
                  <span>Clean Pythonic Code</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                  <span>Secure Authentication &amp; RBAC</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                  <span>Optimized Database Queries</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pragmatic AI &amp; RAG Integration</span>
                </div>
              </div>
            </div>

            {/* Location & Quick Contact Note */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D1117] border border-white/5 text-xs text-[#94A3B8]">
              <div>
                <span className="text-[#F8FAFC] font-medium">Based in: </span>
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="font-mono text-[11px] text-[#06B6D4]">
                Open for Full-time &amp; Intern Roles
              </div>
            </div>
          </div>

          {/* Right Column: Quick Profile Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_PROFILE_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-white/5 hover:border-[#6366F1]/30 transition-all duration-300 space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0D1117] border border-white/10 flex items-center justify-center text-[#6366F1] group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/30 transition-colors">
                  <DynamicIcon name={card.iconName} className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-semibold text-[#F8FAFC] tracking-tight">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono text-[#8B5CF6] font-medium">
                    {card.subtitle}
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
