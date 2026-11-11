import React from 'react';
import { Download, FileText, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeCTAProps {
  onOpenResume: () => void;
}

export const ResumeCTA: React.FC<ResumeCTAProps> = ({ onOpenResume }) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0D1117] relative overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#111827] to-[#0D1117] border border-white/10 p-5 sm:p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] glow-border">
          
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6366F1]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
                <span className="text-[#06B6D4]">//</span>
                <span>RESUME &amp; CREDENTIALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
                Want to know more about my experience?
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Download my resume to explore my professional experience, technical skills and projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Pradipsinh_Jadeja_Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#8B5CF6] hover:opacity-95 shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-[#F8FAFC] bg-[#0D1117] hover:bg-white/5 border border-white/10 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#06B6D4]" />
                <span>Preview Online</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
