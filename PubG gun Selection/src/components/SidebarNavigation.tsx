import { Anchor, Stack, Text } from '@mantine/core'

interface SidebarNavigationProps {
  items: Array<{ label: string; href: string }>
  onNavigate?: (href: string) => void
}

export function SidebarNavigation({ items, onNavigate }: SidebarNavigationProps) {
  return (
    <aside className="sidebar">
      <Stack gap="xs">
        <Text fw={700} size="sm" tt="uppercase" c="dimmed">
          Navigation
        </Text>
        {items.map((item) => (
          <Anchor
            key={item.label}
            href={item.href}
            className="sidebar-link"
            onClick={(event) => {
              event.preventDefault()
              onNavigate?.(item.href)
            }}
          >
            {item.label}
          </Anchor>
        ))}
      </Stack>
    </aside>
  )
}
