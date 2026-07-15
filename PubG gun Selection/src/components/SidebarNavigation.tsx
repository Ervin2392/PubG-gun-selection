import { Anchor, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

interface SidebarNavigationProps {
  items: Array<{ label: string; href: string }>
}

export function SidebarNavigation({ items }: SidebarNavigationProps) {
  return (
    <aside className="sidebar">
      <Stack gap="xs">
        <Text fw={700} size="sm" tt="uppercase" c="dimmed">
          Navigation
        </Text>
        {items.map((item) => (
          <Anchor key={item.label} component={Link} to={item.href.replace('#', '/')} className="sidebar-link">
            {item.label}
          </Anchor>
        ))}
      </Stack>
    </aside>
  )
}
