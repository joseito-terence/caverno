import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { Button } from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo'
import ZStack from '@/components/ZStack'
import { LinearGradient } from 'expo-linear-gradient'

const SCREEN = Dimensions.get('screen')

export default function Home() {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button>
          <Entypo name="plus" size={24} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          Home
        </Text>

        <Button>
          <Entypo name="magnifying-glass" size={22} color="white" />
        </Button>
      </View>

      <View className='flex-1 bg-gray-500 rounded-t-[55px] mt-8 overflow-hidden'>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          width={SCREEN.width}
          height={SCREEN.height}
          className='absolute top-0 left-0 bottom-0 right-0'
        />
        <LinearGradient
          colors={['#303030', 'transparent', '#303030']}
          className='absolute top-0 left-0 bottom-0 right-0'
          style={{
            width: SCREEN.width,
            height: SCREEN.height - 150,
          }}
        />
        <View>
          <View className='flex-row items-center p-8 pt-6'>
            <Text className='flex-1 text-white text-4xl font-semibold mt-4'>
              Recently Played
            </Text>

            <Text className='text-white text-lg font-semibold mt-4 pl-8'>
              See all
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
