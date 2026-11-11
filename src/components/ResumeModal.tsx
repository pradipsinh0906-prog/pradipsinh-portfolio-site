import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, MapPin, Mail, Phone, Linkedin, Github, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS, SKILLS, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean text/markdown download or direct PDF download link
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Pradipsinh_Jadeja_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0D1117] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-[#F8FAFC] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 sticky top-0 bg-[#0D1117]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-[#06B6D4]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#06B6D4] bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 border border-[#06B6D4]/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#F8FAFC] bg-white/10 hover:bg-white/15 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Layout */}
        <div className="space-y-8 print:text-black print:bg-white">
          
          {/* Resume Header */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-bold font-display text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-mono text-[#06B6D4] font-medium">
                {PERSONAL_INFO.location}
              </span>
            </div>

            <p className="text-base font-semibold text-[#6366F1]">
              {PERSONAL_INFO.title}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#94A3B8] font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
                {PERSONAL_INFO.phone}
              </span>
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#6366F1]" />
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                GitHub
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
              Professional Summary
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {PERSONAL_INFO.aboutDescription} {PERSONAL_INFO.aboutFocusNote}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <span className="font-bold text-white">{exp.role}</span>
                    <span className="font-mono text-xs text-[#94A3B8]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[#06B6D4] font-medium">
                    {exp.company} — {exp.location}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#6366F1]">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {exp.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#94A3B8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
              Selected Technical Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{proj.title}</span>
                    <span className="text-[10px] font-mono text-[#06B6D4]">{proj.category}</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="text-[10px] font-mono text-[#6366F1]">
                    {proj.technologies.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
                Education
              </h2>
              {EDUCATION_LIST.map((edu, i) => (
                <div key={i} className="space-y-0.5 text-xs">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-[#94A3B8]">{edu.institution}</div>
                  <div className="font-mono text-[11px] text-[#06B6D4]">{edu.period} • {edu.location}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
                Certifications &amp; Foundation
              </h2>
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="space-y-0.5 text-xs">
                  <div className="font-bold text-white">{cert.title} ({cert.year})</div>
                  <div className="text-[#94A3B8]">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
