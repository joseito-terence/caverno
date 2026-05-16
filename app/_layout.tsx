import "../global.css";
import type { ParamListBase, StackNavigationState } from "expo-router/react-navigation";
import { withLayoutContext } from "expo-router";
import Transition, {
  createNativeStackNavigator,
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
} from "react-native-screen-transitions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync("transparent");

const { Navigator } = createNativeStackNavigator();
const Stack = withLayoutContext<
  NativeStackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationEventMap
>(Navigator);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "black" } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" options={{ animation: "ios_from_left" }} />
        <Stack.Screen
          name="songs/[id]/index"
          options={{
            ...Transition.presets.DraggableCard(),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
