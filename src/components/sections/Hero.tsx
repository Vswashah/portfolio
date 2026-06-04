'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ref: badgeRef, inView: badgeIn } = useInView()
  const { ref: rolesRef, inView: rolesIn } = useInView()
  const { ref: h1Ref, inView: h1In } = useInView()
  const { ref: ledeRef, inView: ledeIn } = useInView()
  const { ref: ctaRef, inView: ctaIn } = useInView()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, dpr = 1, animFrame = 0
    const nodes = Array.from({ length: 90 }, () => ({ x: 0, y: 0, vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7 }))
    function resize() {
      dpr = window.devicePixelRatio || 1
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.scale(dpr, dpr)
      nodes.forEach(n => { n.x = Math.random() * W; n.y = Math.random() * H })
    }
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(77,124,255,${0.12 * (1 - dist / 160)})`
            ctx!.lineWidth = 0.8
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 1.8, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(77,124,255,0.55)'
        ctx!.fill()
      }
      animFrame = requestAnimationFrame(draw)
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <header className="relative min-h-svh flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" aria-hidden="true" />
      <div className="relative z-10 max-w-[1180px] mx-auto px-10 pt-32 pb-20">
        <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={cn('reveal inline-flex items-center gap-2.5 bg-[rgba(34,211,160,0.1)] border border-[rgba(34,211,160,0.25)] rounded-full px-4 py-1.5 text-[13px] text-[var(--green)] mb-7', badgeIn && 'in')}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)] animate-pulse" />
          Currently pursuing <b className="font-semibold">MS Computer Science @ UT Dallas</b>
        </div>
        <div ref={rolesRef as React.RefObject<HTMLDivElement>} className={cn('reveal flex flex-wrap gap-2.5 mb-5 [transition-delay:100ms]', rolesIn && 'in')}>
          {['AI Engineer', 'Software Developer', 'Builder'].map((r, i) => (
            <span key={r} className="text-[13px] font-medium tracking-widest uppercase text-[var(--t3)]">
              {i > 0 && <span className="mr-2.5 opacity-40">·</span>}{r}
            </span>
          ))}
        </div>
        <h1 ref={h1Ref as React.RefObject<HTMLHeadingElement>} className={cn('reveal text-[clamp(52px,7vw,96px)] font-bold leading-none tracking-[-0.03em] [transition-delay:150ms]', h1In && 'in')}>
          <span className="bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent">Vishwaa Shah</span>
        </h1>
        <p ref={ledeRef as React.RefObject<HTMLParagraphElement>} className={cn('reveal text-[clamp(16px,2vw,20px)] text-[var(--t2)] mt-4 max-w-[520px] [transition-delay:200ms]', ledeIn && 'in')}>
          Building scalable software, intelligent systems, and AI-powered experiences.
        </p>
        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className={cn('reveal flex flex-wrap gap-3 mt-9 [transition-delay:250ms]', ctaIn && 'in')}>
          <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] hover:-translate-y-0.5 transition-all duration-200">
            View Projects
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium bg-[var(--surface)] border border-[var(--hair)] text-[var(--t2)] hover:text-[var(--t1)] transition-all duration-200">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
            Resume
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium bg-[var(--surface)] border border-[var(--hair)] text-[var(--t2)] hover:text-[var(--t1)] transition-all duration-200">
            Contact
          </a>
        </div>
      </div>
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[var(--t3)] z-10 animate-bounce">
        <span>Scroll</span>
        <span className="w-px h-9 bg-gradient-to-b from-[var(--t3)] to-transparent" />
      </div>
    </header>
  )
}