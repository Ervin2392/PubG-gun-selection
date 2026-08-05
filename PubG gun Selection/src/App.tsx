import { MantineProvider, Text, Title } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopNavigation } from './components/TopNavigation'
import { AppRoutes } from './routes/AppRoutes'
import { navItems } from './utils/content'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />

        <BrowserRouter>
          <div className="app-shell">
            <header className="topbar">
              <div>
                <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
                  PUBG Weapons Overview
                </Text>

                <Title order={2}>PUBG Weapons Overview</Title>
              </div>

              <TopNavigation items={navItems} />
            </header>

            <main className="main-content">
              <AppRoutes />
            </main>
          </div>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
