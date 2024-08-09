import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { Button } from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'

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
          <View>
            <SongsList />
          </View>
        </View>
      </View>
    </View>
  )
}

const SongsList = ({
  songs = Array(10).fill(0)
}) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollViewRef)
  const ListPadding = SCREEN.width - SONG_CARD_WIDTH

  return (
    <View
      className='width-full'
      style={{
        height: SONG_CARD_HEIGHT,
      }}
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEventThrottle={16}
        snapToInterval={SONG_CARD_WIDTH}
        decelerationRate='fast'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: SONG_CARD_WIDTH * songs.length + ListPadding,
        }}
      >
        {songs.map((_, index) => (
          <SongCard
            key={index}
            index={index}
            image={`https://picsum.photos/seed/picsum${index + 1}/600/800`}
            scrollOffset={scrollOffset}
          />
        ))}
      </Animated.ScrollView>
    </View>
  )
}

const SONG_CARD_WIDTH = SCREEN.width * 0.8
const SONG_CARD_HEIGHT = SONG_CARD_WIDTH * 1.3

interface SongCardProps {
  index: number
  image: string
  scrollOffset: SharedValue<number>
}

const SongCard = ({
  index,
  image,
  scrollOffset
}: SongCardProps) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / SONG_CARD_WIDTH
    const paddingLeft = (SCREEN.width - SONG_CARD_WIDTH) / 3

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [120, 60, 0, -SONG_CARD_WIDTH - paddingLeft * 2],
      Extrapolation.CLAMP
    )

    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1],
      Extrapolation.CLAMP
    )

    return {
      left: paddingLeft,
      transform: [
        { translateX: scrollOffset.value + translateX },
        { scale },
      ]
    }
  }, [])

  return (
    <Animated.View
      style={[
        {
          zIndex: 10 - index,
        }, 
        rContainerStyle
      ]}
    >
      <Image
        source={{ uri: image }}
        width={SONG_CARD_WIDTH}
        height={SONG_CARD_HEIGHT}
        className='rounded-[20px] absolute'
        resizeMode='cover'
      />
    </Animated.View>
  )
}
