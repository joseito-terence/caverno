import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useStore } from "@/store/useStore";

interface CategorySelectorProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

export default function CategorySelector({
  name,
  control,
  errors,
  disabled = false,
  label = "Category",
  required = false,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { categories } = useStore();
  const hasError = errors[name];

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
          // Find the display name for the selected category value
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
                onPress={() => !disabled && setIsOpen(true)}
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
                <AntDesign
                  name={isOpen ? "up" : "down"}
                  size={16}
                  color="#9ca3af"
                />
              </TouchableOpacity>

              {/* Error Message */}
              {hasError && (
                <Text className="text-red-400 text-sm mt-1 ml-1">
                  {typeof errors[name]?.message === "string"
                    ? errors[name]?.message
                    : `${label} is required`}
                </Text>
              )}

              {/* Modal Dropdown */}
              <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
              >
                <TouchableOpacity
                  className="flex-1 bg-black/50 justify-center items-center px-6"
                  activeOpacity={1}
                  onPress={() => setIsOpen(false)}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      borderRadius: 16,
                      padding: 20,
                      width: "100%",
                      maxHeight: 400,
                      borderWidth: 1,
                      borderColor: "rgba(75, 85, 99, 0.3)",
                    }}
                  >
                    <Text className="text-white text-lg font-semibold mb-4 text-center">
                      Select Category
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                      {categories.map((category) => (
                        <TouchableOpacity
                          key={category.id}
                          onPress={() => {
                            onChange(category.id); // Use the category ID as the value
                            setIsOpen(false);
                          }}
                          style={{
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                            backgroundColor:
                              value === category.id
                                ? "rgba(96, 165, 250, 0.2)"
                                : "transparent",
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            className={`text-base ${
                              value === category.id
                                ? "text-blue-400 font-medium"
                                : "text-white"
                            }`}
                          >
                            {category.name ?? category.id}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          );
        }}
      />
    </View>
  );
}
