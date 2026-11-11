import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Calendar, MapPin, Building, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#0D1117] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold">
            <span className="text-[#8B5CF6]">//</span>
            <span>EXPERIENCE</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            Professional Experience
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl">
            Real industry engineering roles focusing on web platforms, REST APIs, and production maintenance.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-6 space-y-8 sm:space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className="relative pl-4 sm:pl-10 group">
              
              {/* Timeline Marker Node */}
              <div className="absolute -left-[9px] top-2 sm:top-1.5 w-4 h-4 rounded-full bg-[#0D1117] border-2 border-[#6366F1] group-hover:border-[#06B6D4] group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

              {/* Timeline Card Content */}
              <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 hover:border-[#6366F1]/30 transition-all">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-[#F8FAFC] tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#94A3B8] mt-1">
                      <span className="text-[#6366F1] font-semibold flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#6366F1] shrink-0" />
                        <span>{exp.company}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] font-mono text-[11px] sm:text-xs self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-2.5 mb-6">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-sm text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-1" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div>
                  <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                    Technologies Employed:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-[#0D1117] border border-white/10 text-xs font-mono text-[#F8FAFC]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
