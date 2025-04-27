import { useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SongsList from "./SongsList";
import { useFocusEffect } from 'expo-router';

const SNAP_POINTS = [240, 600, '88%']

export default function SongsBottomSheet() {
  const insets = useSafeAreaInsets()
  const ref = useRef<BottomSheet>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useFocusEffect(() => {
    const backAction = () => {
      if (
        ref.current &&
        currentIndex !== 0
      ) {
        ref.current.snapToIndex(0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  })

  return (
    <BottomSheet
      ref={ref}
      snapPoints={SNAP_POINTS}
      backgroundStyle={{ backgroundColor: 'black' }}
      containerStyle={{ zIndex: 100 }}
      enableDynamicSizing={false}
      topInset={insets.top}
      onChange={setCurrentIndex}
    >
      <SongsList />
    </BottomSheet>
  )
}
