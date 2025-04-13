import React, { useMemo, useRef, useState } from 'react'
import { View, Text, SectionList, TouchableOpacity, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { Button } from '@/components/Button'
import AlphabetList from '@/components/AlphabetList'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { useStore } from '@/store/useStore'

export default function Search() {
  const router = useRouter()
  const sectionRef = useRef<SectionList>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const insets = useSafeAreaInsets()

  const data = useStore(store => store.songs)

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
          ref={sectionRef}
          sections={sections.data}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          renderItem={RenderItem}
          renderSectionHeader={({ section }) => (
            <View className='px-9 py-2 bg-[#121821]'>
              <Text className='text-white text-lg font-semibold'>{section.title}</Text>
            </View>
          )}
          // @ts-ignore
          getItemLayout={getItemLayout}
        />
        <View className='absolute right-0 z-50'>
          <AlphabetList
            letters={sections.letters}
            onChange={(index) => {
              if (!sectionRef.current || !sections.letters.length) return
              // console.log('index', index)
              sectionRef.current.scrollToLocation({
                animated: true,
                sectionIndex: index,
                itemIndex: 0,
              })
            }}
          />
        </View>
      </View>

    </View>
  )
}

const RenderItem = ({ item }: any) => {
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.push(`/songs/${item.id}`)}>
      <View className='px-9 py-4'>
        <Text numberOfLines={1} className='text-white text-lg font-medium capitalize'>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const getItemLayout = sectionListGetItemLayout({
  // The height of the row with rowData at the given sectionIndex and rowIndex
  getItemHeight: (rowData, sectionIndex, rowIndex) =>
    sectionIndex === 0 ? 60 : 60,

  // These three properties are optional
  getSeparatorHeight: () => 0, // The height of your separators
  getSectionHeaderHeight: () => 60, // The height of your section headers
  getSectionFooterHeight: () => 0, // The height of your section footers
});
