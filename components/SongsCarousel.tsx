import { Dimensions, View, Image, Text } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Entypo from '@expo/vector-icons/Entypo';

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
            title={`Song ${index + 1}`}
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
  index: number;
  title: string;
  image: string;
  scrollOffset: SharedValue<number>;
}

export const SongCard = ({
  index,
  title,
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

      <View 
        className='
          absolute bottom-0 rounded-[20px] bg-black h-20 px-8
          flex-row justify-between items-center
        '
        style={{
          width: SONG_CARD_WIDTH,
        }}
      >
        <Text className='text-white text-lg font-semibold'>
          {title}
        </Text>

        <View className='w-12 h-12 rounded-full bg-gray-800/95 justify-center items-center'>
          <Entypo name="controller-play" size={24} color="white" />
        </View>
      </View>
    </Animated.View>
  )
}
