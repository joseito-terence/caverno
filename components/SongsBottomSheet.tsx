import BottomSheet from "@gorhom/bottom-sheet";
import SongsList from "./SongsList";
import { View, Text } from "moti";

export default function SongsBottomSheet() {
  return (
    <BottomSheet 
      snapPoints={['100%']}
    >
      {/* <SongsList /> */}
      <View className='p-6'>
        <Text className='text-white text-3xl font-bold capitalize mb-6'>
          Songs
        </Text>
      </View>
    </BottomSheet>
  )
}
