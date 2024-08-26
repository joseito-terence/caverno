import React from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { Dimensions, View } from "react-native";
import { BlurView } from 'expo-blur';
import { MotiView, MotiImage, MotiText } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import Circle from "@/components/Circle";
import { TrebleClef, SemiQuavers, Quavers } from "@/components/icons";
import ZStack from "@/components/ZStack";
import SlideToUnlock, { SLIDER_WIDTH } from "@/components/SlideToUnlock";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { usePrefetchCategories } from "@/hooks/useCategories";

const SCREEN = Dimensions.get('screen')

export default function Index() {
  usePrefetchCategories()
  const router = useRouter()
  const translateX = useSharedValue(0)

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: interpolate(
          translateX.value,
          [0, SLIDER_WIDTH],
          [0, -SCREEN.width]
        )
      }],
      opacity: interpolate(
        translateX.value,
        [0, SLIDER_WIDTH],
        [1, 0]
      )
    }
  }, [])

  return (
    <View className="flex-1">
      <Animated.View style={rStyle} className="
        absolute top-0 left-0 right-0 bottom-0 z-50
        w-full flex-1 justify-center items-center
      ">
        <AnimatedLogo />
      </Animated.View>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000, delay: 2000 }}
        className="w-full"
        style={rStyle}

      >
        <View className="items-center flex-row py-20 overflow-hidden">
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
          <View className="absolute left-0 right-0 -bottom-16">
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
              transition={{ type: 'timing', duration: 1000, delay: 2000 }}
            />
          </View>
        </View>
        <View className="px-10">
          <MotiText
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 3500 }}
            className="text-white/70 text-xl font-bold tracking-wider mb-4"
          >
            Perform Your
          </MotiText>
          <MotiText
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 3800 }}
            className="text-white text-6xl font-bold tracking-wider"
          >
            Favourite Music
          </MotiText>
        </View>
      </MotiView>

      <View className="z-[1000] px-10 flex-1 justify-center items-center absolute bottom-10">
        <SlideToUnlock
          translateX={translateX}
          onUnlock={() => router.replace('/home')}
        />
      </View>
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
    transition={{ type: 'timing', duration: 1000, delay: 3000 }}
  >
    <MotiView
      from={{ rotate: '-10deg' }}
      animate={{ rotate: '10deg' }}
      transition={{ type: 'timing', duration: 1000, loop: true, delay: parseInt(Math.random() * 1000 + '') }}
    >
      {children}
    </MotiView>
  </MotiView>
)
