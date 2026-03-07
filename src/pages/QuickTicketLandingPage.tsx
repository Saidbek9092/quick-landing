import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import checkCircleSvg from '../assets/check-circle.svg';
import iconMicrophone from '../assets/icons/icon-microphone.svg';
import iconGlobe from '../assets/icons/icon-globe.svg';
import iconDocument from '../assets/icons/icon-document.svg';
import iconSync from '../assets/icons/icon-sync.svg';
import iconStars from '../assets/icons/icon-stars.svg';
import iconCloud from '../assets/icons/icon-cloud.svg';
import iconTicket from '../assets/icons/icon-ticket.svg';
import iconChart from '../assets/icons/icon-chart.svg';
import iconGraph from '../assets/icons/icon-graph.svg';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  readonly heading: string;
  readonly supporting: string;
  readonly checkItems: ReadonlyArray<string>;
  readonly position: 'left' | 'right';
}

interface GridFeature {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

const FEATURE_CARDS: ReadonlyArray<FeatureCard> = [
  {
    heading: 'Convert jobs to invoices',
    supporting:
      'Automatically prepare invoice-ready summaries from completed job tickets and approved work.',
    checkItems: [
      'Generate invoice-ready job data',
      'Reduce billing mistakes and missing information',
      'Speed up approval and billing cycles',
    ],
    position: 'left',
  },
  {
    heading: 'Monitor jobs and teams live',
    supporting:
      'Follow every job from creation to completion with live updates from your field technicians.',
    checkItems: [
      'Live job status and progress updates',
      'Technician activity and assignment tracking',
      'Instant notifications for changes and approvals',
    ],
    position: 'right',
  },
] as const;

const GRID_FEATURES: ReadonlyArray<GridFeature> = [
  {
    title: 'Voice Ticketing',
    description:
      'Log job tickets hands-free using AI voice capture — ideal for technicians on site.',
    icon: iconMicrophone,
  },
  {
    title: 'Multilingual Support',
    description:
      'Create and review tickets in multiple languages for global and distributed teams.',
    icon: iconGlobe,
  },
  {
    title: 'Automated Invoicing',
    description:
      'Generate invoice-ready data directly from approved job tickets.',
    icon: iconDocument,
  },
  {
    title: 'Real-Time Sync',
    description:
      'Keep all ticket data instantly synced across devices, teams, and roles.',
    icon: iconSync,
  },
  {
    title: 'AI-Powered Insights',
    description:
      'Understand job trends, technician performance, and billing accuracy with AI analytics.',
    icon: iconStars,
  },
  {
    title: 'Secure Cloud Storage',
    description:
      'Protect your data with encryption, backups, and role-based access control.',
    icon: iconCloud,
  },
  {
    title: 'Manual Ticketing',
    description:
      'Create and edit tickets manually when voice input is not available.',
    icon: iconTicket,
  },
  {
    title: 'Dashboard Reporting',
    description:
      'View operational and financial performance in one unified dashboard.',
    icon: iconChart,
  },
  {
    title: 'High Volume Ready',
    description:
      'Built to support large teams and high job volumes with scalable infrastructure.',
    icon: iconGraph,
  },
] as const;

interface NavLink {
  readonly label: string;
  readonly target: 'how-it-works' | 'features';
}

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { label: 'How it works', target: 'how-it-works' },
  { label: 'Features', target: 'features' },
] as const;

const CheckIcon: React.FC = () => (
  <img src={checkCircleSvg} alt="" width={24} height={24} className="shrink-0" />
);

export const QuickTicketLandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuresHeaderRef = useRef<HTMLDivElement>(null);
  const featureItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const featuresSectionRef = useRef<HTMLElement | null>(null);

  const frameCount = 203; // Based on ffmpeg output
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const canvas = canvasRef.current;
    if (!container || !content || !canvas) return;

    // 1. Preload images
    const currentFrame = (index: number) =>
      `/video-frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    const context = canvas.getContext('2d');
    if (!context) return;

    // Draw the first frame initially when loaded
    const firstImg = imagesRef.current[0];
    if (firstImg.complete) {
      context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
    } else {
      firstImg.onload = () => {
        context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      };
    }

    const lenis = new Lenis({
      wrapper: container,
      content: content,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const lenisRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Setup the scrolling object
      const frameObj = { frame: 0 };
      let lastDrawnFrame = -1;

      gsap.to(frameObj, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: content,
          scroller: container,
          start: 'top top',
          endTrigger: featuresSectionRef.current || undefined,
          end: 'top bottom',
          scrub: 0, // 0 means lock exactly to scrollbar (no smoothing delay from scrub itself, lenis handles smoothing)
        },
        onUpdate: () => {
          const frameIndex = Math.round(frameObj.frame);
          if (frameIndex !== lastDrawnFrame) {
            const img = imagesRef.current[frameIndex];
            if (img && img.complete) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
              lastDrawnFrame = frameIndex;
            }
          }
        },
      });

      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('[data-anim="hero-content"]');
        if (heroContent) {
          gsap.fromTo(
            heroContent,
            { opacity: 0, y: 40, force3D: true },
            { opacity: 1, y: 0, force3D: true, duration: 1.2, ease: 'power3.out', delay: 0.3 }
          );
        }

        gsap.fromTo(
          heroRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: heroRef.current,
              scroller: container,
              start: 'top top',
              end: 'top -30%',
              scrub: true,
            },
          }
        );
      }

      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        const card = cardEl.querySelector('[data-anim="card"]');
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95, force3D: true },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            force3D: true,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardEl,
              scroller: container,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
            },
          }
        );

        const cardHeader = card.querySelector('[data-anim="card-header"]');
        if (cardHeader) {
          gsap.fromTo(
            cardHeader,
            { opacity: 0, y: 25, force3D: true },
            {
              opacity: 1,
              y: 0,
              force3D: true,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardEl,
                scroller: container,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 1.2,
              },
            }
          );
        }

        const checkItems = card.querySelectorAll('[data-anim="check-item"]');
        checkItems.forEach((item, ci) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 15, force3D: true },
            {
              opacity: 1,
              y: 0,
              force3D: true,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardEl,
                scroller: container,
                start: `top ${65 - ci * 7}%`,
                end: `top ${30 - ci * 7}%`,
                scrub: 1.2,
              },
            }
          );
        });
      });

      if (featuresHeaderRef.current) {
        gsap.fromTo(
          featuresHeaderRef.current,
          { opacity: 0, y: 60, force3D: true },
          {
            opacity: 1,
            y: 0,
            force3D: true,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresHeaderRef.current,
              scroller: container,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.2,
            },
          }
        );
      }

      featureItemRefs.current.forEach((itemEl) => {
        if (!itemEl) return;

        gsap.fromTo(
          itemEl,
          { opacity: 0, y: 50, scale: 0.9, force3D: true },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            force3D: true,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemEl,
              scroller: container,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });

      if (ctaRef.current) {
        const ctaLeft = ctaRef.current.querySelector('[data-anim="cta-left"]');
        const ctaRight = ctaRef.current.querySelector('[data-anim="cta-right"]');

        if (ctaLeft) {
          gsap.fromTo(
            ctaLeft,
            { opacity: 0, x: -60, force3D: true },
            {
              opacity: 1,
              x: 0,
              force3D: true,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                scroller: container,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1.2,
              },
            }
          );
        }

        if (ctaRight) {
          gsap.fromTo(
            ctaRight,
            { opacity: 0, x: 60, scale: 0.9, force3D: true },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              force3D: true,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                scroller: container,
                start: 'top 75%',
                end: 'top 35%',
                scrub: 1.2,
              },
            }
          );
        }
      }
    }, container);

    return () => {
      gsap.ticker.remove(lenisRaf);
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavClick = (target: NavLink['target']) => {
    const lenis = lenisRef.current;
    const container = containerRef.current;
    if (!lenis || !container) return;

    const targetEl =
      target === 'how-it-works'
        ? cardRefs.current[0]
        : featuresSectionRef.current;

    if (!targetEl) return;

    lenis.scrollTo(targetEl, { offset: -72 });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden relative"
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: '#EBEBEB',
          backgroundImage: 'url(/video-frames/frame_0001.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover mix-blend-normal"
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAECF0]/60">
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-[72px]">
          <span
            className="text-[24px] font-semibold leading-[32px] tracking-[0.005em]"
            style={{ color: '#000A19', fontFamily: 'Manrope, sans-serif' }}
          >
            QuickTicketAI
          </span>

          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="text-[16px] font-bold leading-[24px] tracking-[0.005em] cursor-pointer bg-transparent border-none"
                style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="https://app.quickticketai.com/register"
            target="_blank"
            rel="noreferrer"
            className="rounded-[100px] text-[14px] font-semibold leading-[20px] text-white cursor-pointer border-none inline-flex items-center justify-center gap-2"
            style={{
              width: 216,
              height: 48,
              paddingTop: 14,
              paddingRight: 24,
              paddingBottom: 14,
              paddingLeft: 24,
              backgroundColor: '#3553FF',
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            Register for early access
          </a>
        </div>
      </header>

      <div ref={contentRef} className="relative z-10 pt-[72px]">
        <section
          ref={heroRef}
          className="min-h-[calc(100vh-72px)] flex items-start justify-center pt-[30px]"
        >
          <div
            data-anim="hero-content"
            className="flex flex-col items-center text-center max-w-[624px] px-8"
          >
            <h1
              className="text-[60px] font-bold leading-[72px] tracking-[-0.02em] mb-6"
              style={{ color: '#181D27', fontFamily: 'Manrope, sans-serif' }}
            >
              <span className="whitespace-nowrap">Simplify Job Ticketing</span>
              <br />
              <span className="whitespace-nowrap">and Invoicing with AI</span>
            </h1>

            <p
              className="text-[18px] font-normal leading-[28px] mb-10"
              style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
            >
              QuickTicketAI helps energy and field service teams create, track,
              and manage job tickets effortlessly — in any language
            </p>

            <a
              href="https://app.quickticketai.com/register"
              target="_blank"
              rel="noreferrer"
              className="rounded-[100px] text-[14px] font-semibold leading-[20px] text-white cursor-pointer border-none inline-flex items-center justify-center gap-2"
              style={{
                width: 263,
                height: 56,
                paddingTop: 14,
                paddingRight: 24,
                paddingBottom: 14,
                paddingLeft: 24,
                backgroundColor: '#3553FF',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              Register for early access
            </a>
          </div>
        </section>

        {FEATURE_CARDS.map((card, index) => (
          <section
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el as HTMLDivElement | null;
            }}
            className="min-h-screen flex items-center px-8 lg:px-0"
          >
            <div
              className={`w-full max-w-[1280px] mx-auto ${card.position === 'left'
                ? 'flex justify-start pl-[80px]'
                : 'flex justify-end pr-[80px]'
                }`}
            >
              <div
                data-anim="card"
                className="will-change-transform rounded-[28px] p-10 max-w-[520px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4" data-anim="card-header">
                    <h2
                      className="text-[30px] font-semibold leading-[40px]"
                      style={{ color: '#181D27', fontFamily: 'Manrope, sans-serif' }}
                    >
                      {card.heading}
                    </h2>
                    <p
                      className="text-[18px] font-normal leading-[28px]"
                      style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
                    >
                      {card.supporting}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    {card.checkItems.map((item, ci) => (
                      <div
                        key={ci}
                        data-anim="check-item"
                        className="flex items-start gap-3 will-change-transform"
                      >
                        <CheckIcon />
                        <span
                          className="text-[17px] font-normal leading-[26px]"
                          style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section
          ref={(el) => { featuresSectionRef.current = el; }}
          className="flex flex-col justify-center min-h-screen py-24 px-8"
          style={{ backgroundColor: '#1D2E8C' }}
        >
          <div className="max-w-[1280px] mx-auto w-full">
            <div
              ref={featuresHeaderRef}
              className="flex flex-col items-center gap-5 mb-16 will-change-transform"
            >
              <h2
                className="text-4xl font-bold leading-[1.22] tracking-[-2%] text-center"
                style={{ color: '#FFFFFF', fontFamily: 'Manrope, sans-serif' }}
              >
                Main features built for field service teams
              </h2>
              <p
                className="text-xl font-medium leading-[1.5] text-center max-w-[768px]"
                style={{ color: '#A2B0FF', fontFamily: 'Manrope, sans-serif' }}
              >
                Core tools to create, manage, and close job tickets faster — with
                AI, real-time collaboration, and built-in invoicing.
              </p>
            </div>

            <div className="flex flex-col gap-16 px-8">
              {[0, 1, 2].map((row) => (
                <div key={row} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {GRID_FEATURES.slice(row * 3, row * 3 + 3).map(
                    (feature, colIdx) => {
                      const globalIdx = row * 3 + colIdx;
                      return (
                        <div
                          key={globalIdx}
                          ref={(el) => {
                            featureItemRefs.current[globalIdx] =
                              el as HTMLDivElement | null;
                          }}
                          className="flex flex-col items-center gap-5 will-change-transform"
                        >
                          <img src={feature.icon} alt="" className="w-14 h-14" />
                          <div className="flex flex-col items-center gap-2">
                            <h3
                              className="text-xl font-bold leading-[1.5] text-center"
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Manrope, sans-serif',
                              }}
                            >
                              {feature.title}
                            </h3>
                            <p
                              className="text-base font-normal leading-[1.5] text-center"
                              style={{
                                color: '#A2B0FF',
                                fontFamily: 'Manrope, sans-serif',
                              }}
                            >
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={ctaRef}
          className="relative py-[96px] bg-white"
        >
          <div className="max-w-[1280px] mx-auto px-8 w-full">
            <div className="flex items-center justify-between gap-[64px]">
              <div data-anim="cta-left" className="will-change-transform max-w-[560px]">
                <h2
                  className="text-[36px] font-semibold leading-[44px] tracking-[-0.02em] mb-5"
                  style={{ color: '#181D27', fontFamily: 'Manrope, sans-serif' }}
                >
                  Transform the way you manage job tickets
                </h2>
                <p
                  className="text-[20px] font-medium leading-[30px] mb-10"
                  style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
                >
                  From voice-based ticket creation to automated invoicing,
                  QuickTicketAI helps field teams manage jobs faster and with
                  fewer errors.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-[350px] px-[18px] py-4 rounded-[16px] text-[16px] leading-[24px] outline-none"
                    style={{
                      border: '1px solid #D0D5DD',
                      color: '#101828',
                      fontFamily: 'Manrope, sans-serif',
                      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                    }}
                  />
                  <button
                    className="px-[18px] py-[12px] rounded-full text-[16px] font-semibold leading-[24px] text-white cursor-pointer border-none"
                    style={{
                      backgroundColor: '#3553FF',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div
                data-anim="cta-right"
                className="will-change-transform flex-shrink-0"
              >
                <div className="relative w-[280px] h-[572px]">
                  <div
                    className="absolute inset-0 rounded-[44px] overflow-hidden"
                    style={{
                      backgroundColor: '#1A1A1A',
                      boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div
                      className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] rounded-[41px] overflow-hidden"
                      style={{ backgroundColor: '#FFFFFF' }}
                    >
                      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-[#1A1A1A] rounded-full z-10" />
                      <div className="flex flex-col h-full pt-[52px] px-[20px]">
                        <div className="flex items-center gap-2 mb-[32px]">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="#535862" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span
                            className="text-[14px] font-medium"
                            style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
                          >
                            Create with voice
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative">
                          <div
                            className="w-[180px] h-[180px] rounded-full"
                            style={{
                              background: 'conic-gradient(from 180deg at 50% 50%, #FF9A9E 0deg, #FECFEF 60deg, #A8EDEA 120deg, #5BCEFA 180deg, #B8A9FA 240deg, #FF9A9E 360deg)',
                            }}
                          />
                        </div>

                        <p
                          className="text-[12px] leading-[18px] text-center mb-[24px] px-[8px]"
                          style={{ color: '#535862', fontFamily: 'Manrope, sans-serif' }}
                        >
                          Customer company name is: Sugabs Team and Customer name is: Jay Hargutson. Location is at: 4517 Washington Ave, Manchester, Kentucky 39495
                        </p>

                        <div className="flex items-center justify-center gap-[20px] mb-[32px]">
                          <div
                            className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#F2F4F7' }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <rect x="5" y="5" width="10" height="10" rx="1" stroke="#535862" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <div
                            className="w-[56px] h-[56px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#3553FF' }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C10.3431 2 9 3.34315 9 5V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V5C15 3.34315 13.6569 2 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 19V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div
                            className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#F2F4F7' }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M6 6L14 14M6 14L14 6" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t" style={{ borderColor: '#EAECF0' }}>
          <div className="max-w-[1280px] mx-auto px-8 py-[48px] flex items-center justify-between">
            <span
              className="text-[18px] font-semibold leading-[28px]"
              style={{ color: '#181D27', fontFamily: 'Manrope, sans-serif' }}
            >
              QuickTicketAI
            </span>
            <span
              className="text-[16px] font-normal leading-[24px]"
              style={{ color: '#667085', fontFamily: 'Manrope, sans-serif' }}
            >
              © 2026 QuickTicketAI. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

