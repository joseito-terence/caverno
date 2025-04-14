import "../global.css";
import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync("transparent");


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DarkTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="home" options={{ animation: 'ios_from_left' }} />
            <Stack.Screen name="songs/[id]/index" options={{ animation: 'none' }} />
          </Stack>
        </ThemeProvider>
    </GestureHandlerRootView>
  );
}
