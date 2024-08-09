import { Dimensions, View, Image } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'

const SCREEN = Dimensions.get('screen')

const SongsCarousel = ({
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

export default SongsCarousel;

const SONG_CARD_WIDTH = SCREEN.width * 0.8
const SONG_CARD_HEIGHT = SONG_CARD_WIDTH * 1.3

export interface SongCardProps {
  index: number
  image: string
  scrollOffset: SharedValue<number>
}

export const SongCard = ({
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
