import React from 'react';
import {
  Zap,
  Search,
  MessageSquareCode,
  ShieldCheck,
  Bot,
  Workflow,
  Sparkles,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

export const AIJourney: React.FC = () => {
  const pathSteps = [
    'Python',
    'Machine Learning',
    'LLMs',
    'Prompt Engineering',
    'RAG',
    'Pydantic / Structured Outputs',
    'AI Agents',
    'Automation with n8n',
  ];

  const cards = [
    {
      title: 'LLM Applications',
      status: 'Applied via AI-Assisted Development',
      description:
        'Building interactive client applications powered by high-throughput inference engines like Groq Llama 3.',
      icon: Zap,
      proof: 'Applied in AI Resume Reviewer',
    },
    {
      title: 'RAG',
      status: 'Applied via AI-Assisted Development',
      description:
        'Implementing retrieval-augmented patterns, document chunking, and contextual information extraction from PDFs.',
      icon: Search,
      proof: 'Applied in AI Resume Reviewer',
    },
    {
      title: 'Prompt Engineering',
      status: 'Applied via AI-Assisted Development',
      description:
        'Crafting deterministic system prompts, few-shot conditioning, and delimiter-based schema instructions.',
      icon: MessageSquareCode,
      proof: 'Applied in AI Resume Reviewer',
    },
    {
      title: 'AI Agents',
      status: 'Familiar With',
      description:
        'Understanding autonomous agent loops that execute step-by-step tool decisions, reasoning traces, and function calls.',
      icon: Bot,
    },
    {
      title: 'Structured Outputs',
      status: 'Applied via AI-Assisted Development',
      description:
        'Parsing and validating model responses into predictable typed schemas, avoiding brittle unformatted text parsing.',
      icon: ShieldCheck,
      proof: 'Applied in AI Resume Reviewer',
    },
    {
      title: 'Pydantic',
      status: 'Applied via AI-Assisted Development',
      description:
        'Applying strict Python type annotations, runtime validation, and serialization for robust AI pipelines.',
      icon: Bookmark,
      proof: 'Applied in AI Resume Reviewer',
    },
    {
      title: 'n8n Automation',
      status: 'Familiar With',
      description:
        'Designing node-based automation workflows, webhook listeners, and asynchronous triggers for end-to-end tasks.',
      icon: Workflow,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied via AI-Assisted Development':
        return 'bg-[#6366F1]/15 text-[#818CF8] border-[#6366F1]/30 font-medium';
      case 'Familiar With':
        return 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30 font-medium';
      default:
        return 'bg-white/5 text-[#94A3B8] border-white/10';
    }
  };

  return (
    <section id="ai-journey" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#0D1117] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent pointer-events-none" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold">
            <span className="text-[#8B5CF6]">//</span>
            <span>AI &amp; LLM JOURNEY</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            Exploring AI &amp; LLM Engineering
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl font-medium">
            From traditional web development to AI-assisted application building.
          </p>
          <p className="text-xs sm:text-sm text-[#06B6D4] max-w-2xl font-mono">
            &ldquo;I understand these concepts and apply them in my projects using AI-assisted development workflows.&rdquo;
          </p>
        </div>

        {/* Animated Learning & Technology Path Flow */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#0D1117]/80 border border-white/5 mb-8 sm:mb-12 relative overflow-hidden group">
          <div className="text-xs font-mono text-[#06B6D4] uppercase tracking-wider mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#6366F1] animate-ping" />
              <span className="font-semibold text-white">Learning &amp; Technology Path</span>
            </div>
            <span className="text-[#94A3B8] text-[11px] normal-case">
              Bridging solid Python foundations to modern AI-assisted workflows
            </span>
          </div>

          {/* Animated Path Nodes */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-mono">
            {pathSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="relative group/node">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-[#F8FAFC] text-[11px] sm:text-xs font-medium hover:border-[#6366F1]/60 hover:text-white transition-all shadow-sm hover:shadow-[0_0_12px_rgba(99,102,241,0.25)] hover:scale-[1.03]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/80 group-hover/node:bg-[#06B6D4] transition-colors" />
                    {step}
                  </span>
                </div>
                {idx < pathSteps.length - 1 && (
                  <span className="text-[#6366F1] font-bold text-xs px-0.5 select-none animate-pulse">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Honest Framing Context Banner */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-5 rounded-2xl bg-[#0D1117]/90 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#6366F1] to-[#06B6D4]" />
          <div className="space-y-1.5 pl-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
                Transparent Developer Framing
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed max-w-4xl">
              I understand these concepts and apply them in my projects (such as the <strong className="text-[#818CF8] font-semibold">AI Resume Reviewer</strong> above) using AI-assisted tools and workflows — rather than claiming to hand-write these systems from scratch or asserting expert-level independent AI engineering experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0 pl-2 md:pl-0">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/30 whitespace-nowrap">
              Applied via AI-Assisted Development
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 whitespace-nowrap">
              Familiar With
            </span>
          </div>
        </div>

        {/* Focus Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl p-5 border border-white/5 hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0D1117] border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border text-center ${getStatusBadge(
                        card.status
                      )}`}
                    >
                      {card.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>

                {card.proof && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#06B6D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span className="truncate">{card.proof}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
