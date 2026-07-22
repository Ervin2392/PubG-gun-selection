import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Gun, GunInput } from './gunSchema'
import * as api from './api'

const GUNS_QUERY_KEY = ['guns']

// GET - Alle Guns abrufen
export const useGuns = () => {
  return useQuery<Gun[], Error>({
    queryKey: GUNS_QUERY_KEY,
    queryFn: api.fetchGuns,
    staleTime: 1000 * 60 * 5, // 5 Minuten
  })
}

// GET - Einzelne Gun abrufen
export const useGunById = (id: number) => {
  return useQuery<Gun, Error>({
    queryKey: [...GUNS_QUERY_KEY, id],
    queryFn: () => api.fetchGunById(id),
    staleTime: 1000 * 60 * 5,
  })
}

// POST - Neue Gun erstellen
export const useCreateGun = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gunData: GunInput) => api.createGun(gunData),
    onSuccess: (newGun) => {
      // Aktualisiere den Cache
      queryClient.setQueryData(GUNS_QUERY_KEY, (oldData: Gun[] | undefined) => {
        return oldData ? [...oldData, newGun] : [newGun]
      })
    },
  })
}

// PUT - Gun aktualisieren
export const useUpdateGun = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, gunData }: { id: number; gunData: GunInput }) =>
      api.updateGun(id, gunData),
    onSuccess: (updatedGun) => {
      // Aktualisiere den Cache
      queryClient.setQueryData(GUNS_QUERY_KEY, (oldData: Gun[] | undefined) => {
        return oldData
          ? oldData.map((gun) => (gun.id === updatedGun.id ? updatedGun : gun))
          : [updatedGun]
      })
      queryClient.setQueryData([...GUNS_QUERY_KEY, updatedGun.id], updatedGun)
    },
  })
}

// DELETE - Gun löschen
export const useDeleteGun = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.deleteGun(id),
    onSuccess: (result) => {
      // Aktualisiere den Cache
      queryClient.setQueryData(GUNS_QUERY_KEY, (oldData: Gun[] | undefined) => {
        return oldData ? oldData.filter((gun) => gun.id !== result.id) : []
      })
      queryClient.removeQueries({ queryKey: [...GUNS_QUERY_KEY, result.id] })
    },
  })
}
