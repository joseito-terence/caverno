import React from "react";
import { ActivityIndicator, Text } from "react-native";
import SongForm from "@/components/SongForm";
import { useLocalSearchParams } from "expo-router";
import { useSong } from "@/hooks/useSong";

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const song = useSong(id);

  if (!song) return <ActivityIndicator />;

  return (
    <SongForm
      edit
      song={{
        title: song.title,
        style: song.style ?? "",
        tempo: song.tempo ?? 0,
        transpose: song.transpose ?? 0,
        category: song.category ?? "",
        lyrics: song.lyrics ?? "",
        id,
      }}
    />
  );
}
