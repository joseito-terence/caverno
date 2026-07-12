import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import Add from "@expo/material-symbols/add.xml";
import Search from "@expo/material-symbols/search.xml";
import { LinearGradient } from "@/components/styled";
import SongsCarousel from "@/components/SongsCarousel";
import { useRouter } from "expo-router";
import { useStore } from "@/store/useStore";
import { Image } from "expo-image";

const SCREEN = Dimensions.get("screen");

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCategory] = useState("");
  const { categories, songs, isLoading } = useStore();

  const defaultCategory = categories?.[0]?.id;
  const category = selectedCategory || defaultCategory;
  const filteredSongs = category
    ? songs.filter((song) => song.category === category)
    : songs;

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View className="flex-row justify-between items-center px-8 py-4">
        <IconButton 
          onPress={() => router.push("/songs/add")}
          testID="add-song"
          source={Add}
          size={24}
          tint="#FFFFFF"
        />

        <Text className="text-white text-lg font-semibold">Home</Text>

        <IconButton 
          testID="search" 
          source={Search} 
          size={22} 
          tint="#FFFFFF"
        />
      </View>

      <View className="flex-1 rounded-t-[55px] mt-8 bottom-0 overflow-hidden z-20">
        <Image
          source="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          style={{
            width: SCREEN.width,
            height: SCREEN.height,
            position: "absolute",
          }}
        />
        <LinearGradient
          colors={["#1a0f3d", "transparent", "#000000"]}
          className="absolute top-0 left-0 bottom-0 right-0"
          style={{
            width: SCREEN.width,
            height: SCREEN.height,
          }}
        />
        <View
          style={{
            height: SCREEN.height - 250,
            zIndex: 1000000000,
          }}
        >
          <View className="flex-1 items-center justify-center">
            {isLoading ? (
              <Text className="text-white">Loading...</Text>
            ) : (
              <SongsCarousel songs={filteredSongs} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
