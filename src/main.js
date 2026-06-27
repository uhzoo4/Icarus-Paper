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

    /* ── 2. Lift Three.js canvas to fixed body overlay ──
       The canvas starts inside #hero (position: absolute).
       Scenes 3-6 also drive Icarus — so it must stay
       visible across the full page. Moving it to body
       and making it fixed achieves that without
       touching any locked scene files.             */
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
        })
    }

    /* ── 3. Register all scroll scenes immediately ──
       ScrollTriggers register now but only fire
       when the user reaches their trigger elements.
       Order matches document flow.                 */
    initParting()
    initStory()
    initOcean()
    initManifesto()
    initClose()

    /* ── 4. Kill the hero roughTween on first scroll ──
       heroRoughTween is set by initHero() later.
       Lenis fires this the moment any scroll begins,
       before the parting animation takes over the
       displacement map. Prevents tween conflict.   */
    const lenis = getLenis()
    let roughKilled = false
    lenis.on('scroll', () => {
        if (roughKilled) return
        roughKilled = true
        import('./scenes/scene1-hero.js').then(({ heroRoughTween }) => {
            if (heroRoughTween) heroRoughTween.kill()
        })
    })

    /* ── 5. Preloader → Hero chain ──
       Preloader runs first. When it completes:
         a. Refresh ScrollTrigger (document height
            changes when preloader is removed)
         b. Fire hero entry animation            */
    initPreloader(() => {
        ScrollTrigger.refresh()

        initHero(() => {
            /* Hero entry complete.
               User can now scroll — all triggers are live. */
        })
    })

})