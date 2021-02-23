import * as React from "react"
import { observer } from "mobx-react-lite"
import { Button, ButtonProps } from '@ui-kitten/components'
import * as Haptics from 'expo-haptics'

export interface HapticButtonProps extends ButtonProps {

}

/**
 * Describe your component here
 */
export const HapticButton = observer(function HapticButton(props: HapticButtonProps) {
  const { onPress, children, ...others } = props
  return (
    <Button
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress && onPress(e)
      }}
      {...others}
    >
      {children}
    </Button>
  )
})
