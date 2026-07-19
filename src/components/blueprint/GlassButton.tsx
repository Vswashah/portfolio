'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

// Tiny tiled fractal-noise SVG — the "tracing paper" grain, kept at very low
// opacity so it reads as texture, not pattern.
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

const MAGNET_RADIUS = 40
const MAX_PULL = 7

interface GlassButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'filled' | 'outline'
}

export default function GlassButton({ variant = 'outline', className, children, ...rest }: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)

  // Magnetic pull — offsets the button toward the cursor within a ~40px
  // margin around its bounds, springing back to rest outside that range.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const withinX = e.clientX >= rect.left - MAGNET_RADIUS && e.clientX <= rect.right + MAGNET_RADIUS
      const withinY = e.clientY >= rect.top - MAGNET_RADIUS && e.clientY <= rect.bottom + MAGNET_RADIUS

      if (withinX && withinY) {
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = ((e.clientX - cx) / (rect.width / 2 + MAGNET_RADIUS)) * MAX_PULL
        const dy = ((e.clientY - cy) / (rect.height / 2 + MAGNET_RADIUS)) * MAX_PULL
        xTo(gsap.utils.clamp(-MAX_PULL, MAX_PULL, dx))
        yTo(gsap.utils.clamp(-MAX_PULL, MAX_PULL, dy))
      } else {
        xTo(0)
        yTo(0)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  function handleMouseEnter() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sheenRef.current) return
    gsap.fromTo(sheenRef.current, { xPercent: -120 }, { xPercent: 220, duration: 0.6, ease: 'power2.out' })
  }

  return (
    <a
      ref={ref}
      {...rest}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'relative inline-flex items-center gap-2 px-5 py-2 text-[12px] tracking-[0.1em] uppercase overflow-hidden',
        'backdrop-blur-[12px] backdrop-saturate-[1.4] border border-[rgba(245,241,232,0.16)] hover:border-[rgba(245,241,232,0.32)]',
        'transition-colors duration-200',
        variant === 'filled'
          ? 'font-semibold bg-[rgba(245,241,232,0.08)] hover:bg-[rgba(245,241,232,0.14)] text-[var(--bp-slate-fg)]'
          : 'bg-transparent hover:bg-[rgba(245,241,232,0.05)] text-[#c9c6ba] hover:text-[var(--bp-slate-fg)]',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: '120px 120px',
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />
      <span
        ref={sheenRef}
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent)',
          transform: 'translateX(-120%)',
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  )
}
