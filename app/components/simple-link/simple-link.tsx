import { StyleService, Text, TextElement, TextProps, useStyleSheet } from '@ui-kitten/components'
import React from 'react'

declare type ChildElement = React.ReactText | TextElement;
interface SimpleLinkProps {
  textProps?: TextProps
  children: ChildElement | ChildElement[];
  onPress: () => void
}

const SimpleLink: React.FC<SimpleLinkProps> = ({
  textProps,
  children,
  onPress
}) => {
  const styles = useStyleSheet(styleService)
  const { style } = textProps || {}

  return (
    <Text style={[styles.defaultText, style]} onPress={onPress} {...textProps}>
      {children}
    </Text>
  )
}

const styleService = StyleService.create({
  defaultText: {
    color: 'color-primary-500',
    fontWeight: '800'
  }
})

export default SimpleLink
