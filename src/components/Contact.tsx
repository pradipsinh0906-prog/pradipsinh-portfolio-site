import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  RotateCcw,
  Clock,
  Trash2,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SavedInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sendMethod, setSendMethod] = useState<'gmail' | 'mailto' | 'copy'>('gmail');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<SavedInquiry | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('portfolio_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveInquiryToStorage = (inquiry: SavedInquiry) => {
    try {
      const updated = [inquiry, ...savedInquiries];
      setSavedInquiries(updated);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const clearInquiries = () => {
    setSavedInquiries([]);
    try {
      localStorage.removeItem('portfolio_inquiries');
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  const deleteInquiry = (id: string) => {
    const updated = savedInquiries.filter((item) => item.id !== id);
    setSavedInquiries(updated);
    try {
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update localStorage', e);
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide a message or inquiry';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructLinks = (data: { name: string; email: string; subject: string; message: string }) => {
    const subjectLine = data.subject.trim() || `Portfolio Inquiry from ${data.name.trim()}`;
    const bodyContent = `Hi Pradipsinh,\n\n${data.message.trim()}\n\n---\nSender: ${data.name.trim()}\nContact Email: ${data.email.trim()}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PERSONAL_INFO.email
    )}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(bodyContent)}`;

    const fullText = `To: ${PERSONAL_INFO.email}\nSubject: ${subjectLine}\nFrom: ${data.name} <${data.email}>\n\n${data.message}`;

    return { subjectLine, bodyContent, gmailUrl, mailtoUrl, fullText };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const { subjectLine, gmailUrl, mailtoUrl, fullText } = constructLinks(formData);

    const newInquiry: SavedInquiry = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: subjectLine,
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    saveInquiryToStorage(newInquiry);
    setLastSubmitted(newInquiry);
    setIsSubmitting(false);

    // CRITICAL: Synchronously trigger client dispatch so browsers/iframes do not block as popup
    if (sendMethod === 'gmail') {
      const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        // Fallback if popup blocker intercepted
        const link = document.createElement('a');
        link.href = gmailUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else if (sendMethod === 'mailto') {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_top';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (sendMethod === 'copy') {
      navigator.clipboard.writeText(fullText);
      setCopiedField('submitted-copy');
      setTimeout(() => setCopiedField(null), 3000);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const resetForm = () => {
    setLastSubmitted(null);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-14 sm:py-16 md:py-24 lg:py-28 bg-[#080B12] relative scroll-mt-20 overflow-hidden">
      {/* Top subtle gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-semibold">
            <span className="text-[#06B6D4]">//</span>
            <span>CONTACT</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F8FAFC]">
            Let's Build Something Intelligent
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl">
            Open to opportunities in Python, Django, AI/ML and LLM application development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-[#F8FAFC]">
                  Contact Coordinates
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Reach out directly via email, phone, or professional networks.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3.5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col lg:space-y-3.5 sm:gap-3.5 sm:space-y-0">
                
                {/* Email Card */}
                <div className="p-4 rounded-xl bg-[#0D1117] border border-white/5 flex items-center justify-between gap-3 group hover:border-[#6366F1]/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Email</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-[#F8FAFC] hover:text-[#6366F1] transition-colors truncate block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-xl bg-[#0D1117] border border-white/5 flex items-center justify-between gap-3 group hover:border-[#06B6D4]/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Direct Phone</div>
                      <a
                        href={PERSONAL_INFO.phoneHref}
                        className="text-xs sm:text-sm font-semibold text-[#F8FAFC] hover:text-[#06B6D4] transition-colors truncate block"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors shrink-0"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-xl bg-[#0D1117] border border-white/5 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Profiles Row */}
              <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D1117] hover:bg-[#111827] border border-white/10 text-xs font-semibold text-[#F8FAFC] hover:border-[#6366F1]/40 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#6366F1]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D1117] hover:bg-[#111827] border border-white/10 text-xs font-semibold text-[#F8FAFC] hover:border-white/30 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Dispatch */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 relative glow-border">
              
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#F8FAFC] tracking-tight">
                    Send a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                    Have an opportunity or project in mind? Reach out directly.
                  </p>
                </div>

                {savedInquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowHistoryModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#06B6D4] bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 border border-[#06B6D4]/20 transition-colors shrink-0"
                    title="View inquiries stored on this device"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Inquiries ({savedInquiries.length})</span>
                  </button>
                )}
              </div>

              {lastSubmitted ? (
                /* Success & Delivery Actions Card */
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-emerald-200">
                          Inquiry Prepared &amp; Saved Successfully!
                        </h4>
                        <p className="text-xs text-emerald-300/80 leading-relaxed">
                          Your message has been archived. You can open it directly in Gmail, launch your system email app, or copy the formatted text below.
                        </p>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <div className="mt-3 p-3.5 rounded-lg bg-[#080B12]/80 border border-white/5 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[#94A3B8] font-mono text-[11px] pb-2 border-b border-white/5">
                        <span>To: <strong className="text-white">{PERSONAL_INFO.email}</strong></span>
                        <span>From: <strong className="text-white">{lastSubmitted.name}</strong> ({lastSubmitted.email})</span>
                      </div>
                      <div className="font-semibold text-white text-xs">
                        Subject: {lastSubmitted.subject}
                      </div>
                      <div className="text-[#CBD5E1] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto bg-black/20 p-2.5 rounded">
                        {lastSubmitted.message}
                      </div>
                    </div>
                  </div>

                  {/* Immediate Dispatch Options */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Delivery Channels
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={constructLinks(lastSubmitted).gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-95 shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Gmail (Web)</span>
                      </a>

                      <a
                        href={constructLinks(lastSubmitted).mailtoUrl}
                        target="_top"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#06B6D4]" />
                        <span>Open in Mail Client</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(constructLinks(lastSubmitted).fullText, 'last-full')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#0D1117] hover:bg-[#111827] border border-white/5 transition-colors"
                    >
                      {copiedField === 'last-full' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Formatted Message Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Formatted Message to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/5">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 text-xs text-[#06B6D4] hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send another message</span>
                    </button>

                    <span className="text-[11px] font-mono text-[#94A3B8]">
                      Logged at {lastSubmitted.timestamp}
                    </span>
                  </div>
                </div>
              ) : (
                /* Interactive Input Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Henderson"
                        className={`w-full px-4 py-3 rounded-xl bg-[#0D1117] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:ring-1 transition-all ${
                          errors.name
                            ? 'border-rose-500/60 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#0D1117] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:ring-1 transition-all ${
                          errors.email
                            ? 'border-rose-500/60 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                      Subject <span className="text-[#94A3B8]/60 font-sans text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Django Backend Project / Full-time Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, role, or inquiry..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#0D1117] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500/60 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#6366F1] focus:ring-[#6366F1]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                  </div>

                  {/* Delivery Preference Selector */}
                  <div className="pt-2">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                      Preferred Send Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSendMethod('gmail')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          sendMethod === 'gmail'
                            ? 'bg-[#6366F1]/15 border-[#6366F1] text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                            : 'bg-[#0D1117] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#6366F1]" />
                        <span>Gmail (Web)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSendMethod('mailto')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          sendMethod === 'mailto'
                            ? 'bg-[#06B6D4]/15 border-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                            : 'bg-[#0D1117] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
                        <span>Mail App</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSendMethod('copy')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          sendMethod === 'copy'
                            ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                            : 'bg-[#0D1117] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>Copy Only</span>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#8B5CF6] hover:opacity-95 shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Preparing Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {sendMethod === 'gmail' && 'Open in Gmail & Send'}
                          {sendMethod === 'mailto' && 'Open in Mail Client'}
                          {sendMethod === 'copy' && 'Copy Message to Clipboard'}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#94A3B8]/70 text-center font-mono pt-1">
                    Direct recipient: <span className="text-[#06B6D4]">{PERSONAL_INFO.email}</span>
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Inquiries History Modal */}
      {showHistoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0D1117] border border-white/15 p-6 space-y-4 text-[#F8FAFC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold font-display">
                <Inbox className="w-4 h-4 text-[#06B6D4]" />
                <span>Saved Inquiries Archive</span>
              </div>
              <div className="flex items-center gap-2">
                {savedInquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearInquiries}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className="px-2 py-1 rounded text-xs text-[#94A3B8] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

            {savedInquiries.length === 0 ? (
              <p className="text-xs text-[#94A3B8] py-8 text-center">
                No saved inquiries found on this device.
              </p>
            ) : (
              <div className="space-y-3">
                {savedInquiries.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-white">{item.subject}</div>
                        <div className="text-[11px] font-mono text-[#06B6D4]">
                          From: {item.name} ({item.email})
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#94A3B8]">
                          {item.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteInquiry(item.id)}
                          className="p-1 rounded text-[#94A3B8] hover:text-rose-400 hover:bg-white/5 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#CBD5E1] whitespace-pre-wrap bg-black/30 p-2.5 rounded">
                      {item.message}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={constructLinks(item).gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#6366F1] hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open in Gmail</span>
                      </a>
                      <span className="text-[#94A3B8]">•</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(constructLinks(item).fullText, item.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#06B6D4] hover:underline"
                      >
                        {copiedField === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
