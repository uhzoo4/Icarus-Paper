import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
CustomEase.create('hop', '0.9, 0, 0.1, 1');

export function initPreloader(onComplete) {
    const preloader = document.getElementById('preloader');
    const countEl = document.getElementById('pre-count');
    const progressBar = preloader.querySelector('.pre-progress-bar');
    const chars = preloader.querySelectorAll('.pre-char');
    const subLine = preloader.querySelector('.pre-sub-line');

    const counter = { val: 0 };

    gsap.set(chars, { yPercent: (i) => (i % 2 === 0 ? -120 : 120) });
    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(subLine, { yPercent: 100 });
    gsap.set(countEl, { opacity: 1 });

    const tl = gsap.timeline();

    tl.to(progressBar, {
        scaleX: 1,
        duration: 3.5,
        ease: 'power3.inOut'
    }, 0);

    tl.to(counter, {
        val: 100,
        duration: 3.5,
        ease: 'power3.inOut',
        onUpdate: () => {
            countEl.textContent = Math.round(counter.val);
        }
    }, 0);

    tl.to(chars, {
        yPercent: 0,
        duration: 1.8,
        ease: 'hop',
        stagger: 0.06,
        delay: 0.3
    }, '<');

    tl.to(subLine, {
        yPercent: 0,
        duration: 1,
        ease: 'hop'
    }, 3.5);

    tl.to(subLine, {
        yPercent: -110,
        duration: 0.6,
        ease: 'hop'
    }, '+=0.8');

    tl.to(chars, {
        yPercent: (i) => (i % 2 === 0 ? -140 : 140),
        duration: 0.9,
        ease: 'hop',
        stagger: 0.04
    });

    tl.to(progressBar, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.6,
        ease: 'power3.in'
    }, '<');

    tl.to(countEl, {
        opacity: 0,
        duration: 0.4
    }, '<');

    tl.to(preloader, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
        onComplete: () => {
            preloader.style.display = 'none';
            onComplete();
        }
    });
}