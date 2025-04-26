import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SongsList from "./SongsList";

const SNAP_POINTS = [200, 600, '85%']

export default function SongsBottomSheet() {

  return (
    <BottomSheet
      snapPoints={SNAP_POINTS}
      backgroundStyle={{ backgroundColor: 'black' }}
      containerStyle={{zIndex: 100}}
    >
      <BottomSheetView className="flex-1">
        <SongsList />
      </BottomSheetView>
    </BottomSheet>
  )
}
