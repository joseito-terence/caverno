import React from 'react'
import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { AntDesign } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'
import { useSong } from '@/hooks/useSong'

const CARD_SIZE = 300
const SNAP_POINTS = [150, 300, '100%']

export default function Song() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const song = useSong(id)

  const bottomsheetAnimatedIndex = useSharedValue(0)
  const blurIntensity = useSharedValue(0)

  const rCardStyles = useAnimatedStyle(() => {
    if (bottomsheetAnimatedIndex.value >= 2) {
      blurIntensity.value = withTiming(100)
    } else {
      blurIntensity.value = withTiming(0)
    }

    return {
      transform: [{
        scale: interpolate(
          bottomsheetAnimatedIndex.value,
          [0, 1, 2],
          [1, 0.9, 1.5],
          Extrapolation.CLAMP
        )
      }, {
        translateY: interpolate(
          bottomsheetAnimatedIndex.value,
          [0, 1, 2],
          [0, -CARD_SIZE / 3, -CARD_SIZE * .75],
          Extrapolation.CLAMP
        )
      }]
    }
  })

  const rBlurIntensity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        bottomsheetAnimatedIndex.value,
        [0, 1, 2],
        [0, 0.5, 1],
        Extrapolation.CLAMP
      )
    }
  })

  return (
    <View className='flex-1'>
      <Animated.View
        style={[{ paddingTop: insets.top + 16 }]}
        className='flex-row justify-between items-center px-8 py-4 z-[4]'
      >
        <Animated.View style={rBlurIntensity} className='absolute inset-0'>
          <BlurView 
            intensity={30}
            tint="dark" 
            experimentalBlurMethod="dimezisBlurView"
            className='flex-1' 
          />
        </Animated.View>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <View className='w-8' />

        <Button onPress={() => router.push(`/songs/${id}/edit`)}>
          <Entypo name="edit" size={20} color="white" />
        </Button>
      </Animated.View>

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
          <View className='p-6'>
            <View className='flex-row items-center justify-between mb-4'
              style={{ display: song?.style || song?.tempo || song?.transpose ? 'flex' : 'none' }}
            >
              <View className='flex-row items-center gap-2'>
                <View className='bg-gray-700/95 px-3 py-1 rounded-full'>
                  <Text className='text-white text-sm font-medium'>
                    {song?.style ?? ''}
                  </Text>
                </View>
              </View>

              <View className='flex-row items-center gap-3'>
                <View className='flex-row items-center bg-gray-700/95 px-3 py-1 rounded-full'
                  style={{ display: song?.tempo && song?.tempo > 0 ? 'flex' : 'none' }}
                >
                  <MaterialCommunityIcons name="music-note-quarter" size={18} color="white" />
                  <Text className='text-white text-sm font-medium ml-1'>
                    {song?.tempo}
                  </Text>
                </View>
                <View className='flex-row items-center bg-gray-700/95 px-3 py-1 rounded-full'
                  style={{ display: song?.transpose ? 'flex' : 'none' }}
                >
                  <Entypo name="select-arrows" size={18} color="white" />
                  <Text className='text-white text-sm font-medium ml-1'>
                    {song?.transpose}
                  </Text>
                </View>
              </View>
            </View>

            <Text className='text-white text-3xl font-bold capitalize mb-6'>
              {song?.title}
            </Text>
          </View>

          <BottomSheetScrollView>
            <View className='p-6'>
              <View className='flex-row items-center gap-2 mb-4'>
                <MaterialCommunityIcons name="music" size={24} color="white" />
                <Text className='text-white text-xl font-bold'>
                  Lyrics
                </Text>
              </View>
              <View className='bg-gray-700/95 rounded-xl p-4'>
                <Text className='text-white text-base leading-relaxed'>
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
      return animatedIndex.value >= SNAP_POINTS.length - 1
        ? { borderTopRightRadius: withTiming(0), borderTopLeftRadius: withTiming(0) }
        : { borderTopRightRadius: withTiming(15), borderTopLeftRadius: withTiming(15) }
    }, []
  );

  return <Animated.View style={[style, { backgroundColor: '#1f2937' }, rStyles]} />;
};
