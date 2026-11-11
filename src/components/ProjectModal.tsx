import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, Github, CheckCircle2, AlertTriangle, Lightbulb, Layers, ExternalLink, Download } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-[95vw] sm:w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0D1117] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-[#F8FAFC] glow-border overflow-hidden box-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header Bar */}
        <div className="shrink-0 flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-white/10 bg-[#0D1117] z-10 min-w-0 box-border">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#06B6D4] px-2 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/20 uppercase tracking-wider font-semibold shrink-0">
                {project.category}
              </span>
              {project.badge && (
                <span className="font-mono text-[11px] text-[#818CF8] px-2 py-0.5 rounded bg-[#6366F1]/15 border border-[#6366F1]/30 font-semibold shrink-0">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold font-display text-white tracking-tight break-words">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors focus:outline-none shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body (Vertical Only, No Horizontal Scroll) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 box-border">
          {/* Overview & Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed break-words min-w-0">
            {project.description}
          </p>

          {/* Problem vs Solution Grid - single column on mobile, 2 cols on tablet/desktop */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0 w-full box-border">
              {project.problem && (
                <div className="min-w-0 w-full p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2 box-border">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider font-semibold min-w-0">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="truncate">Problem Statement</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed break-words min-w-0">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="min-w-0 w-full p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2 box-border">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold min-w-0">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">Engineered Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed break-words min-w-0">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Functional Features - single column on mobile, 2 cols on tablet/desktop */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3 min-w-0 w-full box-border">
              <div className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold flex items-center gap-2 min-w-0">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Key Functional Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0 w-full box-border">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="min-w-0 w-full flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-[#F8FAFC] box-border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                    <span className="break-words min-w-0 flex-1 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engineering Challenges & What I Learned - single column on mobile, 2 cols on tablet/desktop */}
          {((project.challenges && project.challenges.length > 0) || (project.learned && project.learned.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 min-w-0 w-full box-border">
              {project.challenges && project.challenges.length > 0 && (
                <div className="space-y-2.5 min-w-0 w-full p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 box-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold min-w-0">
                    Engineering Challenges
                  </div>
                  <ul className="space-y-2 text-xs text-[#94A3B8] min-w-0">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 min-w-0">
                        <span className="text-[#8B5CF6] shrink-0 font-bold leading-relaxed">•</span>
                        <span className="break-words min-w-0 flex-1 leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learned && project.learned.length > 0 && (
                <div className="space-y-2.5 min-w-0 w-full p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 box-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#06B6D4] font-semibold flex items-center gap-1.5 min-w-0">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                    <span>What I Learned</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#94A3B8] min-w-0">
                    {project.learned.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 min-w-0">
                        <span className="text-[#06B6D4] shrink-0 font-bold leading-relaxed">•</span>
                        <span className="break-words min-w-0 flex-1 leading-relaxed">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Technology Badges */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-white/10 min-w-0 w-full box-border">
              <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                Technology Stack:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-[#F8FAFC] shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pinned Footer Actions */}
        <div className="shrink-0 p-3.5 sm:p-5 border-t border-white/10 bg-[#0D1117] min-w-0 w-full box-border z-10 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
            <div className="text-xs text-[#94A3B8] font-mono truncate min-w-0">
              {project.github ? (
                <span className="truncate block">
                  Repository: {project.github.replace('https://', '')}
                </span>
              ) : project.downloadUrl ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="truncate">Android Package (APK)</span>
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub</span>
                </a>
              )}

              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-95 shadow-[0_4px_15px_rgba(6,182,212,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  download="MathMagic.apk"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-95 shadow-[0_4px_15px_rgba(16,185,129,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Download APK</span>
                </a>
              )}
            </div>
          </div>

          {project.downloadNote && (
            <p className="text-[11px] text-[#94A3B8] font-mono leading-tight break-words">
              {project.downloadNote}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
