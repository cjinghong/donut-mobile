import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-animatable'
import { vmin } from '../../utils/dimensions'

export const image = require("../../../assets/donut.png")

const DonutLoader: React.FC = () => {
  const styles = useStyleSheet(styleService)

  const imageStyles = {
    width: vmin * 0.4,
    height: vmin * 0.4,
  }

  return (
    <View style={styles.container}>
      <Image
        animation={{
          from: {
            translateY: 0
          },
          to: {
            translateY: -20
          },
        }}
        direction="alternate"
        easing="ease-in"
        iterationCount="infinite"
        source={image}
        style={imageStyles}
      />
      <Text category="h2" style={styles.text}>Loading NFTs...</Text>
    </View>
  )
}

const styleService = StyleService.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 16,
    color: 'color-primary-500'
  }
})

export default DonutLoader
