import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useForm, SubmitHandler } from "react-hook-form";
import InputController from "@/components/InputController";
import FormCard from "@/components/FormCard";
import CategorySelector from "@/components/CategorySelector";
import { unsplash } from "@/utils/unsplash";
import { useStore } from "@/store/useStore";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const DEFAULT_VALUES = {
  title: "",
  style: "",
  tempo: 0,
  transpose: 0,
  category: "",
  lyrics: "",
};

export type TSong = typeof DEFAULT_VALUES;

type SongFormProps =
  | {
      edit: true;
      song: TSong & { id: string };
    }
  | {
      edit?: false;
    };

export default function SongForm(props: SongFormProps) {
  const isEdit = props.edit === true;
  const insets = useSafeAreaInsets();
  const { addSong, updateSong } = useStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: isEdit ? props.song : DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<typeof control._defaultValues> = async (
    data,
  ) => {
    if (process.env.EXPO_PUBLIC_READ_ONLY === "true") {
      return console.warn("Read-only mode");
    }

    if (!isDirty) return;
    if (isEdit) {
      return updateSong(props.song.id, {
        ...data,
        title: data.title!,
      }).then(() => {
        router.back();
      });
    }

    const result = await unsplash.photos.getRandom({ query: "music" });

    if (result.type === "error") return;

    return addSong({
      title: data.title!,
      style: data.style || null,
      tempo: data.tempo || null,
      transpose: data.transpose || null,
      category: data.category || null,
      lyrics: data.lyrics || null,
      // @ts-ignore
      cover_image: result.response.urls.regular!,
    }).then(() => {
      router.back();
    });
  };

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      {/* Background with gradient and blur effect */}
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#0f172a"]}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      {/* Header with glassmorphism */}
      <BlurView intensity={20} className="px-6 py-4">
        <View className="flex-row justify-between items-center">
          <Button onPress={router.back}>
            <Feather name="arrow-left" size={22} color="white" />
          </Button>

          <View className="items-center">
            <Text className="text-white text-xl font-bold">
              {isEdit ? "Edit Song" : "Create Song"}
            </Text>
          </View>

          <Button onPress={handleSubmit(onSubmit)}>
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <AntDesign name="check" size={22} color="white" />
            )}
          </Button>
        </View>
      </BlurView>

      {/* Form Content */}
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="px-6 pt-6 pb-8">
          {/* Basic Information Card */}
          <FormCard title="🎵 Basic Information">
            <InputController
              name="title"
              label="Song Title"
              placeholder="Enter the song title"
              variant="large"
              control={control}
              errors={errors}
              multiline
              required
              disabled={isSubmitting}
            />

            <InputController
              name="style"
              label="Musical Style"
              placeholder="e.g. Rock, Pop, Hip-Hop, Jazz"
              control={control}
              errors={errors}
              disabled={isSubmitting}
            />
          </FormCard>

          {/* Musical Details Card */}
          <FormCard title="🎼 Musical Details">
            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputController
                  name="tempo"
                  label="Tempo (BPM)"
                  placeholder="120"
                  control={control}
                  errors={errors}
                  disabled={isSubmitting}
                />
              </View>
              <View className="flex-1">
                <InputController
                  name="transpose"
                  label="Transpose"
                  placeholder="-4"
                  control={control}
                  errors={errors}
                  disabled={isSubmitting}
                />
              </View>
            </View>

            <CategorySelector
              name="category"
              label="Category"
              control={control}
              errors={errors}
              disabled={isSubmitting}
            />
          </FormCard>

          {/* Lyrics Card */}
          <FormCard title="📝 Lyrics">
            <InputController
              name="lyrics"
              label="Song Lyrics"
              placeholder="Enter your lyrics here...&#10;&#10;Verse 1:&#10;...&#10;&#10;Chorus:&#10;..."
              variant="multiline"
              control={control}
              errors={errors}
              multiline
              textAlignVertical="top"
              disabled={isSubmitting}
            />
          </FormCard>

          {/* Submit Button */}
          <View className="mt-6">
            <Button
              onPress={handleSubmit(onSubmit)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl py-4 px-8 items-center justify-center"
              disabled={isSubmitting || !isDirty}
            >
              <View className="flex-row items-center">
                {isSubmitting ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <AntDesign name="check" size={20} color="white" />
                )}
                <Text className="text-white text-lg font-semibold ml-2">
                  {isSubmitting
                    ? "Saving..."
                    : isEdit
                      ? "Update Song"
                      : "Create Song"}
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
