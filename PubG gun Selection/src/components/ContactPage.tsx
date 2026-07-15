import { Paper, Text, Title } from '@mantine/core'

export function ContactPage() {
  return (
    <Paper id="contact" p="xl" radius="xl" className="panel-card" mt="lg">
      <Title order={2}>Contact</Title>
      <Text c="dimmed" mt="xs">
        Reach out if you want a custom loadout page, more sections or a full PUBG-style
        experience.
      </Text>
      <Text mt="sm">
        <a href="mailto:contact@pubgloadout.com">contact@pubgloadout.com</a>
      </Text>
      <Text mt="xs">
        <a href="tel:+491701234567">+49 170 1234567</a>
      </Text>
    </Paper>
  )
}
