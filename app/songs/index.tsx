import React, { useMemo, useState } from 'react'
import { View, Text, SectionList, TouchableOpacity, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { Button } from '@/components/Button'
import { supabase } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'

export default function Search() {
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState('')

  const { data } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .order('title', { ascending: true })
      return data
    },
  })

  const sections = useMemo(() => {
    if (!data) return [];

    let songs = data
    // Filter by search keyword
    if (searchKeyword) {
      songs = data.filter(song => song.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    // Group by first letter
    const result = songs.reduce((acc, curr) => {
      const key = curr.title[0].toUpperCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {} as Record<string, typeof songs>);

    // Format array for SectionList
    return Object.keys(result)
      .sort()
      .map(key => ({
        title: key,
        data: result[key],
      })) ?? [];
  }, [data, searchKeyword])

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>
        <Text className='text-white text-lg font-semibold'>
          Search
        </Text>
        <View className='w-8' />
      </View>

      <View className='px-8 pb-8 pt-2'>
        <View className='bg-gray-800 rounded-full px-4 py-3 flex-row items-center'>
          <AntDesign name="search1" size={22} color="white" />
          <TextInput
            placeholder='Search songs...'
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            className='text-white text-lg font-medium bg-transparent flex-1 ml-2'
            placeholderTextColor='gray'
          />

          {searchKeyword.length > 0 && (
            <TouchableOpacity onPress={() => setSearchKeyword('')}>
              <AntDesign name="close" size={22} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className='flex-1'>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/songs/${item.id}`)}>
              <View className='px-9 py-4'>
                <Text numberOfLines={1} className='text-white text-lg font-medium capitalize'>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <View className='px-9 py-2 bg-[#121821]'>
              <Text className='text-white text-lg font-semibold'>{section.title}</Text>
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  )
}
