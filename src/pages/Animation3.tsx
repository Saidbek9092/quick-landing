import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import qt2Video from '../assets/qt2.mov';
import { useVideoScrub } from '../hooks/useVideoScrub';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  readonly value: string;
  readonly label: string;
}

interface FeatureSection {
  readonly badge: string;
  readonly title: string;
  readonly highlight: string;
  readonly desc: string;
  readonly position: 'left' | 'right';
  readonly stats: ReadonlyArray<StatItem>;
  readonly tags: ReadonlyArray<string>;
  readonly icon: string;
}

const SECTIONS: ReadonlyArray<FeatureSection> = [
  {
    badge: 'AI-Powered',
    title: 'Voice-powered ticket creation',
    highlight: 'with AI transcription',
    desc: 'Real-time speech recognition that captures every detail. Technicians speak naturally and QuickTicketAI transforms their words into structured job tickets with 99.2% accuracy.',
    position: 'left',
    stats: [
      { value: '99.2%', label: 'Accuracy' },
      { value: '3x', label: 'Faster' },
      { value: '0', label: 'Typos' },
    ],
    tags: ['Speech-to-Text', 'NLP Processing', 'Auto-categorize'],
    icon: '🎙️',
  },
  {
    badge: 'Automation',
    title: 'Intelligent workflow engine',
    highlight: 'powered by ClerkAI',
    desc: 'Custom-built automation that learns from your patterns. Smart suggestions during ticket creation, automatic parts lookup, and predictive scheduling that saves hours every week.',
    position: 'right',
    stats: [
      { value: '85%', label: 'Auto-filled' },
      { value: '12hrs', label: 'Saved/week' },
      { value: '40+', label: 'Integrations' },
    ],
    tags: ['Smart Suggestions', 'Auto-complete', 'Predictive'],
    icon: '🤖',
  },
  {
    badge: 'Real-Time',
    title: 'Live dispatch & GPS tracking',
    highlight: 'with smart routing',
    desc: 'See every technician on a real-time map. Intelligent routing reduces drive time by 23%. Automatic ETAs keep customers informed and managers in control of the entire fleet.',
    position: 'left',
    stats: [
      { value: '23%', label: 'Less drive time' },
      { value: 'Live', label: 'GPS tracking' },
      { value: '< 1s', label: 'Update latency' },
    ],
    tags: ['GPS Tracking', 'Route Optimization', 'Auto-ETA'],
    icon: '📍',
  },
  {
    badge: 'Billing',
    title: 'One-tap professional invoicing',
    highlight: 'with QuickPay',
    desc: 'Generate branded invoices directly from completed tickets. Labor hours, parts, and travel time calculated automatically. Customers pay instantly through secure payment links.',
    position: 'right',
    stats: [
      { value: '67%', label: 'Faster payment' },
      { value: '$0', label: 'Processing fee' },
      { value: '100%', label: 'Accurate' },
    ],
    tags: ['Auto-calculate', 'Payment Links', 'Tax-ready'],
    icon: '💳',
  },
  {
    badge: 'Collaboration',
    title: 'Seamless team communication',
    highlight: 'across every role',
    desc: 'Managers assign and monitor. Technicians update and report. Customers receive notifications and approve work. Real-time sync ensures everyone has the latest information on every device.',
    position: 'left',
    stats: [
      { value: '3', label: 'User roles' },
      { value: 'Instant', label: 'Sync' },
      { value: '∞', label: 'Team members' },
    ],
    tags: ['Role-based', 'Push Notifications', 'Activity Feed'],
    icon: '👥',
  },
  {
    badge: 'Analytics',
    title: 'Revenue & performance dashboards',
    highlight: 'with deep insights',
    desc: 'Track revenue trends, technician utilization, and customer satisfaction scores. Exportable reports, custom date ranges, and AI-powered anomaly detection help you grow faster.',
    position: 'right',
    stats: [
      { value: '15+', label: 'Report types' },
      { value: 'AI', label: 'Anomaly alerts' },
      { value: 'CSV', label: 'Export' },
    ],
    tags: ['Revenue Tracking', 'KPI Dashboards', 'Trend Analysis'],
    icon: '📊',
  },
  {
    badge: 'Mobile',
    title: 'Field-ready mobile experience',
    highlight: 'built for tough conditions',
    desc: 'Works offline in basements and rural areas. Capture photos, collect e-signatures, scan barcodes, and log time — all from a pocket-sized interface optimized for gloved hands.',
    position: 'left',
    stats: [
      { value: '100%', label: 'Offline capable' },
      { value: 'iOS+', label: 'Android' },
      { value: '4.9★', label: 'App rating' },
    ],
    tags: ['Offline Mode', 'Photo Capture', 'E-signatures'],
    icon: '📱',
  },
  {
    badge: 'Enterprise',
    title: 'Bank-grade security & compliance',
    highlight: 'you can trust',
    desc: 'SOC 2 Type II certified. End-to-end encryption, role-based access controls, automatic backups every 15 minutes, and detailed audit logs for complete regulatory compliance.',
    position: 'right',
    stats: [
      { value: 'SOC 2', label: 'Certified' },
      { value: '256-bit', label: 'Encryption' },
      { value: '99.99%', label: 'Uptime' },
    ],
    tags: ['SOC 2', 'HIPAA Ready', 'GDPR Compliant'],
    icon: '🔒',
  },
  {
    badge: 'Integration',
    title: 'Connect your entire tech stack',
    highlight: 'in minutes',
    desc: 'Pre-built integrations with QuickBooks, Salesforce, Slack, and 40+ more tools. RESTful API and webhooks let you build custom workflows that fit your exact business needs.',
    position: 'left',
    stats: [
      { value: '40+', label: 'Integrations' },
      { value: 'REST', label: 'API' },
      { value: '< 5min', label: 'Setup time' },
    ],
    tags: ['QuickBooks', 'Salesforce', 'Webhooks'],
    icon: '🔗',
  },
  {
    badge: 'Support',
    title: 'White-glove onboarding',
    highlight: '& 24/7 support',
    desc: 'Dedicated success manager for your first 90 days. Free data migration, custom training sessions, and round-the-clock support so your team is productive from day one.',
    position: 'right',
    stats: [
      { value: '< 2min', label: 'Response time' },
      { value: 'Free', label: 'Migration' },
      { value: '98%', label: 'CSAT score' },
    ],
    tags: ['24/7 Support', 'Data Migration', 'Training'],
    icon: '🛟',
  },
] as const;

const HERO_STATS: ReadonlyArray<StatItem> = [
  { value: '10,000+', label: 'Tickets created daily' },
  { value: '500+', label: 'Service companies' },
  { value: '99.99%', label: 'Platform uptime' },
  { value: '4.9/5', label: 'Customer rating' },
] as const;

export const Animation3: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useVideoScrub({
    videoRef,
    scrollerRef: containerRef,
    contentRef,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('[data-hero]');
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 40, force3D: true },
          {
            opacity: 1,
            y: 0,
            force3D: true,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              scroller: container,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1.2,
            },
          }
        );
      }

      sectionRefs.current.forEach((sectionEl, i) => {
        if (!sectionEl) return;

        const card = sectionEl.querySelector('[data-anim="card"]');
        const iconEl = sectionEl.querySelector('[data-anim="icon"]');
        const statsEl = sectionEl.querySelectorAll('[data-anim="stat"]');
        const tagsEl = sectionEl.querySelectorAll('[data-anim="tag"]');

        const isLeft = SECTIONS[i].position === 'left';

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -100 : 100, rotateY: isLeft ? -8 : 8, force3D: true },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              force3D: true,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionEl,
                scroller: container,
                start: 'top 85%',
                end: 'top 25%',
                scrub: 1.2,
              },
            }
          );
        }

        if (iconEl) {
          gsap.fromTo(
            iconEl,
            { opacity: 0, scale: 0, rotation: -180, force3D: true },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              force3D: true,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: sectionEl,
                scroller: container,
                start: 'top 80%',
                end: 'top 35%',
                scrub: 1.2,
              },
            }
          );
        }

        if (statsEl.length > 0) {
          gsap.fromTo(
            statsEl,
            { opacity: 0, y: 20, force3D: true },
            {
              opacity: 1,
              y: 0,
              force3D: true,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionEl,
                scroller: container,
                start: 'top 70%',
                end: 'top 25%',
                scrub: 1.2,
              },
            }
          );
        }

        if (tagsEl.length > 0) {
          gsap.fromTo(
            tagsEl,
            { opacity: 0, scale: 0.8, force3D: true },
            {
              opacity: 1,
              scale: 1,
              force3D: true,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionEl,
                scroller: container,
                start: 'top 65%',
                end: 'top 20%',
                scrub: 1.2,
              },
            }
          );
        }
      });

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 60, scale: 0.95, force3D: true },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            force3D: true,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              scroller: container,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.2,
            },
          }
        );
      }
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10">
        {/* Hero */}
        <section
          ref={heroRef}
          className="min-h-[90vh] flex flex-col items-center justify-center text-center px-8 py-20"
        >
          <div
            data-hero
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              Trusted by 500+ service companies
            </span>
          </div>

          <h1
            data-hero
            className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight"
          >
            Field service
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              reimagined
            </span>
          </h1>

          <p
            data-hero
            className="text-xl lg:text-2xl text-white/70 mb-12 max-w-2xl font-light leading-relaxed"
          >
            From voice-powered tickets to instant invoicing — QuickTicketAI
            automates your entire workflow so your team can focus on what
            matters.
          </p>

          <div
            data-hero
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4"
              >
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div
            data-hero
            className="flex items-center gap-3 text-base text-white/40 animate-bounce mt-4"
          >
            <span className="text-xl">↓</span>
            <span className="font-medium">Scroll to explore features</span>
            <span className="text-xl">↓</span>
          </div>
        </section>

        {/* Feature Sections */}
        {SECTIONS.map((section, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el as HTMLDivElement | null;
            }}
            className="min-h-[80vh] flex items-center py-20 px-6 lg:px-16"
          >
            <div
              className={`max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                section.position === 'right'
                  ? 'ml-auto lg:flex-row-reverse'
                  : 'mr-auto'
              }`}
            >
              <div
                data-anim="icon"
                className="shrink-0 will-change-transform"
              >
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl lg:text-6xl shadow-2xl">
                  {section.icon}
                </div>
              </div>

              <div
                data-anim="card"
                className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-[2rem] p-8 lg:p-10 max-w-2xl w-full shadow-2xl will-change-transform"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {section.badge}
                  </span>
                  <span className="text-white/30 text-sm">
                    Feature {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h2
                  className={`text-2xl lg:text-3xl leading-snug mb-4 ${
                    section.position === 'right' ? 'lg:text-left' : ''
                  }`}
                >
                  <span className="font-bold text-white">{section.title}</span>{' '}
                  <span className="text-cyan-300/80 font-medium">
                    {section.highlight}
                  </span>
                </h2>

                <p className="text-base lg:text-lg text-white/60 leading-relaxed mb-8">
                  {section.desc}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {section.stats.map((stat) => (
                    <div
                      key={stat.label}
                      data-anim="stat"
                      className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-center will-change-transform"
                    >
                      <div className="text-xl lg:text-2xl font-bold text-white mb-0.5">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      data-anim="tag"
                      className="bg-white/[0.08] border border-white/[0.1] text-white/60 text-xs font-medium px-3 py-1.5 rounded-full will-change-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="min-h-[60vh] flex items-center justify-center text-center px-8 py-20">
          <div
            ref={ctaRef}
            className="bg-gradient-to-br from-blue-600/90 via-cyan-600/80 to-emerald-600/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-12 lg:p-16 max-w-4xl w-full shadow-2xl will-change-transform"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to transform your
              <br />
              field operations?
            </h2>
            <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
              Join 500+ service companies already using QuickTicketAI to boost
              productivity, reduce errors, and get paid faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button className="bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer">
                Start Free Trial
              </button>
              <button className="bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl text-lg hover:bg-white/20 transition-all duration-200 cursor-pointer">
                Book a Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Cancel anytime
              </span>
            </div>
          </div>
        </section>

        <div className="h-32" />
      </div>
    </div>
  );
};
