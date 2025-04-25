import "../global.css";
import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from "expo-system-ui";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { persistQueryClient } from '@tanstack/react-query-persist-client';  
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useEffect } from "react";

SystemUI.setBackgroundColorAsync("transparent");

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

export default function RootLayout() {

  useEffect(() => {
    const storage = new MMKV();

    persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({
        storage: {
          getItem: (key: string) => storage.getString(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
          removeItem: (key: string) => storage.delete(key),
        },
      }),
      maxAge: Infinity,
    })
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DarkTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="home" options={{ animation: 'ios_from_left' }} />
            <Stack.Screen name="songs/[id]/index" options={{ animation: 'none' }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
