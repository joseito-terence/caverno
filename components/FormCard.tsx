import { View, Text } from "react-native";
import { Icon } from "@/components/Icon";

interface FormCardProps {
  title?: string;
  icon?: any;
  children: React.ReactNode;
}

export default function FormCard({ title, icon, children }: FormCardProps) {
  return (
    <View className="mb-6">
      {title && (
        <View className="flex-row items-center mb-4 gap-2">
          {icon && <Icon source={icon} size={20} tint="#FFFFFF" />}
          <Text className="text-white text-lg font-semibold">{title}</Text>
        </View>
      )}
      {children}
    </View>
  );
}
