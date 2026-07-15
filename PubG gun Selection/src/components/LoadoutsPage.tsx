import { Paper, Text, Title } from '@mantine/core'

export function LoadoutsPage() {
  return (
    <Paper id="loadouts" p="xl" radius="xl" className="panel-card">
      <Title order={2}>Loadouts</Title>
      <Text c="dimmed" mt="xs">
        Explore your favorite loadouts and weapon combinations here.
      </Text>
    </Paper>
  )
}
