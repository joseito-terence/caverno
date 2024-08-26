import { View, Text, ScrollView, ActivityIndicator, TextProps } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, SubmitHandler } from "react-hook-form"
import InputController from '@/components/InputController'
import { supabase } from '@/utils/supabase'
import { unsplash } from '@/utils/unsplash'
import { useQueryClient } from '@tanstack/react-query'
import SelectDropdown from 'react-native-select-dropdown'
import { useCategories } from '@/hooks/useCategories'

const DEFAULT_VALUES = {
  title: '',
  style: '',
  tempo: 0,
  transpose: 0,
  category: '',
  lyrics: '',
}

export type TSong = typeof DEFAULT_VALUES;

type SongFormProps = {
  edit: true;
  song: TSong & { id: string };
} | {
  edit?: false;
}

export default function SongForm(props: SongFormProps) {
  const isEdit = props.edit === true
  const queryClient = useQueryClient()
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: isEdit ? props.song : DEFAULT_VALUES,
  })

  const onSubmit: SubmitHandler<typeof control._defaultValues> = async (data) => {
    if (process.env.EXPO_PUBLIC_READ_ONLY === 'true') {
      return console.warn('Read-only mode')
    }

    if (!isDirty) return;
    if (isEdit) {
      console.warn('edit')
      return supabase.from('songs').update({
        ...data,
        title: data.title!,
      })
        .eq('id', props.song.id)
        .then(() => {
          queryClient.refetchQueries({ queryKey: ['songs'] })
          router.back()
        })
    }

    const result = await unsplash.photos.getRandom({ query: 'music' })

    if (result.type === 'error') return;

    return supabase.from('songs').insert({
      ...data,
      title: data.title!,
      // @ts-ignore
      cover_image: result.response.urls.regular!,
    })
      .then(() => {
        queryClient.refetchQueries({ queryKey: ['songs'] })
        router.back()
      })
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
          {isSubmitting
            ? <ActivityIndicator color='white' />
            : <AntDesign name="check" size={22} color="white" />
          }
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
              disabled={isSubmitting}
            />

            <InputController
              name='style'
              placeholder='Style* (e.g. Rock, Pop, Hip-Hop)'
              control={control}
              errors={errors}
              disabled={isSubmitting}
            />

            <InputController
              name='tempo'
              placeholder='Tempo* (e.g. 120 BPM)'
              control={control}
              errors={errors}
              disabled={isSubmitting}
            />

            <InputController
              name='transpose'
              placeholder='Transpose* (e.g. -4)'
              control={control}
              errors={errors}
              disabled={isSubmitting}
            />

            <View className='mt-8'>
              <CategoryPicker
                defaultValue={isEdit ? props.song.category : undefined}
                setSelected={(val) => setValue('category', val)}
              />
            </View>

            <InputController
              name='lyrics'
              placeholder={`Lyrics
(e.g. Verse 1: ...)`}
              control={control}
              errors={errors}
              multiline
              disabled={isSubmitting}
              className='text-white text-sm'
            />
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export const CategoryPicker = ({
  setSelected,
  defaultValueByIndex,
  defaultValue,
  titleProps,
  optionTextProps,
  showIndicator = false,
}: {
  setSelected: (val: string) => void;
  defaultValueByIndex?: number;
  defaultValue?: string;
  titleProps?: TextProps;
  optionTextProps?: TextProps;
  showIndicator?: boolean;
}) => {
  const categories = useCategories()

  const data = categories.data?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }))

  return (
    <SelectDropdown
      data={data ?? []}
      defaultValue={defaultValue}
      defaultValueByIndex={defaultValueByIndex}
      onSelect={(selectedItem) => setSelected(selectedItem.value)}
      renderButton={(selectedItem) => {
        return (
          <View className=''>
            {selectedItem ? (
              <Text className='text-white text-2xl' {...titleProps}>
                {selectedItem.label} {showIndicator && <AntDesign name="caretdown" size={24} color="white" />}
              </Text>
            ) : (
              <Text className='text-white/30 text-2xl'>
                Select Category
              </Text>
            )}
            
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => {
        return (
          <View style={{ ...(isSelected && { backgroundColor: '#141e22' }) }}>
            <Text className='p-2 text-white' {...optionTextProps}>{item.label}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        backgroundColor: '#303030',
        borderRadius: 8,
      }}
    />
  )
}
