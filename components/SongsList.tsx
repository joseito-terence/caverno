import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { useStore } from '@/store/useStore'
import { BottomSheetSectionList, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SongsList() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const insets = useSafeAreaInsets()

  const { songs: data } = useStore()

  const sections = useMemo(() => {
    if (!data) return { letters: [], data: [] };

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
    const letters = Object.keys(result).sort();

    return {
      letters,
      data: letters.map(letter => ({
        title: letter,
        data: result[letter],
      })) ?? [],
    }
  }, [data, searchKeyword])



  return (
    <View className='flex-1' style={{ paddingTop: insets.top }}>
      <View className='px-8 pb-8 pt-2'>
        <View className='bg-gray-800 rounded-full px-4 py-1 flex-row items-center'>
          <AntDesign name="search1" size={22} color="white" />
          <BottomSheetTextInput
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
        <BottomSheetSectionList
          sections={sections.data}
          keyExtractor={(item) => item.id}
          // stickySectionHeadersEnabled
          renderItem={RenderItem}
          renderSectionHeader={RenderSectionHeader}
        />
      </View>

    </View>
  )
}

const RenderSectionHeader = ({ section }: any) => {
  return (
    <View className='px-9 py-2 bg-[#121821]'>
      <Text className='text-white text-lg font-semibold'>{section.title}</Text>
    </View>
  )
}

const RenderItem = ({ item }: any) => {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push(`/songs/${item.id}`)}>
      <View className='px-9 py-4 w-full'>
        <Text numberOfLines={1} className='text-white text-lg font-medium capitalize'>{item.title}</Text>
      </View>
    </Pressable>
  )
}
