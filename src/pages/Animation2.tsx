import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import qt2Video from '../assets/qt2.mov';
import { useVideoScrub } from '../hooks/useVideoScrub';

gsap.registerPlugin(ScrollTrigger);

interface ContentSection {
  title: string;
  highlight: string;
  desc: string;
  position: 'left' | 'right';
}

const SECTIONS: ReadonlyArray<ContentSection> = [
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
] as const;

export const Animation2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useVideoScrub({
    videoRef,
    scrollerRef: containerRef,
    contentRef,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((sectionEl, i) => {
        if (!sectionEl) return;
        const textBlock = sectionEl.querySelector('[data-anim="text"]');
        if (!textBlock) return;

        const isLeft = SECTIONS[i].position === 'left';

        gsap.fromTo(
          textBlock,
          { opacity: 0, x: isLeft ? -60 : 60, y: 30, force3D: true },
          {
            opacity: 1,
            x: 0,
            y: 0,
            force3D: true,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              scroller: container,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1.2,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

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
            className="w-full h-full object-cover will-change-auto"
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10">
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-8 py-16">
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
            className="min-h-[70vh] flex items-center py-16 px-6 lg:px-12"
          >
            <div
              className={`max-w-4xl w-full ${
                section.position === 'left'
                  ? 'mr-auto text-left'
                  : 'ml-auto text-right'
              }`}
            >
              <div
                data-anim="text"
                className={`max-w-lg will-change-transform ${
                  section.position === 'left' ? '' : 'ml-auto'
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
