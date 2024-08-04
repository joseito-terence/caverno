import React from 'react'
import { View, ViewProps } from 'react-native'

const ZStack = ({ children, ...props }: ViewProps) =>
  <View {...props}>
    {React.Children.map(children, (child, index) => (
      <View key={index} className="absolute" style={{ zIndex: index }}>
        {child}
      </View>
    ))}
  </View>

export default ZStack
