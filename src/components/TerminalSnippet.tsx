import React, { useEffect, useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';

interface CodeLine {
  text: string;
  tokens?: { text: string; color: string }[];
}

const SCRIPT_LINES: CodeLine[] = [
  {
    text: 'from django.urls import path, include',
    tokens: [
      { text: 'from', color: 'text-[#C98F2B]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'django.urls', color: 'text-[#87B5E0]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'import', color: 'text-[#C98F2B]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'path, include', color: 'text-slate-100' },
    ],
  },
  {
    text: 'from rest_framework import routers',
    tokens: [
      { text: 'from', color: 'text-[#C98F2B]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'rest_framework', color: 'text-[#87B5E0]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'import', color: 'text-[#C98F2B]' },
      { text: ' ', color: 'text-slate-300' },
      { text: 'routers', color: 'text-amber-200' },
    ],
  },
  {
    text: 'router.register(r"posts", BlogPostViewSet)',
    tokens: [
      { text: 'router', color: 'text-slate-100' },
      { text: '.', color: 'text-slate-400' },
      { text: 'register', color: 'text-[#87B5E0]' },
      { text: '(', color: 'text-slate-300' },
      { text: 'r"posts"', color: 'text-[#97C875]' },
      { text: ', ', color: 'text-slate-300' },
      { text: 'BlogPostViewSet', color: 'text-amber-200' },
      { text: ')', color: 'text-slate-300' },
    ],
  },
  {
    text: '# Django 5.x • PostgreSQL • REST API ready',
    tokens: [
      { text: '# Django 5.x • PostgreSQL • REST API ready', color: 'text-slate-500 italic' },
    ],
  },
];

export const TerminalSnippet: React.FC = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isDone) return;

    const currentLine = SCRIPT_LINES[currentLineIndex];
    if (displayedChars < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedChars((prev) => prev + 1);
      }, 42 + Math.random() * 25);
      return () => clearTimeout(timeout);
    } else {
      // Completed line
      if (currentLineIndex < SCRIPT_LINES.length - 1) {
        const linePause = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedChars(0);
        }, 360);
        return () => clearTimeout(linePause);
      } else {
        setIsDone(true);
      }
    }
  }, [currentLineIndex, displayedChars, isDone]);

  const handleRestart = () => {
    setCurrentLineIndex(0);
    setDisplayedChars(0);
    setIsDone(false);
  };

  const handleCopyCode = () => {
    const raw = SCRIPT_LINES.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render partial tokenized line
  const renderPartialLine = (tokens: { text: string; color: string }[], charLimit: number) => {
    let charsUsed = 0;
    return tokens.map((tok, idx) => {
      if (charsUsed >= charLimit) return null;
      const remaining = charLimit - charsUsed;
      const slice = tok.text.slice(0, remaining);
      charsUsed += tok.text.length;
      return (
        <span key={idx} className={tok.color}>
          {slice}
        </span>
      );
    });
  };

  return (
    <div
      id="terminal-snippet"
      className="relative w-full max-w-lg bg-[#141A22] text-slate-200 border border-slate-700/40 rounded-lg shadow-sm font-mono text-[13px] overflow-hidden"
    >
      {/* Terminal window header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#10151D] border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E06C75]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#98C379]/70" />
          <span className="ml-2 text-xs text-slate-400 font-sans tracking-normal select-none">
            pipeline.py
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            type="button"
            onClick={handleRestart}
            title="Replay code animation"
            className="p-1 rounded hover:text-slate-200 hover:bg-slate-800/60 transition-colors focus-visible:ring-1 focus-visible:ring-[#2E6DA4] focus-visible:outline-none"
            aria-label="Replay typing snippet"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy snippet"
            className="p-1 rounded hover:text-slate-200 hover:bg-slate-800/60 transition-colors focus-visible:ring-1 focus-visible:ring-[#2E6DA4] focus-visible:outline-none"
            aria-label="Copy snippet"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="text-[11px] font-sans px-1">copy</span>
            )}
          </button>
        </div>
      </div>

      {/* Terminal code lines body */}
      <div className="p-4 space-y-1.5 leading-relaxed min-h-[148px]">
        {SCRIPT_LINES.map((line, idx) => {
          if (idx > currentLineIndex) return null;

          const isCurrent = idx === currentLineIndex;
          const limit = isCurrent ? displayedChars : line.text.length;

          return (
            <div key={idx} className="flex items-baseline">
              <span className="select-none text-slate-600 w-6 text-right mr-3 text-xs">
                {idx + 1}
              </span>
              <div className="flex-1 whitespace-pre">
                {line.tokens ? renderPartialLine(line.tokens, limit) : line.text.slice(0, limit)}
                {isCurrent && (
                  <span className="inline-block w-2 h-4 ml-0.5 align-middle bg-[#C98F2B] animate-pulse" />
                )}
              </div>
            </div>
          );
        })}

        {isDone && (
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 select-none">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>environment: python 3.12 • django 5.x • postgresql • rest framework</span>
          </div>
        )}
      </div>
    </div>
  );
};
