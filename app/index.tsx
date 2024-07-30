import { Text, View } from "react-native";
import { MotiView } from 'moti';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: 'timing',
        }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
        }}
    />
    </View>
  );
}
