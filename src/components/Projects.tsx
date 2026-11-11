import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { Github, ArrowRight, Sparkles, Code2, ExternalLink, Download } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterOptions: ProjectCategory[] = ['All', 'AI', 'Web', 'Android'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        const cat = p.category.toLowerCase();
        const techs = p.technologies.map((t) => t.toLowerCase());
        if (activeFilter === 'AI') {
          return cat.includes('ai') || techs.some((t) => t.includes('gemini') || t.includes('langchain') || t.includes('groq'));
        }
        if (activeFilter === 'Web') {
          return cat.includes('web') || techs.some((t) => ['react', 'typescript', 'html', 'css', 'bootstrap', 'google places api'].includes(t));
        }
        if (activeFilter === 'Android') {
          return cat.includes('android') || cat.includes('mobile') || techs.some((t) => ['android', 'kotlin', 'jetpack compose'].includes(t));
        }
        return true;
      });

  return (
    <section id="projects" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#080B12] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
              <span className="text-[#06B6D4]">//</span>
              <span>PROJECTS</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
              Featured Projects
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-xl">
              Concrete engineering implementations featuring LLM integration, Gemini APIs, Groq inference, Django web platforms, and REST architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0D1117] border border-white/5 self-start md:self-auto max-w-full overflow-x-auto">
            {filterOptions.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-14 text-center rounded-2xl border border-white/5 bg-[#0D1117]/60 p-8 space-y-3 max-w-md mx-auto">
            <p className="text-sm font-mono text-[#94A3B8]">
              No featured projects found under "{activeFilter}".
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06B6D4] hover:text-[#38BDF8] transition-colors"
            >
              <span>View All Featured Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`glass-card rounded-2xl border flex flex-col justify-between overflow-hidden group transition-all duration-300 ${
                  project.featured
                    ? 'border-[#6366F1]/40 bg-[#0D1117]/90 shadow-[0_10px_35px_rgba(99,102,241,0.12)]'
                    : 'border-white/5 bg-[#0D1117]/60 hover:border-white/15'
                }`}
              >
                {/* Card Header & Visual Graphic */}
                <div>
                  <div className="relative p-4 sm:p-5 pb-4 bg-gradient-to-b from-[#111827] to-[#0D1117] border-b border-white/5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-[#06B6D4] px-2.5 py-1 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/20 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>

                      {project.featured && (
                        <span className="font-mono text-[10px] text-[#818CF8] px-2.5 py-1 rounded bg-[#6366F1]/15 border border-[#6366F1]/30 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#6366F1]" />
                          <span>{project.badge || 'Featured Project'}</span>
                        </span>
                      )}
                    </div>

                    {/* Visual Mockup Box */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#080B12] border border-white/10 font-mono text-[11px] text-[#94A3B8] space-y-1.5 shadow-inner">
                      <div className="flex items-center justify-between text-[10px] text-[#6366F1] border-b border-white/5 pb-1">
                        <span className="text-white font-semibold flex items-center gap-1.5 truncate">
                          <Code2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                          <span className="truncate">{project.title}</span>
                        </span>
                        <span className="text-[9px] text-[#94A3B8] shrink-0 ml-1 truncate">
                          {project.technologies.slice(0, 2).join(' • ')}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#38BDF8] font-mono truncate">
                        {project.mockupSnippet || 'Reliable backend & API architecture'}
                      </div>
                    </div>
                  </div>

                  {/* Content body */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#F8FAFC] tracking-tight group-hover:text-[#6366F1] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights checklist */}
                    <div className="space-y-1.5 text-xs text-[#94A3B8] pt-1">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#06B6D4] font-bold text-xs mt-0.5">›</span>
                          <span className="line-clamp-1 text-[#CBD5E1]">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#F8FAFC]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Footer: Conditional per project */}
                <div className="p-4 sm:p-5 pt-3 border-t border-white/5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#06B6D4]" />
                    </button>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                          title="View GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-95 shadow-[0_4px_15px_rgba(6,182,212,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.downloadUrl && (
                        <a
                          href={project.downloadUrl}
                          download="MathMagic.apk"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-95 shadow-[0_4px_15px_rgba(16,185,129,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                          title="Download APK (Android)"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download APK</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {project.downloadNote && (
                    <p className="text-[11px] text-[#94A3B8] font-mono leading-tight pt-0.5">
                      {project.downloadNote}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

