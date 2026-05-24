import React from "react";
import { View, Text, ViewProps } from "react-native";

interface FormCardProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
}

export default function FormCard({ title, children, ...props }: FormCardProps) {
  return (
    <View className="mb-6" {...props}>
      {title && (
        <Text className="text-white text-lg font-semibold mb-4 text-center">
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}
