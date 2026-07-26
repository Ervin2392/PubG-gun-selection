import {
  Anchor,
  Breadcrumbs,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { ContentCarousel } from '../components/ContentCarousel'
import { breadcrumbItems as breadcrumbData, slides } from '../utils/content'

export function HomePage() {
  const breadcrumbItems = breadcrumbData.map((item) => (
    <Anchor component={Link} to={item.href.replace('#', '/')} key={item.label}>
      {item.label}
    </Anchor>
  ))

  return (
    <>
      

      <Paper id="overview" p="xl" radius="xl" className="panel-card">
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
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
