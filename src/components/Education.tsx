import React from 'react';
import { EDUCATION_LIST, CERTIFICATIONS } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#0D1117] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6366F1] uppercase tracking-wider font-semibold">
            <span className="text-[#6366F1]">//</span>
            <span>EDUCATION &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            Education &amp; Certifications
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl">
            Formal computer application degrees and foundation systems programming credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Degrees Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#6366F1]" />
              <span>University Degrees</span>
            </div>

            {EDUCATION_LIST.map((edu, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-[#6366F1]/30 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-bold font-display text-[#F8FAFC] tracking-tight">
                    {edu.degree}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] font-mono text-xs self-start sm:self-auto border border-[#6366F1]/20">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                </div>

                <div className="text-sm font-medium text-[#94A3B8]">
                  {edu.institution}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>{edu.location}</span>
                  {edu.field && (
                    <>
                      <span>•</span>
                      <span className="text-[#F8FAFC]">{edu.field}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#8B5CF6]" />
              <span>Programming Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-[#8B5CF6]/30 transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] truncate">
                      {cert.issuer || 'Technical Programming Foundation'}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-mono text-xs border border-[#8B5CF6]/20 font-semibold shrink-0">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Systems Proficiency Note */}
            <div className="p-4 rounded-xl bg-[#0D1117] border border-white/5 text-xs text-[#94A3B8] space-y-1">
              <div className="text-[#F8FAFC] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Foundational Systems Training</span>
              </div>
              <p className="leading-relaxed">
                Early training in C and C++ provided deep grounding in memory management, algorithmic data structures, and pointer arithmetic.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
