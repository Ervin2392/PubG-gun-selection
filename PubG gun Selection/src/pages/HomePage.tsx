import {
  Anchor,
  Breadcrumbs,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { ContentCarousel } from '../components/ContentCarousel'
import { FeatureCards } from '../components/FeatureCards'
import { HeroSection } from '../components/HeroSection'
import { breadcrumbItems as breadcrumbData, featureCards, slides } from '../utils/content'

export function HomePage() {
  const breadcrumbItems = breadcrumbData.map((item) => (
    <Anchor component={Link} to={item.href.replace('#', '/')} key={item.label}>
      {item.label}
    </Anchor>
  ))

  return (
    <>
      <HeroSection
        badge="New landing experience"
        title="Build your best loadout with a modern, clear layout"
        description="This page combines a left-side navigation, top links, breadcrumbs and a powerful image carousel to present gameplay choices in a polished way."
      />

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

      <FeatureCards items={featureCards} />

      <Paper id="about" p="xl" radius="xl" className="panel-card" mt="lg">
        <Title order={2}>Why this layout works</Title>
        <Text c="dimmed" mt="xs">
          The layout keeps the main action visible while the sidebar and top navigation guide the
          user through the experience. The carousel adds motion and makes the content feel more
          interactive.
        </Text>
      </Paper>
    </>
  )
}
