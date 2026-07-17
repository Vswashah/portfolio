import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    gsap.globalTimeline.timeScale(100) // effectively instant
    ScrollTrigger.config({ ignoreMobileResize: true })
  }
}

export { gsap, ScrollTrigger }
