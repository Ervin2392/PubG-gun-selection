import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '../components/AboutPage'
import { ContactPage } from '../components/ContactPage'
import { HomePage } from '../pages/HomePage'
import { LoadoutsPage } from '../components/LoadoutsPage'
import { OverviewPage } from '../components/OverviewPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/overview" element={<OverviewPage />} />
      <Route path="/loadouts" element={<LoadoutsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
