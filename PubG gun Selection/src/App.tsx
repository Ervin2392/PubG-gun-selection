import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopNavigation } from './components/TopNavigation'
import { AppRoutes } from './routes/AppRoutes'
import { navItems } from './utils/content'
import { Analytics } from '@vercel/analytics/react'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />
        <Analytics />
        <BrowserRouter>
          <div className="app-shell">
            <header className="topbar">
              <Link
                to="/"
                className="app-brand"
                aria-label="Go to homepage"
              >
                <span className="app-brand__pubg">PUBG</span>

                <span className="app-brand__subtitle">
                  Weapons Overview
                </span>
              </Link>

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