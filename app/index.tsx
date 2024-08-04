import AnimatedLogo from "@/components/AnimatedLogo";
import { View } from "react-native";
import { BlurView } from 'expo-blur';
import { MotiView, MotiImage } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import Circle from "@/components/Circle";
import { TrebleClef, SemiQuavers, Quavers } from "@/components/icons";

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
        <View className="items-cente flex-row py-20 overflow-hidden">
          <MotiView 
            from={{ translateY: -20, translateX: 10, scale: 0.9 }}
            animate={{ translateY: 0, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', duration: 3000, loop: true }}
            className="-ml-[200px] -mt-[100px]"
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 1800 }}
            >
              <Circle size={500} colors={['#1dc9de 0%', '#0a3b41 100%']} />
            </MotiView>
          </MotiView>
          <MotiView 
            from={{ translateY: -20, translateX: -20, scale: 0.8 }}
            animate={{ translateY: 20, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', delay: 2000, duration: 3000, loop: true }}
            className="-ml-[100px] -mt-[80px]"
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 1600 }}
            >
              <Circle size={450} colors={['#41a9e3 10%', '#183f54 100%']} />
            </MotiView>
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
          <View className="absolute left-0 right-0 -bottom-16">
            <MotiImage 
              source={require("../assets/images/keyboard.png")}
              className="w-[350px] mx-auto"
              resizeMode="contain"
              from={{ translateY: 0, opacity: 0, scale: 0.5 }}
              animate={{ translateY: 50, opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 2000 }}
            />
          </View>
        </View>

        <View className="flex-row">
          <TrebleClef size={20} />
          <SemiQuavers size={30} />
          <Quavers size={60} />
        </View>
      </MotiView>
    </View>
  );
}
