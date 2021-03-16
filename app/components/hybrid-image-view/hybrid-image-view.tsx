import React from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { SvgUri, Styles } from "react-native-svg"
import { color } from "../../theme"

const loadingImg = require("./loading.gif")

export interface HybridImageViewProps {
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle | Styles
  uri: string
}

/**
 * Render either an image view, or an SVG depending on the uri.
 * Also includes loading indicator before the image is loaded
 */
export const HybridImageView: React.FC<HybridImageViewProps> = ({ containerStyle, imageStyle, uri }) => {
  const extension = uri.split('.').slice(-1)[0]
  let imgElem: Element
  if (extension === 'svg') {
    imgElem = <SvgUri uri={uri} style={[styles.image, imageStyle]} />
  } else {
    imgElem = <FastImage
      source={{ uri, priority: FastImage.priority.normal }}
      style={[styles.image, imageStyle]}
    />
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={loadingImg} style={styles.backgroundImage} />
      {imgElem}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    backgroundColor: color.background,
    height: '100%',
    width: '100%'
  }
})
