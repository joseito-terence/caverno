import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"

export const Button = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <View className="
        h-12 w-12 items-center justify-center
        bg-gray-800/95 rounded-full
      ">
        {props.children}
      </View>
    </TouchableOpacity>
  )
}
