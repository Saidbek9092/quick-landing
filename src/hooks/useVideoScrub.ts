import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lerp factor controls how fast the video catches up to the target frame.
 * Lower = smoother but more latent. 0.06–0.1 is the sweet spot.
 */
const LERP_FACTOR = 0.07;

/**
 * Skip video seeks smaller than this (seconds) to avoid redundant decoder work.
 */
const SEEK_THRESHOLD = 0.015;

interface UseVideoScrubOptions {
  readonly videoRef: RefObject<HTMLVideoElement | null>;
  readonly scrollerRef: RefObject<HTMLDivElement | null>;
  readonly contentRef: RefObject<HTMLDivElement | null>;
}

/**
 * Binds a video's currentTime to scroll progress using a two-stage smooth pipeline:
 *
 * 1. GSAP proxy tween: ScrollTrigger scrub lerps a plain object's `time` property
 *    so the target value is already smoothed before we touch the video.
 *
 * 2. gsap.ticker lerp: On every rAF tick, the video's actual currentTime is
 *    interpolated toward the proxy target with an additional lerp, eliminating
 *    the micro-stutter caused by keyframe-only seeking.
 *
 * Returns a cleanup-safe GSAP context.
 */
export const useVideoScrub = ({
  videoRef,
  scrollerRef,
  contentRef,
}: UseVideoScrubOptions): void => {
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!video || !scroller || !content) return;

    let tickerCb: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const bootstrap = () => {
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return;

        const proxy = { time: 0 };

        gsap.to(proxy, {
          time: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: content,
            scroller,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
          onUpdate: () => {
            targetTimeRef.current = proxy.time;
          },
        });

        tickerCb = () => {
          const target = targetTimeRef.current;
          const current = smoothTimeRef.current;
          const delta = target - current;

          if (Math.abs(delta) < SEEK_THRESHOLD) return;

          const next = current + delta * LERP_FACTOR;
          smoothTimeRef.current = next;
          video.currentTime = next;
        };

        gsap.ticker.add(tickerCb);
      };

      if (video.readyState >= 1 && isFinite(video.duration)) {
        bootstrap();
      } else {
        video.addEventListener('loadedmetadata', bootstrap, { once: true });
      }
    }, scroller);

    return () => {
      if (tickerCb) gsap.ticker.remove(tickerCb);
      ctx.revert();
    };
  }, [videoRef, scrollerRef, contentRef]);
};
