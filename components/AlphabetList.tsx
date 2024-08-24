import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

interface AlphabetListProps {
  letters: string[];
}

const screen = Dimensions.get('window')
const HEIGHT = screen.height * 0.68
const INDICATOR_SIZE = 25

export default function AlphabetList({
  letters,
}: AlphabetListProps) {
  const translateY = useSharedValue(0)
  const previousTranslateY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0)
  const [currentLetter, setCurrentLetter] = useState(letters[0])

  const adjustTranslateY = useDerivedValue(() => {
    return Math.min(
      Math.max(translateY.value, 0),
      HEIGHT - INDICATOR_SIZE
    )
  })

  const panGesture = Gesture.Pan()
    .onStart(() => {
      previousTranslateY.value = adjustTranslateY.value
      translateX.value = withSpring(-INDICATOR_SIZE - 10)
      scale.value = withSpring(1.8)
    })
    .onChange((event) => {
      translateY.value = event.translationY
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
    () => translateY.value,
    () => {
      const index = Math.ceil(translateY.value / (HEIGHT / letters.length));
      const currentIndex = Math.max(0, Math.min(index, letters.length - 1));
      runOnJS(setCurrentLetter)(letters[currentIndex]);
    }
  )

  return (
    <GestureDetector gesture={panGesture}>
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
            {currentLetter}
          </Animated.Text>
        </Animated.View>
      </View>
    </GestureDetector>
  )
}
