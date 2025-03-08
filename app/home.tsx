import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Button } from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient'
import SongsCarousel from '@/components/SongsCarousel'
import { MotiView } from 'moti'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { CategoryPicker } from '@/components/SongForm'
import { useCategories } from '@/hooks/useCategories'
import { firebase } from '@react-native-firebase/firestore'

const SCREEN = Dimensions.get('screen')

export default function Home() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const { data: categories } = useCategories()
  const defaultCategory = categories?.[0].id
  const category = selectedCategory || defaultCategory
  const { data } = useQuery({
    queryKey: ['songs', category],
    queryFn: async () => {
        const songs = await firebase
          .firestore()
          .collection('songs')
          .where('category', '==', category!)
          .get()
        return songs.docs.map(doc => doc.data())
    },
  })

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={() => router.push('/songs/add')}>
          <Entypo name="plus" size={24} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          Home
        </Text>

        <Button onPress={() => router.push('/songs')}>
          <Entypo name="magnifying-glass" size={22} color="white" />
        </Button>
      </View>

      <MotiView
        className='flex-1 bg-gray-500 rounded-t-[55px] mt-8 overflow-hidden'
        from={{ translateY: SCREEN.height }}
        animate={{ translateY: 0 }}
        transition={{ type: 'timing', duration: 1000 }}
      >

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          width={SCREEN.width}
          height={SCREEN.height}
          className='absolute top-0 left-0 bottom-0 right-0'
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

            <TouchableOpacity onPress={() => router.push('/songs')}>
              <Text className='text-white/60 text-lg font-semibold pl-8'>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <MotiView
            className='flex-1 items-center justify-center'
            from={{
              opacity: 0,
              rotate: '20deg',
              scale: 0,
            }}
            animate={{
              opacity: 1,
              rotate: '0deg',
              scale: 1,
            }}
            transition={{
              type: 'timing',
              delay: 1000,
              duration: 1000,
            }}
          >
            {/* @ts-ignore */}
            <SongsCarousel songs={data!} />
          </MotiView>
        </View>
      </MotiView>
    </View>
  )
}
