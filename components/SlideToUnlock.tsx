import React from 'react'
import { Text, Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from 'moti';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SCREEN = Dimensions.get('screen')
export const SLIDER_WIDTH = SCREEN.width - 80
const SLIDER_HEIGHT = 60
const SLIDER_PADDING = 6
const SWIPABLE_DIMENSIONS = SLIDER_HEIGHT - 2 * SLIDER_PADDING

const H_SWIPE_RANGE = SLIDER_WIDTH - 2 * SLIDER_PADDING - SWIPABLE_DIMENSIONS

interface SlideToUnlockProps {
  onUnlock?: () => void
  translateX?: SharedValue<number>
}

export default function SlideToUnlock({
  onUnlock = () => { },
  translateX: translateXProp,
}: SlideToUnlockProps) {
  const translateX = useSharedValue(0)
  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      H_SWIPE_RANGE
    )
  })

  const gesture = Gesture.Pan()
    .onChange(e => {
      if (translateXProp) {
        translateXProp.value = e.translationX
      }
      translateX.value = e.translationX
    })
    .onEnd(() => {
      if (translateX.value < SLIDER_WIDTH / 2 - SWIPABLE_DIMENSIONS / 2) {
        translateX.value = withSpring(0, { damping: 14 })
        translateXProp && (translateXProp.value = withSpring(0, { damping: 14 }))
      } else {
        translateXProp && (translateXProp.value = withSpring(H_SWIPE_RANGE, { damping: 14 }))
        translateX.value = withSpring(H_SWIPE_RANGE, { damping: 14 })
        runOnJS(onUnlock)()
      }
    })

  const rSwipableStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: adjustTranslateX.value }],
    }
  }, [])

  const rSwipeIndicatorArrowsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(adjustTranslateX.value, [0, H_SWIPE_RANGE], [1, 0]),
    }
  })

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
        <MotiView className='flex-row items-center p-4 absolute right-0'
          style={rSwipeIndicatorArrowsStyle}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <MotiView
              key={i}
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'timing',
                duration: 1000 * i,
                delay: i * 100,
                loop: true,
              }}
            >
              <MaterialIcons name="navigate-next" size={24} color="white" />
            </MotiView>
          ))}
        </MotiView>

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
