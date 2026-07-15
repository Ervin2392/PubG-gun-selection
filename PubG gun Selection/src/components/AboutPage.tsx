import { Paper, Text, Title } from '@mantine/core'

export function AboutPage() {
  return (
    <Paper id="about" p="xl" radius="xl" className="panel-card">
      <Title order={2}>About</Title>
      <Text c="dimmed" mt="xs">
        Learn more about the concept behind this modern PUBG-style landing experience.
      </Text>
    </Paper>
  )
}
