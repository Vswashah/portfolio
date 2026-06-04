'use client'

import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { metrics } from '@/content/metrics'
import { cn } from '@/lib/utils'
import { useRef, useState, useEffect } from 'react'

function MetricCard({ value, suffix, label, index }: {
  value: number
  suffix: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const duration = 1400
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

  return (
    <div
      ref={ref}
      className="p-7 rounded-[14px] bg-[var(--surface)] border border-[var(--hair)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(77,124,255,0.3)]"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-baseline gap-0.5 mb-2">
        <span className="text-[36px] font-bold tracking-[-0.03em] leading-none bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent tabular-nums">
          {count}
        </span>
        <span className="text-[22px] font-bold leading-none bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent">
          {suffix}
        </span>
      </div>
      <div className="text-[13px] text-[var(--t2)] leading-[1.4]">{label}</div>
    </div>
  )
}

export default function Signals() {
  const { ref: headRef, inView: headIn } = useInView()

  return (
    <section className="py-20 bg-[var(--bg2)]" id="signals">
      <div className="max-w-[1180px] mx-auto px-10">

        {/* Head */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('reveal max-w-[700px] mb-16', headIn && 'in')}
        >
          <span className="block text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] font-mono mb-3.5">
            05 — Signals
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.025em]">
            The work, in numbers.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.label}
              value={m.value}
              suffix={m.suffix}
              label={m.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}