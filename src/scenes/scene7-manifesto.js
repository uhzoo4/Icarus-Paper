import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initManifesto() {
    const section = document.getElementById('scene-manifesto');
    const marker = document.querySelector('.manifesto-marker');
    const lines = document.querySelectorAll('.m-line');
    const credit = document.querySelector('.manifesto-credit');
    const goHigher = document.querySelector('.m-go-higher');

    gsap.set(lines, { yPercent: 105 });
    gsap.set(marker, { opacity: 0 });
    gsap.set(credit, { opacity: 0 });

    ScrollTrigger.create({
        trigger: '#scene-manifesto',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.to(marker, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    });

    lines.forEach((line) => {
        const wrap = line.parentElement;

        const isPivot = wrap.classList.contains('m-line-9');
        const isClose = wrap.classList.contains('m-line-10') ||
            wrap.classList.contains('m-line-11');

        const dur = isPivot ? 1.0 : isClose ? 0.8 : 0.65;
        const ease = isPivot ? 'power4.out' : 'power3.out';

        ScrollTrigger.create({
            trigger: wrap,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.to(line, {
                    yPercent: 0,
                    duration: dur,
                    ease: ease,
                });
            }
        });
    });

    ScrollTrigger.create({
        trigger: '.m-go-higher-wrap',
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.to(goHigher, {
                textShadow: '0 0 80px rgba(204,24,24,0.5), 0 0 160px rgba(204,24,24,0.2)',
                duration: 2.5,
                ease: 'power2.inOut',
                delay: 0.9,
                yoyo: true,
                repeat: -1
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.m-line-11',
        start: 'top 75%',
        once: true,
        onEnter: () => {
            gsap.to(credit, {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.6
            });
        }
    });
}