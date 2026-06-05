export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] py-12 relative z-10">
      <div className="max-w-[1180px] mx-auto px-10 flex justify-between items-start flex-wrap gap-6">
        <div>
          <h3 className="text-[17px] font-semibold">Vishwaa Shah</h3>
          <p className="mt-3 text-[13px] text-[var(--t3)] leading-relaxed">
            AI Engineer · Software Developer · Builder<br />
            Dallas, TX — MS Computer Science @ UT Dallas
          </p>
        </div>
        <div className="text-right">
          <div className="flex justify-end gap-6 flex-wrap mb-3.5">
            {[
              { label: 'Email', href: 'mailto:vishwaa.career@gmail.com', external: false },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishwaa-shah', external: true },
              { label: 'GitHub', href: 'https://github.com/Vswashah', external: true },
              { label: 'Résumé', href: '/resume.pdf', external: true },
            ].map((l) => (
              <a key={l.label} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} className="text-[14px] text-[var(--t2)] hover:text-[var(--t1)] transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-[13px] text-[var(--t3)]">© 2026 · Designed & built with intent.</p>
        </div>
      </div>
    </footer>
  )
}