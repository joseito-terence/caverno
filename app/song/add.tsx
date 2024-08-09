import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Add() {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          Add
        </Text>

        <Button onPress={() => {}}>
          <AntDesign name="check" size={22} color="white" />
        </Button>
      </View>

      <View className='flex-1'>

      </View>
      
    </SafeAreaView>
  )
}
