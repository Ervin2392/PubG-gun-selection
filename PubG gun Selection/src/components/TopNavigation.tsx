import { Anchor } from '@mantine/core'

export interface NavItem {
  label: string
  href: string
}

interface TopNavigationProps {
  items: NavItem[]
  onNavigate?: (href: string) => void
}

export function TopNavigation({ items, onNavigate }: TopNavigationProps) {
  return (
    <nav className="top-nav" aria-label="Top navigation">
      {items.map((item) => (
        <Anchor
          key={item.label}
          href={item.href}
          className="nav-link"
          onClick={(event) => {
            event.preventDefault()
            onNavigate?.(item.href)
          }}
        >
          {item.label}
        </Anchor>
      ))}
    </nav>
  )
}
