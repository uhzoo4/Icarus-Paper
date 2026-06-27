import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { initPreloader } from './scenes/scene0-preloader.js'
import { initHero } from './scenes/scene1-hero.js'
import { initParting } from './scenes/scene2-parting.js'
import { initStory } from './scenes/scene3-story.js'
import { initOcean } from './scenes/scene6-ocean.js'
import { initManifesto } from './scenes/scene7-manifesto.js'
import { initClose } from './scenes/scene8-close.js'
import { initScroll, getLenis } from './utils/scroll.js'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Smooth scroll engine ── */
    initScroll()
    const lenis = getLenis()

    /* ── 2. Custom cursor (pointer devices only) ── */
    const cursor = document.querySelector('.cursor')
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })

        window.addEventListener('mousemove', e => {
            xTo(e.clientX)
            yTo(e.clientY)
        })

        document.body.style.cursor = 'none'

        /* Cursor grows over clickable elements */
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () =>
                gsap.to(cursor, { scale: 2.4, duration: 0.3 }))
            el.addEventListener('mouseleave', () =>
                gsap.to(cursor, { scale: 1, duration: 0.3 }))
        })
    }

    /* ── 3. Scroll progress bar ── */
    const progressBar = document.querySelector('.scroll-progress-bar')
    lenis.on('scroll', ({ progress }) => {
        if (progressBar) gsap.set(progressBar, { scaleY: progress, transformOrigin: 'top center' })
    })

    /* ── 4. Lift Three.js canvas to fixed full-page overlay ──
       Starts at opacity 0. Fades in after hero entry.
       Fades out before manifesto (pure text — no figure needed). */
    const canvas = document.getElementById('icarus-canvas')
    if (canvas) {
        document.body.appendChild(canvas)
        Object.assign(canvas.style, {
            position: 'fixed',
            inset: '0',
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: '10',
            opacity: '0',
        })
    }

    /* ── 5. Register all scroll scenes ── */
    initParting()
    initStory()
    initOcean()
    initManifesto()
    initClose()

    /* ── 6. Canvas lifecycle — fade out for manifesto/close ── */
    if (canvas) {
        ScrollTrigger.create({
            trigger: '#scene-manifesto',
            start: 'top 65%',
            end: 'top 10%',
            onEnter: () => gsap.to(canvas, { opacity: 0, duration: 1.0, ease: 'power2.in' }),
            onLeaveBack: () => gsap.to(canvas, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
        })
    }

    /* ── 7. Kill heroRoughTween the moment scroll begins ── */
    let roughKilled = false
    lenis.on('scroll', () => {
        if (roughKilled) return
        roughKilled = true
        import('./scenes/scene1-hero.js').then(({ heroRoughTween }) => {
            if (heroRoughTween) heroRoughTween.kill()
        })
    })

    /* ── 8. Preloader → Hero → Live ── */
    initPreloader(() => {

        /* First refresh: correct heights after preloader removal */
        ScrollTrigger.refresh()

        initHero(() => {
            /* Canvas fades in as hero animation completes */
            if (canvas) {
                gsap.to(canvas, { opacity: 1, duration: 1.6, ease: 'power2.out' })
            }

            /*
              Second refresh: after pinned scenes have all painted their
              initial states, ScrollTrigger recalculates every trigger
              position from the correct document height.
              100ms gives the browser one paint cycle to settle.
            */
            setTimeout(() => ScrollTrigger.refresh(), 100)
        })
    })

})
