import {
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { ContentCarousel } from '../components/ContentCarousel'
import { slides } from '../utils/content'

export function HomePage() {
  return (
    <>
      <Paper id="overview" p="xl" radius="xl" className="panel-card">
       
        <Title order={2} mt="md">
          Featured weapon stories
        </Title>
        <Text c="dimmed" mt="xs">
          Swipe through the highlights and discover different weapon styles.
        </Text>

        <ContentCarousel slides={slides} />
      </Paper>
    </>
  )
}
