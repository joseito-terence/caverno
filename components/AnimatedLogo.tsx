import { useEffect, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import { LinearTransition, Easing } from "react-native-reanimated";
import { MotiView } from 'moti';
import AppNameTextSVG from "@/components/AppNameSVG";

const SCREEN = Dimensions.get('screen');

const TEXT_DURATION = 600;

const AnimatedLogo = () => {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    setShowText(true)
  }, [])

  return (
    <MotiView 
      className="flex-row"
      layout={LinearTransition.easing(Easing.ease).duration(500)}
      from={{
        translateX: 0,
        translateY: 0,
        scale: 1,
      }}
      animate={{
        translateX: (SCREEN.width - 180) / 2,
        translateY: -(SCREEN.height - 200) / 2,
        scale: 0.4,
      }}
      transition={{
        type: 'timing',
        duration: 600,
        delay: TEXT_DURATION,
      }}
    >
      <Image 
        source={require('../assets/images/adaptive-icon.png')}
        className="w-[195px] h-[195px]"
      />
      <View className="overflow-hidden translate-x-[-40px]">
        {showText && 
          <MotiView
            from={{
              opacity: 0,
              translateX: -SCREEN.width,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              type: 'timing',
              duration: TEXT_DURATION,
            }}
            className="z-[-1]"
          >
            <AppNameTextSVG />
          </MotiView>
        }
      </View>
    </MotiView>
  )
}

export default AnimatedLogo;
