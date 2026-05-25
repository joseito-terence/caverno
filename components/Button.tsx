import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export const Button = (props: TouchableOpacityProps & { testID?: string }) => {
  return (
    <TouchableOpacity {...props} testID={props.testID}>
      <View
        className={
          props?.className ||
          "h-12 w-12 items-center justify-center bg-gray-800/95 rounded-full"
        }
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
};
