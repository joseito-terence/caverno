import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, Controller } from "react-hook-form"

export default function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      style: '',
      tempo: '',
      category: '',
      lyrics: '',
    },
  })

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          Add
        </Text>

        <Button onPress={() => { }}>
          <AntDesign name="check" size={22} color="white" />
        </Button>
      </View>

      <View className='flex-1'>
        <ScrollView keyboardDismissMode='on-drag'>
          <View className='px-8 gap-8'>
            <TextInput
              placeholder='Title of the Song'
              className='text-white  py-4 text-3xl'
              multiline
            />

            <TextInput
              placeholder='Style (e.g. Rock, Pop, Hip-Hop)'
              className='text-white text-2xl'
            />

            <TextInput
              placeholder='Tempo (e.g. 120 BPM)'
              className='text-white text-2xl'
            />

            <TextInput
              placeholder='Category'
              className='text-white text-2xl'
            />

            <TextInput
              placeholder={`Lyrics
(e.g. Verse 1: ...)`}
              className='text-white text-2xl'
              multiline
            />
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}
