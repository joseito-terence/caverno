import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { supabase } from '@/utils/supabase'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'

const CARD_SIZE = 300
const SNAP_POINTS = [150, 300, '100%']

export default function Song() {
  const { id } = useLocalSearchParams()
  const insets = useSafeAreaInsets()
  const [renderBlur, setRenderBlur] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRenderBlur(true)
    }, 1000)
  }, [])

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


  const bottomsheetAnimatedIndex = useSharedValue(0)

  const rCardStyles = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: interpolate(
          bottomsheetAnimatedIndex.value,
          [0, 1, 2],
          [1, 0.9, 0.5]
        )
      }, {
        translateY: interpolate(
          bottomsheetAnimatedIndex.value,
          [0, 1, 2],
          [0, -CARD_SIZE / 3, -CARD_SIZE * 2]
        )
      }]
    }
  })

  const rBlurStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        bottomsheetAnimatedIndex.value,
        [0, 1, 2],
        [0, 0.1, 1]
      )
    }
  })

  return (
    <View className='flex-1'>
      <View
        style={{ paddingTop: insets.top + 16 }}
        className='flex-row justify-between items-center px-8 py-4 z-50'
      >
        <Animated.View
          className='absolute top-0 left-0 right-0 bottom-0'
          style={rBlurStyles}
        >
          {renderBlur &&
            <BlurView
              intensity={100}
              tint="dark"
              experimentalBlurMethod='dimezisBlurView'
              className='w-full h-full'
            />
          }
        </Animated.View>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <View className='w-8' />

        <Button onPress={() => { }}>
          <Entypo name="edit" size={20} color="white" />
        </Button>
      </View>

      <View className='flex-1 items-center justify-center'>
        <Animated.Image
          source={{ uri: song?.cover_image! }}
          width={CARD_SIZE}
          height={CARD_SIZE}
          resizeMode='cover'
          className='rounded-[20px]'
          style={[
            rCardStyles,
            {
              width: CARD_SIZE,
              height: CARD_SIZE,
              aspectRatio: 1,
              marginBottom: 150,
            }
          ]}
        />
        <BottomSheet
          snapPoints={SNAP_POINTS}
          backgroundComponent={CustomBackground}
          animatedIndex={bottomsheetAnimatedIndex}
        >
          <BottomSheetScrollView>
            <View className='p-6'>
              <View className='flex-row items-center justify-between'
                style={{ display: song?.style ? 'flex' : 'none' }}
              >
                <Text className='text-white text-lg font-semibold'>
                  {song?.style}
                </Text>

                <View className='flex-row items-center'
                  style={{ display: song?.tempo && song?.tempo > 0 ? 'flex' : 'none' }}
                >
                  <MaterialCommunityIcons name="music-note-quarter" size={22} color="white" />
                  <Text className='text-white text-lg font-semibold'>
                    = {song?.tempo} {typeof song?.tempo}
                  </Text>
                </View>
              </View>

              <Text className='text-white text-3xl font-bold capitalize'>
                {song?.title}
              </Text>

              <View className='mt-10'>
                <Text className='text-white text-lg font-semibold'>
                  Lyrics
                </Text>
                <Text className='text-white text-sm font-semibold'>
                  {song?.lyrics}
                </Text>
              </View>

            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  )
}


const CustomBackground = ({ animatedIndex, style }: BottomSheetBackgroundProps) => {
  const rStyles = useAnimatedStyle(
    () => {
      return animatedIndex.value == SNAP_POINTS.length - 1
        ? { borderTopRightRadius: withTiming(0), borderTopLeftRadius: withTiming(0) }
        : { borderTopRightRadius: withTiming(15), borderTopLeftRadius: withTiming(15) }
    }, []
  );

  return <Animated.View style={[style, { backgroundColor: '#303030' }, rStyles]} />;
};
