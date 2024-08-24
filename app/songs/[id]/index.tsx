import React from 'react'
import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { AntDesign } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'
import { useSong } from '@/hooks/useSong'

const CARD_SIZE = 300
const SNAP_POINTS = [150, 300, '100%']

export default function Song() {
  const { id } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  const { data: song } = useSong(id as string)


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

  const rHeaderStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bottomsheetAnimatedIndex.value,
        [0, 1, 2],
        ['transparent', 'transparent', '#000000af']
      ),
    };
  })

  return (
    <View className='flex-1'>

      <Animated.View
        style={[{ paddingTop: insets.top + 16 }, rHeaderStyles]}
        className='flex-row justify-between items-center px-8 py-4 z-[4]'
      >
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
            <View className='flex-row items-center justify-between'
              style={{ display: song?.style || song?.tempo || song?.transpose ? 'flex' : 'none' }}
            >
              <Text className='text-white text-lg font-semibold'>
                {song?.style ?? ''}
              </Text>

              <View className='flex-row items-center gap-1'>
                <View className='flex-row items-center'
                  style={{ display: song?.tempo && song?.tempo > 0 ? 'flex' : 'none' }}
                >
                  <MaterialCommunityIcons name="music-note-quarter" size={22} color="white" />
                  <Text className='text-white text-lg font-semibold'>
                    = {song?.tempo}
                  </Text>
                </View>
                <View className='flex-row items-center'
                  style={{ display: song?.transpose ? 'flex' : 'none' }}
                >
                  <Entypo name="select-arrows" size={22} color="white" />
                  <Text className='text-white text-lg font-semibold'>
                    {song?.transpose}
                  </Text>
                </View>
              </View>
            </View>

            <Text className='text-white text-3xl font-bold capitalize mt-1'>
              {song?.title}
            </Text>
          </View>

          <BottomSheetScrollView>
            <View className='p-6 mt-4'>
              <Text className='text-white text-lg font-semibold'>
                Lyrics
              </Text>
              <Text className='text-white text-sm font-semibold'>
                {song?.lyrics}
              </Text>
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

  return <Animated.View style={[style, { backgroundColor: '#303030' }, rStyles]} />;
};
