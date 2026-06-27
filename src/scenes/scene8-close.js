import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initClose() {
    const figureLayer = document.querySelector('.close-figure-layer');
    const marker = document.querySelector('.close-marker');
    const fragments = document.querySelectorAll('.fragment');
    const poem = document.querySelector('.close-poem');
    const poemLines = document.querySelectorAll('.poem-line');
    const footer = document.querySelector('.close-footer');
    const footerLine = document.querySelector('.footer-line');
    const footerItems = document.querySelectorAll('.footer-content > *');

    gsap.set(figureLayer, { opacity: 0 });
    gsap.set(marker, { opacity: 0 });
    gsap.set(fragments, { opacity: 0 });
    gsap.set(poem, { opacity: 0 });
    gsap.set(poemLines, { opacity: 0, y: 12 });
    gsap.set(footer, { opacity: 0 });
    gsap.set(footerLine, { scaleX: 0 });
    gsap.set(footerItems, { opacity: 0 });

    /* ── 1. Figure layer reveals as section enters ── */
    ScrollTrigger.create({
        trigger: '#scene-close',
        start: 'top 90%',
        once: true,
        onEnter: () => {
            gsap.to(figureLayer, {
                opacity: 0.7,
                duration: 2.5,
                ease: 'power2.out'
            });
        }
    });

    /* ── 2. Marker fades in ── */
    ScrollTrigger.create({
        trigger: '#scene-close',
        start: 'top 75%',
        once: true,
        onEnter: () => {
            gsap.to(marker, {
                opacity: 1,
                duration: 1.4,
                ease: 'power2.out',
                delay: 0.3
            });
        }
    });

    /* ── 3. Fragments drift in ── */
    ScrollTrigger.create({
        trigger: '#scene-close',
        start: 'top 70%',
        once: true,
        onEnter: () => {
            gsap.to(fragments, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                delay: 0.6
            });
        }
    });

    /* ── 4. Poem container visible ── */
    ScrollTrigger.create({
        trigger: '.close-poem',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(poem, {
                opacity: 1,
                duration: 0.01,
                ease: 'none'
            });
        }
    });

    /* ── 5. Each poem line wipes up individually ── */
    poemLines.forEach((line, i) => {
        const isOpening = line.classList.contains('poem-opening');
        const isFinal = line.classList.contains('poem-final');

        const dur = isFinal ? 1.2 :
            isOpening ? 1.0 : 0.7;
        const ease = isFinal ? 'power4.out' : 'power3.out';

        ScrollTrigger.create({
            trigger: line,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(line, {
                    opacity: 1,
                    y: 0,
                    duration: dur,
                    ease: ease,
                    delay: i * 0.06
                });
            }
        });
    });

    /* ── 6. Footer draws in last ── */
    ScrollTrigger.create({
        trigger: '.close-footer',
        start: 'top 95%',
        once: true,
        onEnter: () => {
            gsap.to(footer, {
                opacity: 1,
                duration: 0.01,
                ease: 'none'
            });
            gsap.to(footerLine, {
                scaleX: 1,
                duration: 1.4,
                ease: 'power3.out',
                delay: 0.1
            });
            gsap.to(footerItems, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power2.out',
                delay: 0.8
            });
        }
    });
}
