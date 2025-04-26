import { create } from 'zustand'
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

export const useStore = create<Store>((set) => ({
  songs: [],
  categories: [],
  isLoading: false,
  error: null,
  fetchSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const firestore = getFirestore()
      const songs = await getDocs(
        query(
          collection(firestore, 'songs')
        )
      )
      set({ 
        songs: songs.docs.map(doc => ({ 
          id: doc.id, 
          category: doc.data().category ?? null,
          cover_image: doc.data().cover_image ?? null,
          created_at: doc.data().created_at ?? '',
          lyrics: doc.data().lyrics ?? null,
          style: doc.data().style ?? null,
          tempo: doc.data().tempo ?? null,
          title: doc.data().title ?? '',
          transpose: doc.data().transpose ?? null,
        })),
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch songs',
        isLoading: false 
      })
    }
  },
  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const firestore = getFirestore()
      const categories = await getDocs(
        query(
          collection(firestore, 'categories')
        )
      )
      set({ 
        categories: categories.docs.map(doc => ({ 
          id: doc.id, 
          name: doc.data().name 
        })).sort((a, b) => a.name.localeCompare(b.name)),
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        isLoading: false 
      })
    }
  },
  addSong: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const firestore = getFirestore()
      await addDoc(collection(firestore, 'songs'), {
        ...data,
        created_at: new Date().toISOString(),
      })
      set({ isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add song',
        isLoading: false 
      })
    }
  },
  updateSong: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const firestore = getFirestore()
      await updateDoc(doc(firestore, 'songs', id), data)
      set({ isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update song',
        isLoading: false 
      })
    }
  }
})) 