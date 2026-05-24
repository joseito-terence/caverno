import React, { useEffect, useState, useCallback } from "react";
import { View, TextInput, TextInputProps, Text, Animated } from "react-native";
import { Control, FieldErrors, useController } from "react-hook-form";
import type { TSong } from "./SongForm";

interface InputControllerProps extends TextInputProps {
  name: keyof TSong;
  required?: boolean;
  control: Control<TSong>;
  errors: FieldErrors<TSong>;
  disabled?: boolean;
  label?: string;
  variant?: "default" | "large" | "multiline";
}

export default function InputController({
  name,
  required = false,
  control,
  errors,
  disabled = false,
  label,
  variant = "default",
  ...props
}: InputControllerProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnimation] = useState(new Animated.Value(0));
  const [borderAnimation] = useState(new Animated.Value(0));

  const hasError = errors[name];

  const animateLabel = useCallback(
    (toValue: number) => {
      Animated.timing(labelAnimation, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    },
    [labelAnimation],
  );

  const animateBorder = useCallback(
    (toValue: number) => {
      Animated.timing(borderAnimation, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    },
    [borderAnimation],
  );

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
    animateBorder(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    animateBorder(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "large":
        return {
          input: "text-white text-3xl font-semibold",
          container: "mb-6",
          label: "text-lg",
        };
      case "multiline":
        return {
          input: "text-white text-sm leading-6",
          container: "mb-6",
          label: "text-sm",
        };
      default:
        return {
          input: "text-white text-xl",
          container: "mb-4",
          label: "text-base",
        };
    }
  };

  const styles = getVariantStyles();

  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    rules: { required },
  });

  // Determine if value exists and animate accordingly
  const hasValue = value && value.toString().trim() !== "";

  // This effect handles value changes outside the render cycle
  useEffect(() => {
    if (isFocused || hasValue) {
      animateLabel(1);
    } else {
      animateLabel(0);
    }
  }, [hasValue, isFocused, animateLabel]);

  return (
    <View className={styles.container}>
      <View className="relative">
        {/* Fixed Label - always show */}
        {label && (
          <Animated.View
            style={{
              position: "absolute",
              left: 16,
              top: labelAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, -8],
              }),
              zIndex: 1,
              backgroundColor: "rgba(17, 24, 39, 0.95)",
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
            }}
          >
            <Animated.Text
              style={{
                color: hasError ? "#ef4444" : isFocused ? "#60a5fa" : "#9ca3af",
                fontSize: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [variant === "large" ? 18 : 16, 12],
                }),
                fontWeight: "500",
              }}
              className={styles.label}
            >
              {label}
              {required && " *"}
            </Animated.Text>
          </Animated.View>
        )}

        {/* Input Container */}
        <Animated.View
          style={{
            borderWidth: 2,
            borderColor: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [hasError ? "#ef4444" : "#374151", "#60a5fa"],
            }),
            borderRadius: 12,
            backgroundColor: "rgba(55, 65, 81, 0.3)",
            backdropFilter: "blur(10px)",
          }}
          className={`px-4 py-3 ${label ? "pt-8" : ""}`} // Add top padding if there's a label to accommodate the floating label
        >
          <TextInput
            onBlur={(e) => {
              onBlur();
              handleBlur();
            }}
            onFocus={handleFocus}
            onChangeText={onChange}
            value={value === 0 ? "" : value?.toString() || ""}
            className={styles.input}
            placeholderTextColor="transparent"
            editable={!disabled}
            style={{
              paddingTop: variant === "multiline" ? 8 : 0,
              minHeight: variant === "multiline" ? 120 : undefined,
              textAlignVertical: variant === "multiline" ? "top" : "center",
            }}
            {...props}
          />
        </Animated.View>

        {/* Error Message */}
        {hasError && (
          <Text className="text-red-400 text-sm mt-1 ml-1">
            {typeof errors[name]?.message === "string"
              ? errors[name]?.message
              : `${label || name} is required`}
          </Text>
        )}
      </View>
    </View>
  );
}
