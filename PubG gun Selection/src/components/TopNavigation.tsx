import { Anchor, Burger, Drawer, Stack } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export interface NavItem {
  label: string
  href: string
}

interface TopNavigationProps {
  items: NavItem[]
}

export function TopNavigation({ items }: TopNavigationProps) {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/' || location.pathname === '/home'
    }

    return location.pathname === href
  }

  return (
    <>
      <nav className="top-nav" aria-label="Top navigation">
        {items.map((item) => (
          <Anchor
            key={item.label}
            component={Link}
            to={item.href}
            className={`nav-link${isActive(item.href) ? ' active' : ''}`}
          >
            {item.label}
          </Anchor>
        ))}
      </nav>

      <Burger
        opened={drawerOpened}
        onClick={() => setDrawerOpened((opened) => !opened)}
        size="sm"
        className="mobile-burger"
        aria-label={drawerOpened ? 'Close navigation' : 'Open navigation'}
      />

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        withCloseButton={false}
        size="xs"
        padding="xl"
        position="left"
        overlayProps={{ opacity: 0.7 }}
      >
        <Stack gap="md">
          {items.map((item) => (
            <Anchor
              key={item.label}
              component={Link}
              to={item.href}
              className={`drawer-link${isActive(item.href) ? ' active' : ''}`}
              onClick={() => setDrawerOpened(false)}
            >
              {item.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </>
  )
}
