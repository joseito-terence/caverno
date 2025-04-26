import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SongsList from "./SongsList";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SNAP_POINTS = [240, 600, '88%']

export default function SongsBottomSheet() {
  const insets = useSafeAreaInsets()

  return (
    <BottomSheet
      snapPoints={SNAP_POINTS}
      backgroundStyle={{ backgroundColor: 'black' }}
      containerStyle={{ zIndex: 100 }}
      enableDynamicSizing={false}
      topInset={insets.top}
    >
      <BottomSheetView className="flex-1">
        <SongsList />
      </BottomSheetView>
    </BottomSheet>
  )
}
