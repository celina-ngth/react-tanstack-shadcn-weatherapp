import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './useLocalStorage'

interface FavoriteCity {
  id: string
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  addedAt: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    'favorites',
    []
  )
  const queryClient = useQueryClient()

  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity
  })

  const addToFavorites = useMutation({
    mutationFn: async (
      favorite: Omit<FavoriteCity, 'id' | 'addedAt'>
    ) => {
      const newFavoriteCity: FavoriteCity = {
        ...favorite,
        id: `${favorite.lat}-${favorite.lon}}`,
        addedAt: Date.now(),
      }

      const exists = favorites.some((favorite) => favorite.id === newFavoriteCity.id)
      if (exists) return favorites

      const newFavorites = [newFavoriteCity, ...favorites].slice(0, 10)
      setFavorites(newFavorites)

      return newFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      })
    },
  })

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId)
      setFavorites(newFavorites)

      return newFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      })
    },
  })

  return {
    favorites: favoritesQuery.data ?? [],
    addToFavorites,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      return favorites.some((city) => city.lat === lat && city.lon === lon)
    }
  }
}
