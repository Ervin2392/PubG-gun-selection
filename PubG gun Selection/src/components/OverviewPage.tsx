import { Paper, Text, Title } from '@mantine/core'

export function OverviewPage() {
  return (
    <Paper id="overview" p="xl" radius="xl" className="panel-card">
      <Title order={2}>Overview</Title>
      <Text c="dimmed" mt="xs">
        This is the dedicated overview page for your weapon selection experience.
      </Text>
    </Paper>
  )
}
