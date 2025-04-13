import React from 'react'
import SongForm from '@/components/SongForm'
import { useLocalSearchParams } from 'expo-router'
import { useSong } from '@/hooks/useSong'

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const song = useSong(id)

  return (
    // @ts-ignore
    <SongForm edit song={{ ...song, id }} />
  )
}
