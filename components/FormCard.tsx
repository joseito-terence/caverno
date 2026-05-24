import React from "react";
import { View, Text, ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface FormCardProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
}

export default function FormCard({
  title,
  children,
  ...props
}: FormCardProps) {
  return (
    <View className="mb-6" {...props}>
      <LinearGradient
        colors={["rgba(55, 65, 81, 0.2)", "rgba(31, 41, 55, 0.1)"]}
        className="rounded-2xl p-6"
        style={{
          borderWidth: 1,
          borderColor: "rgba(75, 85, 99, 0.3)",
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
