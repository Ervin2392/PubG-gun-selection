import { Paper, Text, Title } from '@mantine/core'

export function AboutPage() {
  return (
    <Paper id="about" p="xl" radius="xl" className="panel-card">
      <Title order={2}>About</Title>
      <Text c="dimmed" mt="xs">
        PUBG Weapons Overview is a responsive web application designed to help PUBG players compare weapons, explore detailed statistics, and build effective loadouts. The project focuses on a clean user experience, intuitive navigation, and modern frontend development.
        <br />
        This application was developed with React, TypeScript, and Vite using Mantine UI.
      </Text>
    </Paper>
  )
}
