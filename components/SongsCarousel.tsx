import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { Database } from '@/utils/database.types';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

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
      {/* <Carousel
        style={{
          width: SCREEN.width,
          height: SONG_CARD_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
        width={SONG_CARD_WIDTH}
        height={SONG_CARD_HEIGHT}
        pagingEnabled
        snapEnabled
        mode='horizontal-stack'
        loop={false}
        data={songs ?? []}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        customConfig={() => ({ type: "positive", viewCount: 5 })}
        renderItem={renderItem}
      /> */}

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className='w-full flex-1 justify-center items-center'
            style={{
              width: SCREEN.width,
            }}
          >
            <SongCard song={item} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const renderItem = ({ item }: any) => <SongCard song={item} />

export default SongsCarousel;

const SongCard = ({
  song
}: {
  song: TSong
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
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

      <View
        className='
        absolute bottom-0 rounded-[20px] bg-black h-20 px-8
        flex-row justify-between items-center
      '
        style={{
          width: SONG_CARD_WIDTH,
        }}
      >
        <Text numberOfLines={2} className='text-white text-lg font-semibold flex-1'>
          {song.title}
        </Text>

        <View className='w-12 h-12 rounded-full bg-gray-800/95 justify-center items-center'>
          <Entypo name="controller-play" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  )
}
