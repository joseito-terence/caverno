import "../global.css";
import type {
  ParamListBase,
  StackNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import Transition, {
  createNativeStackNavigator,
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
} from "react-native-screen-transitions";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";
import { useEffect } from "react";

const { Navigator } = createNativeStackNavigator();
const Stack = withLayoutContext<
  NativeStackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationEventMap
>(Navigator);

export default function RootLayout() {
  useEffect(() => {
    // Set background color with error handling
    const setBackgroundColor = async () => {
      try {
        await SystemUI.setBackgroundColorAsync("transparent");
      } catch (error) {
        // Silently handle the error - this can happen when the app is backgrounded
        console.warn("Failed to set background color:", error);
      }
    };

    setBackgroundColor();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" options={{ animation: "ios_from_left" }} />
          <Stack.Screen
            name="songs/[id]/index"
            options={{
              ...Transition.presets.DraggableCard(),
              enableTransitions: Platform.OS !== "web",
              screenStyleInterpolator: ({ bounds, activeBoundId }) => {
                "worklet";
                if (!activeBoundId) return {};
                // Drive shared element by id when present
                const shared = bounds({
                  method: "transform",
                  space: "relative",
                  scaleMode: "match",
                  anchor: "center",
                });
                return { [activeBoundId]: shared };
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
