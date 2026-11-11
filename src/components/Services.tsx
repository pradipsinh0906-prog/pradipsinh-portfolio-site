import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { DynamicIcon } from './DynamicIcon';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#080B12] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
            <span className="text-[#06B6D4]">//</span>
            <span>SERVICES</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            What I Can Build
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl">
            Practical engineering services across backend systems, web architecture, and automated intelligence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#6366F1]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0D1117] border border-white/10 flex items-center justify-center text-[#6366F1] group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/30 transition-colors mb-4">
                  <DynamicIcon name={service.iconName} className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold font-display text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mt-2.5">
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                {service.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#F8FAFC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
