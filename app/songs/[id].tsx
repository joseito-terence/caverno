import React from 'react'
import { View, Text, Image } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
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
} from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CARD_SIZE = 300
const SNAP_POINTS = [150, 300, '100%']

export default function Song() {
  const { id } = useLocalSearchParams()
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

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between items-center px-8 py-4'>
        <Button onPress={router.back}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </Button>

        <Text className='text-white text-lg font-semibold'>

        </Text>
        <View className='w-5' />
      </View>

      <View className='flex-1 items-center justify-center'>
        <View
          className='bg-gray-800 rounded-[20px] overflow-hidden'
          style={{ width: CARD_SIZE, height: CARD_SIZE, marginBottom: 150 }}
        >
          <Image
            source={{ uri: song?.cover_image! }}
            width={CARD_SIZE}
            height={CARD_SIZE}
            className='rounded-[20px] absolute'
            resizeMode='cover'
          />
        </View>
        <BottomSheet
          snapPoints={SNAP_POINTS}
          backgroundComponent={CustomBackground}
        >
          <BottomSheetScrollView>
            <View className='p-6'>
              <View className='flex-row items-center justify-between'
                style={{ display: song?.style ? 'flex' : 'none' }}
              >
                <Text className='text-white text-lg font-semibold'>
                  {song?.style}
                </Text>

                {/* {(song?.tempo && song?.tempo > 0) && ( */}
                  <View className='flex-row items-center'
                    style={{ display: song?.tempo && song?.tempo > 0 ? 'flex' : 'none' }}
                  >
                    <MaterialCommunityIcons name="music-note-quarter" size={22} color="white" />
                    <Text className='text-white text-lg font-semibold'>
                      = {song?.tempo} {typeof song?.tempo}
                    </Text>
                  </View>
                {/* )} */}
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
    </SafeAreaView>
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
