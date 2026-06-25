import gsap from 'gsap';
import { initIcarusCanvas } from '../canvas/icarus-three.js';

export let heroRoughTween = null;
export let heroCharsLeft = null;
export let heroCharsRight = null;
export let heroContent = null;

export function initHero(onReady) {
    initIcarusCanvas();

    const heroMeta = document.querySelector('.hero-meta');
    const heroChars = document.querySelectorAll('.hero-char');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroScrollHint = document.querySelector('.hero-scroll-hint');
    const displacementEl = document.getElementById('displacement-scale');

    heroCharsLeft = document.querySelectorAll('.hero-title-left .hero-char');
    heroCharsRight = document.querySelectorAll('.hero-title-right .hero-char');
    heroContent = document.querySelector('.hero-content');

    gsap.set(heroMeta, { opacity: 0, yPercent: 20 });
    gsap.set(heroChars, { opacity: 0, yPercent: 60 });
    gsap.set(heroTagline, { opacity: 0, yPercent: 15 });
    gsap.set(heroScrollHint, { opacity: 0 });

    const tl = gsap.timeline({
        onComplete: () => {
            if (typeof onReady === 'function') {
                onReady();
            }
            heroRoughTween = gsap.to(displacementEl, {
                attr: { scale: 2.5 },
                duration: 2,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1
            });
        }
    });

    tl.to(heroMeta, {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: 'power3.out'
    });

    tl.to(heroChars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'hop',
        stagger: 0.04
    });

    tl.to(heroTagline, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    tl.to(heroScrollHint, {
        opacity: 0.6,
        duration: 1,
        ease: 'power3.out'
    }, '+=0.5');
}