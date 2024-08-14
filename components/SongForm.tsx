import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, SubmitHandler } from "react-hook-form"
import InputController from '@/components/InputController'
import { supabase } from '@/utils/supabase'
import { unsplash } from '@/utils/unsplash'

const DEFAULT_VALUES = {
  title: '',
  style: '',
  tempo: 0,
  transpose: 0,
  category: '',
  lyrics: '',
}

type TSong = typeof DEFAULT_VALUES;

type SongFormProps = {
  edit: true;
  song: TSong;
} | {
  edit?: false;
}

export default function SongForm(props: SongFormProps) {
  const isEdit = props.edit === true
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? props.song : DEFAULT_VALUES,
  })

  const onSubmit: SubmitHandler<typeof control._defaultValues> = async (data) => {
    console.warn(data)

    const result = await unsplash.photos.getRandom({ query: 'music' })
    
    if (result.type === 'error') return;

    supabase.from('songs').insert({
      ...data,
      title: data.title!,
      // @ts-ignore
      cover_image: result.response.urls.regular,
    }).then(router.back)
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>
          {isEdit ? 'Edit' : 'Add'}
        </Text>

        <Button onPress={handleSubmit(onSubmit)}>
          <AntDesign name="check" size={22} color="white" />
        </Button>
      </View>

      <View className='flex-1'>
        <ScrollView keyboardDismissMode='on-drag'>
          <View className='px-8 pt-4 gap-8'>
            <InputController
              name='title'
              placeholder='Title of the Song*'
              className='text-white text-3xl'
              control={control}
              errors={errors}
              multiline
              required
            />

            <InputController
              name='style'
              placeholder='Style* (e.g. Rock, Pop, Hip-Hop)'
              control={control}
              errors={errors}
            />

            <InputController
              name='tempo'
              placeholder='Tempo* (e.g. 120 BPM)'
              control={control}
              errors={errors}
              required
            />

            <InputController
              name='transpose'
              placeholder='Transpose* (e.g. -4)'
              control={control}
              errors={errors}
              required
            />

            <InputController
              name='category'
              placeholder='Category'
              control={control}
              errors={errors}
            />

            <InputController
              name='lyrics'
              placeholder={`Lyrics
(e.g. Verse 1: ...)`}
              control={control}
              errors={errors}
              multiline
            />
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}
