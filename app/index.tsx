import AnimatedLogo from "@/components/AnimatedLogo";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <View className="
        absolute top-0 left-0 right-0 bottom-0
        w-full flex-1 justify-center items-center">
        <AnimatedLogo />
      </View>
    </View>
  );
}
