import React, { useRef, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Controller, Control, FieldErrors } from "react-hook-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useStore } from "@/store/useStore";
import type { TSong } from "./SongForm";

interface CategorySelectorProps {
  name: keyof TSong;
  control: Control<TSong>;
  errors: FieldErrors<TSong>;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const CustomHandle = () => (
  <View style={{ alignItems: "center", paddingVertical: 8 }}>
    <View
      style={{
        width: 40,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: "#888",
      }}
    />
  </View>
);

export default function CategorySelector({
  name,
  control,
  errors,
  disabled = false,
  label = "Category",
  required = false,
}: CategorySelectorProps) {
  const sheetRef = useRef<BottomSheetModal>(null);

  const { categories } = useStore();
  const hasError = errors[name];

  const handleOpen = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => sheetRef.current?.dismiss()}
      />
    ),
    [],
  );

  const renderItem = useCallback(
    (onChange: (id: string) => void, value: unknown) =>
      function CategoryItem({ item }: { item: { id: string; name?: string } }) {
        return (
          <TouchableOpacity
            onPress={() => {
              onChange(item.id);
              sheetRef.current?.close();
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor:
                value === item.id
                  ? "rgba(96, 165, 250, 0.2)"
                  : "transparent",
              marginBottom: 4,
            }}
          >
            <Text
              className={`text-base ${
                value === item.id ? "text-blue-400 font-medium" : "text-white"
              }`}
            >
              {item.name ?? item.id}
            </Text>
          </TouchableOpacity>
        );
      },
    [],
  );

  return (
    <View className="mb-4">
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        rules={{
          required,
        }}
        render={({ field: { onChange, value } }) => {
          const selectedCategory = categories.find((cat) => cat.id === value);
          const displayText = selectedCategory
            ? selectedCategory.name
            : "Select category";

          return (
            <View className="relative">
              {/* Label */}
              <Text
                className={`text-sm font-medium mb-2 ${
                  hasError ? "text-red-400" : "text-gray-300"
                }`}
              >
                {label}
                {required && " *"}
              </Text>

              {/* Selector Button */}
              <TouchableOpacity
                onPress={() => !disabled && handleOpen()}
                disabled={disabled}
                style={{
                  borderWidth: 2,
                  borderColor: hasError ? "#ef4444" : "#374151",
                  borderRadius: 12,
                  backgroundColor: "rgba(55, 65, 81, 0.3)",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text className="text-white text-xl">{displayText}</Text>
                <AntDesign name="down" size={16} color="#9ca3af" />
              </TouchableOpacity>

              {/* Error Message */}
              {hasError && (
                <Text className="text-red-400 text-sm mt-1 ml-1">
                  {typeof errors[name]?.message === "string"
                    ? errors[name]?.message
                    : `${label} is required`}
                </Text>
              )}

              {/* Bottom Sheet Modal */}
              <BottomSheetModal
                ref={sheetRef}
                snapPoints={["60%"]}
                enablePanDownToClose
                handleComponent={CustomHandle}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: "#1f2937" }}
              >
                <Text className="text-white text-lg font-semibold mb-4 text-center">
                  Select Category
                </Text>
                <BottomSheetFlatList
                  data={categories}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem(onChange, value)}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 16 }}
                />
              </BottomSheetModal>
            </View>
          );
        }}
      />
    </View>
  );
}
