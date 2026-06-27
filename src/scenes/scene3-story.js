import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setIcarusFallProgress, setIcarusCompositionShift } from '../canvas/icarus-three.js';

gsap.registerPlugin(ScrollTrigger);

export function initStory() {
    const section = document.getElementById('scene-story');
    const storm = document.querySelector('.story-storm');
    const heightMoment = document.querySelector('.height-moment');
    const feathers = document.querySelectorAll('.feather');
    const annotations = document.querySelectorAll('.ann');
    const rewriteBlock = document.querySelector('.rewrite-block');
    const rewriteLines = document.querySelectorAll('.rewrite-line');
    const rewriteDiv = document.querySelector('.rewrite-divider');

    function getEntryOffset(fromAttr) {
        const offsets = {
            'top': { y: '-120%', x: '0%' },
            'top-right': { y: '-100%', x: '80%' },
            'right': { y: '0%', x: '120%' },
            'bottom-right': { y: '100%', x: '80%' },
            'bottom': { y: '120%', x: '0%' },
            'bottom-left': { y: '100%', x: '-80%' },
            'left': { y: '0%', x: '-120%' },
            'center': { y: '40%', x: '0%' },
        };
        return offsets[fromAttr] || { y: '0%', x: '120%' };
    }

    annotations.forEach(ann => {
        const from = ann.dataset.from || 'right';
        const offset = getEntryOffset(from);
        gsap.set(ann, { opacity: 0, x: offset.x, y: offset.y });
    });

    gsap.set(rewriteBlock, { opacity: 0 });
    gsap.set(rewriteLines, { opacity: 0, x: -24 });
    gsap.set(rewriteDiv, { opacity: 0, scaleX: 0 });
    gsap.set(feathers, { opacity: 0 });
    gsap.set(heightMoment, { opacity: 0 });
    gsap.set(storm, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    /* Pin timeline total to exactly 1 */
    tl.to({}, { duration: 1 }, 0);

    /* ── Phase 0 (0 → 0.08): Height moment ── */
    tl.to(heightMoment, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0);
    tl.to(heightMoment, { opacity: 0, duration: 0.04, ease: 'power2.in' }, 0.07);

    /* ── Phase 1 (0.08 → 0.18): Feathers ── */
    tl.to(feathers, {
        opacity: 0.6, duration: 0.08,
        stagger: 0.015, ease: 'power2.out'
    }, 0.08);

    /* ── Phase 2 (0.14 → 0.52): Storm rises ── */
    tl.to(storm, { opacity: 1, duration: 0.38, ease: 'power2.inOut' }, 0.14);
    tl.to('.story-sky-bg', { opacity: 0.3, duration: 0.38, ease: 'power2.inOut' }, 0.14);

    /* ── Phase 3: Annotations fly in — three waves ── */
    const wave1 = [
        '.ann-top-left', '.ann-top-right', '.ann-top-center',
        '.ann-right-1', '.ann-left-1',
    ];
    const wave2 = [
        '.ann-right-2', '.ann-right-3', '.ann-left-2',
        '.ann-left-3', '.ann-center-right',
    ];
    const wave3 = [
        '.ann-right-4', '.ann-left-4', '.ann-center-low',
        '.ann-bottom-left', '.ann-bottom-center', '.ann-bottom-right',
    ];

    wave1.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        tl.to(el, { opacity: 1, x: 0, y: 0, duration: 0.08, ease: 'power3.out' },
            0.18 + i * 0.012);
    });

    wave2.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        tl.to(el, { opacity: 1, x: 0, y: 0, duration: 0.08, ease: 'power3.out' },
            0.26 + i * 0.014);
    });

    wave3.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        tl.to(el, { opacity: 1, x: 0, y: 0, duration: 0.08, ease: 'power3.out' },
            0.36 + i * 0.012);
    });

    /* Gut punch — last to land */
    tl.to('.ann-gut-punch', {
        opacity: 1, y: 0, x: 0, duration: 0.07, ease: 'power3.out'
    }, 0.58);

    /* ── Phase 4 (0.62): Annotations scatter ── */
    annotations.forEach(ann => {
        if (ann.classList.contains('ann-gut-punch')) return;
        const from = ann.dataset.from || 'right';
        const offset = getEntryOffset(from);
        tl.to(ann, {
            opacity: 0, x: offset.x, y: offset.y,
            duration: 0.1, ease: 'power3.in',
        }, 0.62);
    });

    tl.to(feathers, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.62);

    /* ── Phase 5 (0.68 → 1.0): Composition shift + rewrite ── */
    tl.to(rewriteBlock, { opacity: 1, duration: 0.04, ease: 'none' }, 0.68);

    rewriteLines.forEach((line, i) => {
        tl.to(line, {
            opacity: 1, x: 0, duration: 0.07, ease: 'power3.out',
        }, 0.70 + i * 0.045);
    });

    tl.to(rewriteDiv, {
        opacity: 1, scaleX: 1, duration: 0.06, ease: 'power3.out'
    }, 0.80);

    ScrollTrigger.create({
        trigger: '#scene-story',
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1.8,
        animation: tl,
        onUpdate: (self) => {
            const phase5 = Math.max(0, (self.progress - 0.68) / 0.32);
            setIcarusFallProgress(1 + phase5 * 0.5);
            setIcarusCompositionShift(phase5);
        }
    });
}
