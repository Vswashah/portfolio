import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--bg)]">
      <span className="font-mono text-[13px] tracking-[0.15em] uppercase text-[var(--accent)] mb-4">
        404 — Not Found
      </span>
      <h1 className="text-[clamp(32px,6vw,56px)] font-bold tracking-[-0.02em] mb-4 text-[var(--t1)]">
        This route doesn't exist.
      </h1>
      <p className="text-[16px] text-[var(--t2)] max-w-[440px] mb-10">
        The page you're looking for was never built, or it moved. Head back
        to the homepage instead.
      </p>
      <Link
        href="/"
        className="font-mono text-[13px] px-5 py-3 rounded-[8px] border border-[var(--hair)] bg-[var(--surface)] text-[var(--t1)] transition-colors hover:border-[rgba(77,124,255,0.3)] hover:bg-[rgba(77,124,255,0.06)]"
      >
        ← Back to home
      </Link>
    </main>
  )
}
