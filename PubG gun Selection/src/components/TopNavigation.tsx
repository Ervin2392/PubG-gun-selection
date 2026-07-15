import { Anchor } from '@mantine/core'
import { Link } from 'react-router-dom'

export interface NavItem {
  label: string
  href: string
}

interface TopNavigationProps {
  items: NavItem[]
}

export function TopNavigation({ items }: TopNavigationProps) {
  return (
    <nav className="top-nav" aria-label="Top navigation">
      {items.map((item) => (
        <Anchor key={item.label} component={Link} to={item.href.replace('#', '/')} className="nav-link">
          {item.label}
        </Anchor>
      ))}
    </nav>
  )
}
