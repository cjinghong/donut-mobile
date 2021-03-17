import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle, ResizeMode } from "react-native-fast-image"
import { Styles, SvgCssUri } from "react-native-svg"
import Video from 'react-native-video'

const loadingImg = require("./loading.gif")

export interface HybridImageViewProps {
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle | Styles
  resizeMode?: ResizeMode
  /// If provided, will attempt to load the higher quality uri after image finished loading.
  higherQualityUri?: string
  uri: string
}

type FileType = 'video' | 'image' | 'svg'
const getFileType = (url: string): FileType => {
  const extension = url.split('.').slice(-1)[0]
  if (extension === 'svg') {
    return 'svg'
  } else if (extension === 'mp4') {
    return 'video'
  }
  return 'image'
}

/**
 * Render either an image view, or an SVG depending on the uri.
 * Also includes loading indicator before the image is loaded
 */
export const HybridImageView: React.FC<HybridImageViewProps> = ({
  containerStyle,
  imageStyle,
  resizeMode,
  higherQualityUri,
  uri,
}) => {
  const fileType = getFileType(uri)
  const [currentUri, setCurrentUri] = useState(fileType === 'image' ? uri : (higherQualityUri || uri))

  // Other than images, its always loaded
  const [imgLoaded, setImgLoaded] = useState(fileType !== 'image')

  const onLoad = () => {
    setImgLoaded(true)
    if (higherQualityUri && currentUri !== higherQualityUri) {
      setCurrentUri(higherQualityUri)
    }
  }

  let imgElem: Element
  if (fileType === 'svg') {
    imgElem = (
      <SvgCssUri
        uri={currentUri}
        style={[styles.image, imageStyle]}
        fill={"black"}
      />
    )
  } else if (fileType === 'video') {
    imgElem = (
      <Video source={{ uri: currentUri }} // Can be a URL or a local file.
        muted
        repeat
        style={[styles.image, imageStyle]}
        resizeMode={resizeMode}
      />
    )
  } else {
    imgElem = <FastImage
      source={{ uri: currentUri, priority: FastImage.priority.normal }}
      style={[styles.image, imageStyle]}
      onLoadEnd={onLoad}
      resizeMode={resizeMode}
    />
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {
        !imgLoaded && (
          <Image source={loadingImg} style={styles.backgroundImage} />
        )
      }
      {imgElem}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 200,
    position: 'absolute',
    resizeMode: 'contain',
    width: 200
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
  }
})
