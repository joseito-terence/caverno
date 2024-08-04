import React from 'react'
import { Text, Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from 'moti';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SCREEN = Dimensions.get('screen')
const SLIDER_WIDTH = SCREEN.width - 80
const SLIDER_HEIGHT = 60
const SLIDER_PADDING = 6
const SWIPABLE_DIMENSIONS = SLIDER_HEIGHT - 2 * SLIDER_PADDING

const H_SWIPE_RANGE = SLIDER_WIDTH - 2 * SLIDER_PADDING - SWIPABLE_DIMENSIONS

export default function SlideToUnlock() {
  const translateX = useSharedValue(0)
  const gesture = Gesture.Pan()
    .onChange(e => {
      translateX.value = e.translationX
    })
    .onEnd(() => {
      if (translateX.value < SLIDER_WIDTH / 2 - SWIPABLE_DIMENSIONS / 2) {
        translateX.value = withSpring(0)
      } else {
        translateX.value = withSpring(H_SWIPE_RANGE)
      }
    })

  const rSwipableStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  }, [])

  return (
    <MotiView
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 1000, delay: 4000 }}
    >
      <LinearGradient
        colors={['#323533', '#171717']}
        start={[0, 0]}
        end={[1, 1]}
        className='rounded-full justify-center overflow-hidden'
        style={{ height: SLIDER_HEIGHT, width: SLIDER_WIDTH }}
      >
        <GestureDetector gesture={gesture}>
          <Animated.View style={[rSwipableStyle, {
            margin: SLIDER_PADDING,
            width: SWIPABLE_DIMENSIONS,
            height: SWIPABLE_DIMENSIONS,
          }]}>
            <LinearGradient
              colors={['#41a9e3', '#183f54']}
              start={[1, 1]}
              end={[0, 0]}
              className='rounded-full w-full h-full justify-center items-center'
            >
              <Text className='text-white text-center text-md uppercase font-bold'>
                Play
              </Text>
            </LinearGradient>
          </Animated.View>
        </GestureDetector>
      </LinearGradient>
    </MotiView>
  )
}
