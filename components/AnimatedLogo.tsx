import { View, Image, Dimensions } from "react-native";
import { EaseView } from "react-native-ease";
import AppNameTextSVG from "@/components/AppNameSVG";

const SCREEN = Dimensions.get("screen");

const TEXT_DURATION = 450;

const AnimatedLogo = () => {
  return (
    <EaseView
      className="flex-row"
      initialAnimate={{
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
        type: "timing",
        duration: 600,
        delay: TEXT_DURATION,
      }}
    >
      <Image
        source={require("../assets/images/adaptive-icon.png")}
        className="w-[195px] h-[195px]"
      />
      <AnimatedTextLogo />
    </EaseView>
  );
};

export default AnimatedLogo;

const AnimatedTextLogo = () => {
  return (
    <View className="overflow-hidden translate-x-[-40px]">
      <EaseView
        initialAnimate={{
          opacity: 0,
          translateX: -SCREEN.width,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
        }}
        transition={{
          type: "timing",
          duration: TEXT_DURATION,
        }}
        className="z-[-1]"
      >
        <AppNameTextSVG />
      </EaseView>
    </View>
  );
};
