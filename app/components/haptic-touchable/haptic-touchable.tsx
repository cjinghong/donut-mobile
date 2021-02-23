import * as React from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { observer } from "mobx-react-lite"
import * as Haptics from 'expo-haptics'

export interface HapticTouchableProps extends TouchableOpacityProps {
  children: JSX.Element
}

/**
 * Describe your component here
 */
export const HapticTouchable = observer(function HapticTouchable(props: HapticTouchableProps) {
  const { onPress, children, ...others } = props
  return (
    <TouchableOpacity
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress && onPress(e)
      }}
      {...others}
    >
      {children}
    </TouchableOpacity>
  )
})
