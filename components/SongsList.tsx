import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Song, useStore } from "@/store/useStore";
import {
  // BottomSheetSectionList,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Pressable } from "react-native-gesture-handler";
import CategoryFilters from "./CategoryFilters";

export default function SongsList() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { songs: data } = useStore();

  // const sections = (() => {
  //   if (!data) return { letters: [], data: [] };

  //   let songs = data;
  //   // Filter by search keyword
  //   if (searchKeyword) {
  //     songs = data.filter((song) =>
  //       song.title.toLowerCase().includes(searchKeyword.toLowerCase())
  //     );
  //   }

  //   // Group by first letter
  //   const result = songs.reduce((acc, curr) => {
  //     const key = curr.title[0].toUpperCase();
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(curr);
  //     return acc;
  //   }, {} as Record<string, typeof songs>);

  //   // Format array for SectionList
  //   const letters = Object.keys(result).sort();

  //   return {
  //     letters,
  //     data:
  //       letters.map((letter) => ({
  //         title: letter,
  //         data: result[letter],
  //       })) ?? [],
  //   };
  // })();

  const songs = (() => {
    let filteredSongs = data;

    // Filter by search keyword
    if (searchKeyword) {
      filteredSongs = filteredSongs.filter((song) =>
        song.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredSongs = filteredSongs.filter(
        (song) => song.category === selectedCategory
      );
    }

    return filteredSongs;
  })();

  return (
    <>
      <View>
        <View className="px-8 py-2">
          <View className="bg-gray-800 rounded-full px-4 py-1 flex-row items-center">
            <EvilIcons name="search" size={24} color="white" />
            <BottomSheetTextInput
              testID="search-input"
              placeholder="Search songs..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              className="text-white text-lg font-medium bg-transparent flex-1 ml-2"
              placeholderTextColor="gray"
            />

            {searchKeyword.length > 0 && (
              <TouchableOpacity onPress={() => setSearchKeyword("")}>
                <EvilIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>

      <BottomSheetFlatList
        // sections={sections.data}
        data={songs}
        keyExtractor={(item: Song) => item.id}
        // stickySectionHeadersEnabled
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </>
  );
}

const renderSectionHeader = ({ section }: any) => {
  return (
    <View className="px-9 py-2 bg-[#121821]">
      <Text className="text-white text-lg font-semibold">{section.title}</Text>
    </View>
  );
};

const renderItem = ({ item }: any) => {
  return (
    <Pressable onPress={() => router.push(`/songs/${item.id}`)}>
      <View className="px-9 py-4 w-full">
        <Text
          numberOfLines={1}
          className="text-white text-lg font-medium capitalize"
        >
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};
