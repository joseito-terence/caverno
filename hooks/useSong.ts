import { useStore } from '@/store/useStore'

export const useSong = (id: string) => {
  const { songs } = useStore()
  return songs.find(song => song.id === id)
}
