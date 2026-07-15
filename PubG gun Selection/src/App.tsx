import {
  Anchor,
  Breadcrumbs,
  MantineProvider,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import './App.css'
import { ContactPage } from './components/ContactPage'
import { ContentCarousel } from './components/ContentCarousel'
import { FeatureCards } from './components/FeatureCards'
import { HeroSection } from './components/HeroSection'
import { SidebarNavigation } from './components/SidebarNavigation'
import { TopNavigation } from './components/TopNavigation'
import { breadcrumbItems as breadcrumbData, featureCards, navItems, slides } from './utils/content'

function App() {
  const [activeView, setActiveView] = useState<'home' | 'contact'>('home')

  const breadcrumbItems = breadcrumbData.map((item) => (
    <Anchor href={item.href} key={item.label}>
      {item.label}
    </Anchor>
  ))

  const handleNavigate = (href: string) => {
    if (href === '#contact') {
      setActiveView('contact')
      return
    }

    setActiveView('home')
  }

  return (
    <MantineProvider defaultColorScheme="dark">
      <div className="app-shell">
        <header className="topbar">
          <div>
            <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
              PUBG Gun Selection
            </Text>
            <Title order={2}>Landing Page</Title>
          </div>
          <TopNavigation items={navItems} onNavigate={handleNavigate} />
        </header>

        <div className="content-grid">
          <SidebarNavigation items={navItems} onNavigate={handleNavigate} />

          <main className="main-content">
            {activeView === 'contact' ? (
              <ContactPage />
            ) : (
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
                    The layout keeps the main action visible while the sidebar and top navigation
                    guide the user through the experience. The carousel adds motion and makes the
                    content feel more interactive.
                  </Text>
                </Paper>
              </>
            )}
          </main>
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
