import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { Database } from '@/utils/database.types';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const SCREEN = Dimensions.get('screen')
const SONG_CARD_WIDTH = SCREEN.width * 0.8
const SONG_CARD_HEIGHT = SONG_CARD_WIDTH * 1.3

type TSong = Database['public']['Tables']['songs']['Row']

interface Props {
  songs: TSong[];
}

const SongsCarousel = ({
  songs = []
}: Props) => {
  return (
    <View className='w-full flex-1 justify-center items-center'>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className='justify-center items-center'
            style={{
              width: SCREEN.width,
              paddingHorizontal: (SCREEN.width - SONG_CARD_WIDTH) / 2,
            }}
          >
            <SongCard song={item} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN.width}
        decelerationRate="fast"
        snapToAlignment="center"
      />
    </View>
  )
}

export default SongsCarousel;

const SongCard = ({
  song
}: {
  song: TSong
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/songs/${song.id}`)}
      style={{
        width: SONG_CARD_WIDTH,
        height: SONG_CARD_HEIGHT,
      }}
    >
      <Image
        source={{ uri: song.cover_image! }}
        width={SONG_CARD_WIDTH}
        height={SONG_CARD_HEIGHT}
        className='rounded-[20px] absolute'
        resizeMode='cover'
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          position: 'absolute',
          width: SONG_CARD_WIDTH,
          height: SONG_CARD_HEIGHT,
          borderRadius: 20,
        }}
      />

      <View
        className='
        absolute bottom-0 rounded-[20px] h-24 px-6
        flex-row justify-between items-center
      '
        style={{
          width: SONG_CARD_WIDTH,
        }}
      >
        <View className='flex-1'>
          <Text numberOfLines={1} className='text-white text-xl font-bold'>
            {song.title}
          </Text>
        </View>

        <BlurView intensity={20} className='w-12 h-12 rounded-full overflow-hidden justify-center items-center'>
          <View className='w-12 h-12 rounded-full bg-white/10 justify-center items-center'>
            <Entypo name="controller-play" size={24} color="white" />
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  )
}
