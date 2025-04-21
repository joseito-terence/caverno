import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, collection, query, getDocs, doc, updateDoc, addDoc } from '@react-native-firebase/firestore'

export interface Song {
  id: string
  category: string | null
  cover_image: string | null
  created_at: string
  lyrics: string | null
  style: string | null
  tempo: number | null
  title: string
  transpose: number | null
}

interface Category {
  id: string
  name?: string
}

interface Store {
  songs: Song[]
  categories: Category[]
  isLoading: boolean
  error: string | null
  fetchSongs: () => Promise<void>
  fetchCategories: () => Promise<void>
  addSong: (data: Omit<Song, 'id' | 'created_at'>) => Promise<void>
  updateSong: (id: string, data: Partial<Song>) => Promise<void>
}

const fetchSongsFromFirestore = async () => {
  const firestore = getFirestore()
  const songs = await getDocs(query(collection(firestore, 'songs')))
  return songs.docs.map(doc => ({
    id: doc.id,
    category: doc.data().category ?? null,
    cover_image: doc.data().cover_image ?? null,
    created_at: doc.data().created_at ?? '',
    lyrics: doc.data().lyrics ?? null,
    style: doc.data().style ?? null,
    tempo: doc.data().tempo ?? null,
    title: doc.data().title ?? '',
    transpose: doc.data().transpose ?? null,
  }))
}

const fetchCategoriesFromFirestore = async () => {
  const firestore = getFirestore()
  const categories = await getDocs(query(collection(firestore, 'categories')))
  return categories.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  })).sort((a, b) => a.name.localeCompare(b.name))
}

const addSongToFirestore = async (data: Omit<Song, 'id' | 'created_at'>) => {
  const firestore = getFirestore()
  await addDoc(collection(firestore, 'songs'), {
    ...data,
    created_at: new Date().toISOString(),
  })
}

const updateSongInFirestore = async (id: string, data: Partial<Song>) => {
  const firestore = getFirestore()
  await updateDoc(doc(firestore, 'songs', id), data)
}

export const useStore = (): Store => {
  const queryClient = useQueryClient()

  const { data: songs = [], isLoading: isLoadingSongs, error: songsError } = useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongsFromFirestore,
  })

  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoriesFromFirestore,
  })

  const addSongMutation = useMutation({
    mutationFn: addSongToFirestore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  const updateSongMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Song> }) => updateSongInFirestore(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  return {
    songs,
    categories,
    isLoading: isLoadingSongs || isLoadingCategories || addSongMutation.isPending || updateSongMutation.isPending,
    error: songsError?.message || categoriesError?.message || addSongMutation.error?.message || updateSongMutation.error?.message || null,
    fetchSongs: async () => {
      await queryClient.prefetchQuery({
        queryKey: ['songs'],
        queryFn: fetchSongsFromFirestore,
      })
    },
    fetchCategories: async () => {
      await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: fetchCategoriesFromFirestore,
      })
    },
    addSong: async (data) => {
      await addSongMutation.mutateAsync(data)
    },
    updateSong: async (id, data) => {
      await updateSongMutation.mutateAsync({ id, data })
    },
  }
} 