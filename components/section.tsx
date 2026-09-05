import { cn } from '@/lib/utils'

type SectionProps = React.ComponentProps<'section'> & {
  eyebrow?: string
  bleed?: boolean
}

export function Section({ eyebrow, bleed, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn('relative border-t border-border', bleed ? '' : 'py-24 md:py-36', className)}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {children}
        </div>
      )}
    </section>
  )
}

export function Eyebrow({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'mb-8 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent uppercase',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {props.children}
    </p>
  )
}

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)} {...props} />
}
