import AnimatedLogo from "@/components/AnimatedLogo";
import { View } from "react-native";
import { BlurView } from 'expo-blur';
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import Circle from "@/components/Circle";

export default function Index() {
  return (
    <View
      className="flex-1"
    >
      <View className="
        absolute top-0 left-0 right-0 bottom-0 z-50
        w-full flex-1 justify-center items-center">
        <AnimatedLogo />
      </View>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000, delay: 2000 }}
        className="w-full flex-1"
      >
        <View className="items-center flex-row py-20 overflow-hidden">
          <MotiView 
            from={{ translateY: -20, translateX: 10, scale: 0.9 }}
            animate={{ translateY: 0, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', duration: 3000, loop: true }}
            className="-ml-[200px]"
          >
            <Circle size={450} colors={['#fffe00 0%', '#faff59 40%', '#fffed2 100%']} />
          </MotiView>
          <MotiView 
            from={{ translateY: -20, translateX: -20, scale: 0.9 }}
            animate={{ translateY: 20, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', delay: 2000, duration: 3000, loop: true }}
            className="-ml-[20px]"
          >
            <Circle size={450} colors={['#ff0000 0%', '#ff5959 90%', '#ffd2d2 100%']} />
          </MotiView>
          <BlurView 
            intensity={80}
            experimentalBlurMethod="dimezisBlurView"
            className="w-full flex-1 absolute top-0 left-0 right-0 bottom-0"
          />
          <LinearGradient
            colors={['transparent', '#000000']}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={{ height: 100, width: '100%', position: 'absolute', bottom: 0 }}
          />
        </View>
      </MotiView>
    </View>
  );
}
