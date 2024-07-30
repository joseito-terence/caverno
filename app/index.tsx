import { Text, View } from "react-native";
import { MotiView } from 'moti';

export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <MotiView
        from={{
          translateX: -12,
        }}
        animate={{
          translateX: 0,
        }}
        transition={{
          type: 'timing',
          repeat: 5,
          repeatReverse: true,
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </MotiView>
    </View>
  );
}
