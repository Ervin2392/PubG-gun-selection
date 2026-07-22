import {
  MantineProvider,
  Text,
  Title,
} from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarNavigation } from './components/SidebarNavigation'
import { TopNavigation } from './components/TopNavigation'
import { AppRoutes } from './routes/AppRoutes'
import { navItems } from './utils/content'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <div className="app-shell">
            <header className="topbar">
              <div>
                <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
                  PUBG Gun Selection
                </Text>
                <Title order={2}>PubG Gun Selection</Title>
              </div>
              <TopNavigation items={navItems} />
            </header>

            <div className="content-grid">
              <SidebarNavigation items={navItems} />

              <main className="main-content">
                <AppRoutes />
              </main>
            </div>
          </div>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
