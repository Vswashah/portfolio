import { cn } from '@/lib/utils'

interface SheetStatementProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color: string
}

export default function SheetStatement({ color, className, style, children, ...rest }: SheetStatementProps) {
  return (
    <h2
      {...rest}
      className={cn('font-semibold leading-[1.05] tracking-[-0.02em]', className)}
      style={{
        fontFamily: 'var(--ff-plex-sans)',
        color,
        fontSize: 'clamp(40px, 6.5vw, 84px)',
        ...style,
      }}
    >
      {children}
    </h2>
  )
}
