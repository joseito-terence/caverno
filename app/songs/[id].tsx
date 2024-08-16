import React from 'react'
import { View, Text, Image } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { supabase } from '@/utils/supabase'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'

const CARD_SIZE = 300

export default function Song() {
  const { id } = useLocalSearchParams()
  const { data: song } = useQuery({
    queryKey: ['songs', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()
      return data
    },
  })

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>

        </Text>
        <View className='w-5' />
      </View>

      <View className='flex-1 items-center justify-center'>
        <View
          className='bg-gray-800 rounded-[20px] overflow-hidden'
          style={{ width: CARD_SIZE, height: CARD_SIZE }}
        >
          <Image
            source={{ uri: song?.cover_image! }}
            width={CARD_SIZE}
            height={CARD_SIZE}
            className='rounded-[20px] absolute'
            resizeMode='cover'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
