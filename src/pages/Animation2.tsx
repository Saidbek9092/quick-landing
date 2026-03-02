import React, { useRef, useEffect, useCallback, useState } from 'react';
import qt2Video from '../assets/qt2.mov';

const SCROLL_PAUSE_DELAY_MS = 150;

interface ContentSection {
  title: string;
  highlight: string;
  desc: string;
  position: 'left' | 'right';
}

const SECTIONS: ContentSection[] = [
  {
    title: 'Voice-powered ticket creation',
    highlight: 'with AI transcription',
    desc: '— featuring real-time speech recognition that captures every detail. Technicians speak naturally and QuickTicketAI transforms their words into structured job tickets, so you never miss important information.',
    position: 'left',
  },
  {
    title: 'A custom-built workflow',
    highlight: 'engine',
    desc: 'works with ClerkAI to create intelligent automation, with smart suggestions during ticket creation and invoice generation.',
    position: 'right',
  },
  {
    title: 'Real-time dispatch',
    highlight: 'and tracking',
    desc: '— see technician locations, job status, and time tracking at a glance. Managers stay informed with live updates while technicians focus on the work.',
    position: 'left',
  },
  {
    title: 'Professional invoicing',
    highlight: 'in seconds',
    desc: '— generate detailed invoices directly from completed tickets. Labor hours, parts, and travel time calculated automatically with QuickPay integration.',
    position: 'right',
  },
  {
    title: 'Team collaboration',
    highlight: 'made simple',
    desc: '— managers assign jobs, technicians update status, and customers receive notifications. Everyone stays connected with real-time sync across all devices.',
    position: 'left',
  },
  {
    title: 'Powerful analytics',
    highlight: 'at your fingertips',
    desc: '— track revenue trends, technician performance, and customer satisfaction. Make data-driven decisions with comprehensive dashboards and reports.',
    position: 'right',
  },
  {
    title: 'Mobile-first design',
    highlight: 'for field teams',
    desc: '— works seamlessly on any device. Technicians can create tickets, capture photos, and collect signatures right from their phone or tablet.',
    position: 'left',
  },
  {
    title: 'Secure and reliable',
    highlight: 'cloud platform',
    desc: '— your data is protected with enterprise-grade security. Automatic backups, role-based access, and audit logs keep your business safe.',
    position: 'right',
  },
];

export const Animation2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(SECTIONS.length).fill(false)
  );

  const playVideo = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      playVideo();
      scrollTimeoutRef.current = setTimeout(() => {
        pauseVideo();
        scrollTimeoutRef.current = null;
      }, SCROLL_PAUSE_DELAY_MS);

      const newVisible = sectionRefs.current.map((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const containerCenter =
          containerRect.top + containerRect.height / 2;
        return (
          rect.top < containerCenter + 100 &&
          rect.bottom > containerCenter - 100
        );
      });
      setVisibleSections(newVisible);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [playVideo, pauseVideo]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden relative"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={qt2Video}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>
      </div>

      <div className="relative z-10">
        <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 py-16">
          <p className="text-lg text-white/70 mb-2 tracking-wide uppercase">
            QuickTicketAI
          </p>
          <h1 className="text-4xl lg:text-6xl font-semibold text-white mb-6 tracking-tight drop-shadow-lg">
            The sound of productivity
          </h1>
          <div className="flex items-center gap-3 text-base text-white/60 animate-bounce mt-4">
            <span className="text-xl">↓</span>
            <span>Scroll to explore</span>
            <span className="text-xl">↓</span>
          </div>
        </section>

        {SECTIONS.map((section, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el as HTMLDivElement | null;
            }}
            className="min-h-[60vh] flex items-center py-16 px-6 lg:px-12"
          >
            <div
              className={`max-w-4xl w-full ${
                section.position === 'left'
                  ? 'mr-auto text-left'
                  : 'ml-auto text-right'
              }`}
            >
              <div
                className={`max-w-lg transition-all duration-1000 ease-out ${
                  section.position === 'left' ? '' : 'ml-auto'
                } ${
                  visibleSections[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-2xl lg:text-3xl leading-relaxed">
                  <span className="font-semibold text-white drop-shadow-md">
                    {section.title}
                  </span>{' '}
                  <span className="text-white/70">{section.highlight}</span>{' '}
                  <span className="text-white/80 font-light">
                    {section.desc}
                  </span>
                </p>
              </div>
            </div>
          </section>
        ))}

        <div className="h-48" />
      </div>
    </div>
  );
};
