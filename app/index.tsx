import React, { useEffect } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { View } from "react-native";
import { BlurView } from 'expo-blur';
import { MotiView, MotiImage, MotiText } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import Circle from "@/components/Circle";
import { TrebleClef, SemiQuavers, Quavers } from "@/components/icons";
import ZStack from "@/components/ZStack";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useStore } from "@/store/useStore";

export default function Index() {
  const router = useRouter()
  const { fetchCategories, fetchSongs } = useStore()
  
  useEffect(() => {
    fetchCategories()
    fetchSongs()

    setTimeout(() => {
      router.replace('/home')
    }, 2800)
  }, [])

  return (
    <View className="flex-1">
      <Animated.View className="
        absolute top-0 left-0 right-0 bottom-0 z-50
        w-full flex-1 justify-center items-center
      ">
        <AnimatedLogo />
      </Animated.View>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 800, delay: 1100 }}
        className="w-full"
      >
        <View className="items-center flex-row py-20 overflow-hidden">
          <MotiView
            from={{ translateY: -20, translateX: 10, scale: 0.9 }}
            animate={{ translateY: 0, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', duration: 2000, loop: true }}
            className="-ml-[200px] -mt-[100px]"
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 800 }}
            >
              <Circle size={500} colors={['#1dc9de 0%', '#0a3b41 100%']} />
            </MotiView>
          </MotiView>
          <MotiView
            from={{ translateY: -20, translateX: -20, scale: 0.8 }}
            animate={{ translateY: 20, translateX: 0, scale: 1 }}
            transition={{ type: 'timing', delay: 1400, duration: 2000, loop: true }}
            className="-ml-[100px] -mt-[80px]"
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 600 }}
            >
              <Circle size={450} colors={['#41a9e3 10%', '#183f54 100%']} />
            </MotiView>
          </MotiView>
          <BlurView
            intensity={80}
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
            className="w-full flex-1 absolute top-0 left-0 right-0 bottom-0"
          />
          <LinearGradient
            colors={['transparent', '#000000']}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={{ height: 100, width: '100%', position: 'absolute', bottom: 0 }}
          />
          <View className="absolute left-0 right-0 -bottom-24">
            <ZStack className="absolute bottom-[50%] w-full items-center">
              <AnimatedMusicSymbol position={[-120, -100]}>
                <SemiQuavers size={30} color='rgba(255, 255, 255, 0.5)' />
              </AnimatedMusicSymbol>
              <AnimatedMusicSymbol position={[-50, -170]}>
                <Quavers size={60} color='rgba(255, 255, 255, 0.5)' />
              </AnimatedMusicSymbol>
              <AnimatedMusicSymbol position={[40, -170]}>
                <SemiQuavers size={30} color='rgba(255, 255, 255, 0.5)' />
              </AnimatedMusicSymbol>
              <AnimatedMusicSymbol position={[120, -150]}>
                <TrebleClef size={20} color='rgba(255, 255, 255, 0.5)' />
              </AnimatedMusicSymbol>
            </ZStack>
            <MotiImage
              source={require("../assets/images/keyboard.png")}
              className="w-[350px] mx-auto"
              resizeMode="contain"
              from={{ translateY: 0, opacity: 0, scale: 0.5 }}
              animate={{ translateY: 50, opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 1300 }}
            />
          </View>
        </View>
        <View className="px-10 mt-20">
          <MotiText
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 800, delay: 1500 }}
            className="text-white/70 text-xl font-bold tracking-wider mb-4"
          >
            Perform Your
          </MotiText>
          <MotiText
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 800, delay: 1800 }}
            className="text-white text-6xl font-bold tracking-wider"
          >
            Favourite Music
          </MotiText>
        </View>
      </MotiView>
    </View>
  );
}

const AnimatedMusicSymbol = ({
  position = [0, 0],
  children
}: {
  position: number[],
  children: React.ReactNode
}) => (
  <MotiView
    from={{ translateX: 0, translateY: 0, opacity: 0 }}
    animate={{ translateX: position[0], translateY: position[1], opacity: 1 }}
    transition={{ type: 'timing', duration: 800, delay: 1300 }}
  >
    <MotiView
      from={{ rotate: '-10deg' }}
      animate={{ rotate: '10deg' }}
      transition={{ type: 'timing', duration: 800, loop: true, delay: parseInt(Math.random() * 800 + '') }}
    >
      {children}
    </MotiView>
  </MotiView>
)
