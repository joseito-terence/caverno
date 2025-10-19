import React from "react";
import { View, Text, ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface FormCardProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "highlighted";
}

export default function FormCard({
  title,
  children,
  variant = "default",
  ...props
}: FormCardProps) {
  const isHighlighted = variant === "highlighted";

  return (
    <View className="mb-6" {...props}>
      <LinearGradient
        colors={
          isHighlighted
            ? ["rgba(96, 165, 250, 0.1)", "rgba(59, 130, 246, 0.05)"]
            : ["rgba(55, 65, 81, 0.2)", "rgba(31, 41, 55, 0.1)"]
        }
        className="rounded-2xl p-6"
        style={{
          borderWidth: 1,
          borderColor: isHighlighted
            ? "rgba(96, 165, 250, 0.3)"
            : "rgba(75, 85, 99, 0.3)",
        }}
      >
        {title && (
          <Text className="text-white text-lg font-semibold mb-4 text-center">
            {title}
          </Text>
        )}
        {children}
      </LinearGradient>
    </View>
  );
}
