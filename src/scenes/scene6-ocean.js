import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setIcarusCompositionShift, resetIcarusPosition } from '../canvas/icarus-three.js';

gsap.registerPlugin(ScrollTrigger);

export function initOcean() {
    /*
      FIX: Reset Icarus to center before this scene begins.
      Scene 3 left mesh.position.y at ~-4.5 and mesh.position.x at ~2.2.
      Without this reset the Three.js figure is off-camera for the
      entire ocean + manifesto + close scenes.
    */
    resetIcarusPosition();

    const oceanSky = document.querySelector('.ocean-sky');
    const oceanBody = document.querySelector('.ocean-body');
    const shimmerWrap = document.querySelector('.ocean-shimmer-wrap');
    const foamDots = document.querySelectorAll('.foam-dot');
    const gapText = document.querySelector('.ocean-gap-text');
    const gapLine1 = document.querySelector('.gap-line-1');
    const gapLine2 = document.querySelector('.gap-line-2');

    gsap.set(oceanBody, { yPercent: 100 });
    gsap.set(shimmerWrap, { opacity: 0 });
    gsap.set(foamDots, { opacity: 0 });
    gsap.set(gapText, { opacity: 0 });
    gsap.set(gapLine1, { opacity: 0, y: 8 });
    gsap.set(gapLine2, { opacity: 0, y: 8 });
    gsap.set(oceanSky, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to({}, { duration: 1 }, 0);

    /* ── Phase 1 (0 → 0.5): Sky darkens ── */
    tl.to(oceanSky, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
    }, 0);

    /* ── Phase 2 (0 → 0.75): Ocean rises ── */
    tl.to(oceanBody, {
        yPercent: 0,
        duration: 0.75,
        ease: 'power3.out',
    }, 0);

    /* ── Phase 3 (0.35 → 0.55): Shimmer line appears ── */
    tl.to(shimmerWrap, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
    }, 0.35);

    /* ── Phase 4 (0.4 → 0.65): Foam particles emerge ── */
    tl.to(foamDots, {
        opacity: 1,
        duration: 0.15,
        stagger: 0.018,
        ease: 'power2.out',
    }, 0.4);

    /* ── Phase 5 (0.5 → 0.75): Gap text fades in ── */
    tl.to(gapText, {
        opacity: 1,
        duration: 0.01,
        ease: 'none',
    }, 0.5);

    tl.to(gapLine1, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out',
    }, 0.5);

    tl.to(gapLine2, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out',
    }, 0.56);

    /* ── Phase 6 (0.82 → 0.92): Gap text fades out ── */
    tl.to(gapText, {
        opacity: 0,
        duration: 0.1,
        ease: 'power2.in',
    }, 0.82);

    ScrollTrigger.create({
        trigger: '#scene-ocean',
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.5,
        animation: tl,
        onUpdate: (self) => {
            setIcarusCompositionShift(1 - self.progress);
        },
        onLeave: () => {
            setIcarusCompositionShift(0);
        },
    });
}
