import axios from 'axios'
import type { Gun, GunInput } from './gunSchema'
import { fakeFunsData } from './fakeData'

// In-memory storage für die Demonstration
let gunsStore: Gun[] = [...fakeFunsData]

// Erstelle einen axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

// Simuliere eine leichte Verzögerung
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// GET - Alle Guns abrufen
export const fetchGuns = async (): Promise<Gun[]> => {
  await delay(300)
  return gunsStore
}

// GET - Eine einzelne Gun abrufen
export const fetchGunById = async (id: number): Promise<Gun> => {
  await delay(200)
  const gun = gunsStore.find((g) => g.id === id)
  if (!gun) {
    throw new Error(`Gun mit ID ${id} nicht gefunden`)
  }
  return gun
}

// POST - Neue Gun erstellen
export const createGun = async (gunData: GunInput): Promise<Gun> => {
  await delay(300)
  const newGun: Gun = {
    ...gunData,
    id: Math.max(...gunsStore.map((g) => g.id), 0) + 1,
  }
  gunsStore.push(newGun)
  return newGun
}

// PUT - Gun aktualisieren
export const updateGun = async (id: number, gunData: GunInput): Promise<Gun> => {
  await delay(300)
  const index = gunsStore.findIndex((g) => g.id === id)
  if (index === -1) {
    throw new Error(`Gun mit ID ${id} nicht gefunden`)
  }
  const updatedGun: Gun = { ...gunData, id }
  gunsStore[index] = updatedGun
  return updatedGun
}

// DELETE - Gun löschen
export const deleteGun = async (id: number): Promise<{ success: boolean; id: number }> => {
  await delay(300)
  const index = gunsStore.findIndex((g) => g.id === id)
  if (index === -1) {
    throw new Error(`Gun mit ID ${id} nicht gefunden`)
  }
  gunsStore.splice(index, 1)
  return { success: true, id }
}

export default apiClient
