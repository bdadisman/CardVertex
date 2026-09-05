import { cn } from '@/lib/utils'

type MarqueeProps = {
  items: readonly string[]
  label: string
  className?: string
}

function Row({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 pr-10 font-display text-2xl font-medium tracking-tight whitespace-nowrap text-muted-foreground md:text-3xl"
        >
          <span>{item}</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  )
}

export function Marquee({ items, label, className }: MarqueeProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn(
        'group overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div className="marquee flex w-max will-change-transform group-hover:[animation-play-state:paused]">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  )
}
