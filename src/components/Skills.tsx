import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill, SkillLevel } from '../types/portfolio';
import { DynamicIcon } from './DynamicIcon';
import { Sparkles, Terminal } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Backend', 'AI', 'Database', 'Frontend', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Core':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium';
      case 'Strong':
        return 'bg-[#6366F1]/15 text-[#818CF8] border-[#6366F1]/30 font-medium';
      case 'Working Knowledge':
        return 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30';
      default:
        return 'bg-white/5 text-[#94A3B8] border-white/10';
    }
  };

  return (
    <section id="skills" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#080B12] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6366F1] uppercase tracking-wider font-semibold">
              <span className="text-[#6366F1]">//</span>
              <span>SKILLS</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
              Skills &amp; Capabilities
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-xl">
              Categorized by domain proficiency without superficial percentage ratings.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0D1117] border border-white/5 self-start md:self-auto max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    active
                      ? 'bg-[#6366F1] text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-4 border border-white/5 flex flex-col justify-between group hover:border-[#6366F1]/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Category indicator hint */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D1117] border border-white/10 flex items-center justify-center text-[#94A3B8] group-hover:text-[#6366F1] group-hover:border-[#6366F1]/30 transition-colors">
                  <DynamicIcon name={skill.iconName} className="w-4 h-4" />
                </div>
                <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5">
                  {skill.category}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">
                  {skill.name}
                </h4>
                <div className="mt-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full font-mono text-[10px] border ${getLevelBadgeClass(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend note */}
        <div className="mt-10 p-4 rounded-xl bg-[#0D1117]/60 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#F8FAFC]">Proficiency Guide:</span>
            <span>Reflects honest, verifiable proficiency without superficial percentage ratings.</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Core
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#818CF8]">
              <span className="w-2 h-2 rounded-full bg-[#6366F1]" /> Strong
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#06B6D4]" title="Conceptual understanding, applied via AI-assisted development">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Working Knowledge (Conceptual understanding, applied via AI-assisted development)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
