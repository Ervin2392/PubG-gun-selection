import { Card, SimpleGrid, Text, Title } from '@mantine/core'

interface FeatureCardItem {
  title: string
  text: string
}

interface FeatureCardsProps {
  items: FeatureCardItem[]
}

export function FeatureCards({ items }: FeatureCardsProps) {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="lg">
      {items.map((card) => (
        <Card key={card.title} radius="lg" className="info-card">
          <Title order={3} size="h4">
            {card.title}
          </Title>
          <Text c="dimmed" mt="xs">
            {card.text}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  )
}
