import React, { useRef, useEffect, useCallback, useState } from 'react';
import qt2Video from '../assets/qt2.mov';

const SCROLL_PAUSE_DELAY_MS = 150;

interface ContentSection {
  left: string;
  leftDesc: string;
  right: string;
  rightDesc: string;
  icon: string;
}

const SECTIONS: ContentSection[] = [
  {
    left: 'Create job tickets',
    leftDesc:
      'Voice-to-ticket technology lets technicians create detailed work orders hands-free. Just speak and QuickTicketAI captures everything.',
    right: 'AI-powered automation',
    rightDesc:
      'ClerkAI assistant helps fill in details, suggests parts, and learns from your workflow patterns.',
    icon: '🎙️',
  },
  {
    left: 'Real-time dispatch',
    leftDesc:
      "Assign tickets to technicians instantly. See who's available, their location, and current workload at a glance.",
    right: 'Live tracking',
    rightDesc:
      'Monitor job progress in real time. Get notified when work starts, pauses, or completes.',
    icon: '📍',
  },
  {
    left: 'Professional invoices',
    leftDesc:
      'Generate invoices directly from completed tickets. Labor, parts, and travel time calculated automatically.',
    right: 'QuickPay integration',
    rightDesc:
      'Send invoices and collect payments faster. Track billing history and outstanding balances.',
    icon: '📄',
  },
  {
    left: 'Team management',
    leftDesc:
      'Manage technicians, managers, and customers from one dashboard. Role-based access keeps data secure.',
    right: 'Analytics & insights',
    rightDesc:
      'Revenue trends, technician performance, and customer metrics help you make smarter decisions.',
    icon: '📊',
  },
];

export const Animation1: React.FC = () => {
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
        return (
          rect.top < containerRect.bottom - 100 &&
          rect.bottom > containerRect.top + 100
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
        </div>
      </div>

      <div className="relative z-10">
        <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 py-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm tracking-tight">
            QuickTicketAI in Action
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl font-light">
            The complete field service management platform
          </p>
          <div className="flex items-center gap-3 text-base text-gray-500 animate-bounce">
            <span className="text-xl">↓</span>
            <span className="font-medium">Scroll to explore</span>
            <span className="text-xl">↓</span>
          </div>
        </section>

        {SECTIONS.map((section, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el as HTMLDivElement | null;
            }}
            className="min-h-[60vh] flex items-center py-16 px-6"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
              <div
                className={`transition-all duration-700 ease-out ${
                  visibleSections[index]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.left}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {section.leftDesc}
                  </p>
                </div>
              </div>

              <div
                className={`flex justify-center transition-all duration-500 delay-100 ${
                  visibleSections[index]
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-50'
                }`}
              >
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-4xl lg:text-5xl shadow-2xl ring-4 ring-white/50">
                  {section.icon}
                </div>
              </div>

              <div
                className={`transition-all duration-700 ease-out delay-200 ${
                  visibleSections[index]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.right}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {section.rightDesc}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="min-h-[40vh] flex items-center justify-center text-center px-8 py-16">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-[2rem] p-10 lg:p-14 max-w-3xl shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
              Experience the future of field service
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-white text-base lg:text-lg font-medium">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors cursor-default">
                ✓ Job Tickets
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors cursor-default">
                ✓ ClerkAI
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors cursor-default">
                ✓ Invoices
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors cursor-default">
                ✓ Analytics
              </span>
            </div>
          </div>
        </section>

        <div className="h-32" />
      </div>
    </div>
  );
};
