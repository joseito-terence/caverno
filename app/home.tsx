import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Button } from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient'
import SongsCarousel from '@/components/SongsCarousel'
import { useRouter } from 'expo-router'
import { CategoryPicker } from '@/components/SongForm'
import { useStore } from '@/store/useStore'
import { Image } from 'expo-image'

const SCREEN = Dimensions.get('screen')

export default function Home() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const { categories, songs, isLoading } = useStore()



  const defaultCategory = categories?.[0]?.id
  const category = selectedCategory || defaultCategory
  const filteredSongs = category 
    ? songs.filter(song => song.category === category)
    : songs

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={() => router.push('/songs/add')}>
          <Entypo name="plus" size={24} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          Home
        </Text>

        <Button>
          <Entypo name="magnifying-glass" size={22} color="white" />
        </Button>
      </View>

      <View className='flex-1 rounded-t-[55px] mt-8 bottom-0 overflow-hidden z-20'>
        <Image
          source='https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          style={{
            width: SCREEN.width,
            height: SCREEN.height,
            position: 'absolute',
          }}
        />
        <LinearGradient
          colors={['#1a0f3d', 'transparent', '#000000']}
          className='absolute top-0 left-0 bottom-0 right-0'
          style={{
            width: SCREEN.width,
            height: SCREEN.height,
          }}
        />
        <View
          style={{
            height: SCREEN.height - 250,
            zIndex: 1000000000,
          }}
        >
          <View className='flex-row items-center p-8 pt-6 mt-4'>
            <View className='flex-1'>
              <CategoryPicker
                defaultValueByIndex={0}
                setSelected={setSelectedCategory}
                titleProps={{ className: 'text-white text-3xl font-semibold' }}
                optionTextProps={{ className: 'p-4 text-white text-xl' }}
                showIndicator
              />
            </View>

            <TouchableOpacity>
              <Text className='text-white/60 text-lg font-semibold pl-8'>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View className='flex-1 items-center justify-center'>
            {isLoading ? (
              <Text className='text-white'>Loading...</Text>
            ) : (
              <SongsCarousel songs={filteredSongs} />
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
