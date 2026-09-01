import { useEffect, useState } from 'react'

const STORAGE_KEY = 'pubg-favorite-weapons'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY)

    if (!storedFavorites) {
      return []
    }

    try {
      return JSON.parse(storedFavorites) as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (weaponId: string) => {
    return favorites.includes(weaponId)
  }

  const toggleFavorite = (weaponId: string) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(weaponId)) {
        return currentFavorites.filter((id) => id !== weaponId)
      }

      return [...currentFavorites, weaponId]
    })
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  }
}