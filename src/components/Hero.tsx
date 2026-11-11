import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PERSONAL_INFO, HERO_STATS } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative scroll-mt-20 bg-[#080B12] pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Centered Ambient Background Glows */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[600px] h-[250px] sm:h-[350px] bg-gradient-to-r from-[#6366F1]/12 via-[#8B5CF6]/12 to-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-72 left-1/4 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#6366F1]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-72 right-1/4 translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#06B6D4]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Container - Centered and Proportioned */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-5 sm:space-y-6">
          
          {/* Eyebrow and Availability Badge Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
              <span className="text-[#06B6D4]">//</span>
              <span>PORTFOLIO &amp; OVERVIEW</span>
            </div>
            <div className="hidden xs:inline-block text-white/20">•</div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0D1117]/90 border border-[#06B6D4]/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-[11px] sm:text-xs font-medium text-[#F8FAFC] max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[#06B6D4] font-mono tracking-tight font-medium truncate">Available for Opportunities</span>
              <span className="text-[#94A3B8] text-[11px] hidden xs:inline shrink-0">• Ahmedabad, India</span>
            </div>
          </div>

          {/* Main Headings */}
          <div className="space-y-2.5 sm:space-y-3 w-full">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] font-display break-words">
              Hi, I'm <span className="bg-gradient-to-r from-white via-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent">{PERSONAL_INFO.name}</span>
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#94A3B8] leading-snug sm:leading-tight max-w-2xl mx-auto">
              <span className="text-[#6366F1]">Python</span> &amp; <span className="text-[#8B5CF6]">Django</span> Developer{' '}
              <span className="text-[#F8FAFC] inline">
                building <span className="text-[#06B6D4] underline decoration-[#06B6D4]/30 underline-offset-4">AI-powered</span> applications.
              </span>
            </p>
          </div>

          {/* Technology Emphasis Pills */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 pt-1 font-mono text-[11px] sm:text-xs">
            <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1] font-medium">
              # Python
            </span>
            <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] font-medium">
              # Django &amp; DRF
            </span>
            <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] font-medium">
              # AI / LLM / RAG
            </span>
            <span className="px-2.5 sm:px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#94A3B8]">
              # REST APIs
            </span>
          </div>

          {/* Description */}
          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {PERSONAL_INFO.bioSummary}
          </p>

          {/* Action Buttons: Stacked on mobile, row on tablet/desktop */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto max-w-xs sm:max-w-none">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#8B5CF6] hover:opacity-95 shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pradipsinh_Jadeja_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[#F8FAFC] bg-[#0D1117] hover:bg-[#151D28] border border-white/10 hover:border-[#6366F1]/40 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-[#06B6D4]" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#06B6D4] transition-colors group px-3 py-2 w-full sm:w-auto"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Hero Stats Section */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 md:p-5 border border-white/5 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#F8FAFC] tracking-tight flex items-baseline gap-1 group-hover:text-[#6366F1] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#94A3B8] leading-snug min-h-[2.25rem] flex items-center">
                  {stat.label}
                </div>
                {stat.highlight && (
                  <div className="text-[10px] md:text-[11px] font-mono text-[#06B6D4] uppercase tracking-wider pt-0.5 truncate">
                    {stat.highlight}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
