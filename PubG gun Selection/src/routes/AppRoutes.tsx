import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '../components/AboutPage'
import { ContactPage } from '../components/ContactPage'
import { GunSelectionPage } from '../components/GunSelectionPage'
import { HomePage } from '../pages/HomePage'
import { LoadoutsPage } from '../components/LoadoutsPage'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/gun-selection" element={<GunSelectionPage />} />
      <Route path="/loadouts" element={<LoadoutsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
