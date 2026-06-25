import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroRoughTween } from './scene1-hero.js';
import { setIcarusFallProgress } from '../canvas/icarus-three.js';

gsap.registerPlugin(ScrollTrigger);

export let skyLayerEl = null;

export function initParting() {
    const skyLayer = document.querySelector('.sky-layer');
    const titleLeft = document.querySelector('.hero-title-left');
    const titleRight = document.querySelector('.hero-title-right');
    const allChars = document.querySelectorAll('.hero-char');
    const tagline = document.querySelector('.hero-tagline');
    const meta = document.querySelector('.hero-meta');
    const scrollHint = document.querySelector('.hero-scroll-hint');
    const displacement = document.getElementById('displacement-scale');
    const clouds = document.querySelectorAll('.cloud');

    skyLayerEl = skyLayer;

    if (heroRoughTween) heroRoughTween.kill();

    const tl = gsap.timeline({ paused: true });

    /* ── Phase 1: 0 → 0.22 — Text bleeds to crimson ── */

    tl.to(allChars, {
        color: '#CC1818',
        duration: 0.22,
        ease: 'none'
    }, 0);

    tl.to(displacement, {
        attr: { scale: 24 },
        duration: 0.22,
        ease: 'power3.in'
    }, 0);

    /* ── Phase 2: 0.15 → 0.55 — THE PARTING ── */

    tl.to(titleLeft, {
        xPercent: -140,
        duration: 0.4,
        ease: 'power3.inOut'
    }, 0.15);

    tl.to(titleRight, {
        xPercent: 140,
        duration: 0.4,
        ease: 'power3.inOut'
    }, 0.15);

    tl.to([tagline, meta, scrollHint], {
        opacity: 0,
        y: -30,
        duration: 0.18,
        ease: 'power2.in',
        stagger: 0.04
    }, 0.12);

    tl.to(displacement, {
        attr: { scale: 0 },
        duration: 0.18,
        ease: 'power2.out'
    }, 0.48);

    /* ── Phase 3: 0.38 → 0.76 — SKY REVEALS ── */

    tl.to(skyLayer, {
        opacity: 1,
        duration: 0.38,
        ease: 'power2.out'
    }, 0.38);

    /* ── Phase 4: 0 → 1 — CLOUD PARALLAX ── */

    tl.to('.cloud-1', {
        y: '-22%',
        x: '3%',
        duration: 1,
        ease: 'none'
    }, 0);

    tl.to('.cloud-2', {
        y: '-14%',
        x: '-4%',
        duration: 1,
        ease: 'none'
    }, 0);

    tl.to('.cloud-3', {
        y: '-35%',
        x: '2%',
        duration: 1,
        ease: 'none'
    }, 0);

    tl.to('.cloud-4', {
        y: '-18%',
        x: '-2%',
        duration: 1,
        ease: 'none'
    }, 0);

    tl.to('.cloud-5', {
        y: '-28%',
        x: '5%',
        duration: 1,
        ease: 'none'
    }, 0);

    ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1.5,
        animation: tl,
        onUpdate: (self) => {
            setIcarusFallProgress(self.progress);
        },
        onLeave: () => {
            gsap.set(skyLayer, { opacity: 1 });
        }
    });
}