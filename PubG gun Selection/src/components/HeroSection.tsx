import { Badge, Button, Group, Text, Title } from '@mantine/core'

interface HeroSectionProps {
  badge: string
  title: string
  description: string
}

export function HeroSection({ badge, title, description }: HeroSectionProps) {
  return (
    <section id="home" className="hero-panel">
      <Badge color="orange" variant="light" size="lg">
        {badge}
      </Badge>
      <Title order={1}>{title}</Title>
      <Text size="lg" c="dimmed" maw={680}>
        {description}
      </Text>
      <Group gap="sm" mt="md">
        <Button component="a" href="#overview">
          Explore gallery
        </Button>
        <Button variant="default" component="a" href="#about">
          Learn more
        </Button>
      </Group>
    </section>
  )
}
