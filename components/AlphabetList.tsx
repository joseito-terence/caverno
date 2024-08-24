import { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface AlphabetListProps {
  letters: string[];
  onChange?: (index: number) => void;
}

const screen = Dimensions.get('window')
const HEIGHT = screen.height * 0.68
const INDICATOR_SIZE = 25

export default function AlphabetList({
  letters,
  onChange = () => { }
}: AlphabetListProps) {
  const translateY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const adjustTranslateY = useDerivedValue(() => {
    return Math.min(
      Math.max(translateY.value, 0),
      HEIGHT - INDICATOR_SIZE
    )
  })

  const panGesture = Gesture.Pan()
    .onStart(() => {
      translateX.value = withSpring(-INDICATOR_SIZE - 10)
      scale.value = withSpring(1.8)
    })
    .onChange((event) => {
      translateY.value = event.y
    })
    .onEnd(() => {
      translateX.value = withSpring(0)
      scale.value = withSpring(0)
    })

  const rIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: adjustTranslateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    }
  })

  useAnimatedReaction(
    () => adjustTranslateY.value,
    () => {
      const index = Math.ceil(translateY.value / (HEIGHT / letters.length));
      const currentIndex = Math.max(0, Math.min(index, letters.length - 1));
      runOnJS(setCurrentIndex)(currentIndex);
    }
  )

  useEffect(() => {
    onChange(currentIndex)
  }, [currentIndex])

  const tapGesture = Gesture.Tap()
    .onStart((e) => {
      translateX.value = withSpring(-INDICATOR_SIZE - 10)
      scale.value = withSpring(1.2)
      translateY.value = withTiming(e.y - INDICATOR_SIZE)
    })
    .onEnd(() => {
      translateX.value = withSpring(0)
      scale.value = withSequence(
        withSpring(1.2),
        withDelay(100, withSpring(0))
      )
    })

  const composedGesture = Gesture.Exclusive(tapGesture, panGesture)

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        style={{
          height: HEIGHT,
          alignItems: 'center',
        }}
      >
        <View>
          {letters.map(letter => (
            <View key={letter} className='px-2 py-1 justify-center items-center'
              style={{
                height: HEIGHT / letters.length,
              }}
            >
              <Text className='text-white font-semibold text-[12px]'>
                {letter}
              </Text>
            </View>
          ))}
        </View>
        <Animated.View
          className='absolute bg-white rounded-full justify-center items-center'
          style={[{
            width: INDICATOR_SIZE,
            height: INDICATOR_SIZE,
          }, rIndicatorStyle]}
        >
          <Animated.Text className='text-black font-semibold text-[12px]'>
            {letters[currentIndex]}
          </Animated.Text>
        </Animated.View>
      </View>
    </GestureDetector>
  )
}
