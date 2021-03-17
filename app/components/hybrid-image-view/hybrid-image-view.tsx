import React, { useState } from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle, ResizeMode } from "react-native-fast-image"
import { Styles, SvgCssUri } from "react-native-svg"
import Video from 'react-native-video'

const loadingImg = require("./loading.gif")

export interface HybridImageViewProps {
  uri: string
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle | Styles
  resizeMode?: ResizeMode
  /// If provided, will attempt to load the higher quality uri after image finished loading.
  higherQualityUri?: string
  videoControls?: boolean,
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
  videoControls
}) => {
  // Other than images, its always loaded
  const [imgLoaded, setImgLoaded] = useState(getFileType(uri) !== 'image')

  const onNormalUriLoaded = () => {
    setImgLoaded(true)
  }

  const renderImgElem = (url: string, defaultStyle: any, onLoad?: () => void) => {
    const fileType = getFileType(uri)
    if (fileType === 'svg') {
      return (
        <SvgCssUri
          uri={url}
          style={[defaultStyle, imageStyle]}
          fill={"black"}
        />
      )
    } else if (fileType === 'video') {
      return (
        <Video
          muted
          repeat
          controls={!!videoControls}
          source={{ uri: url }}
          style={[defaultStyle, imageStyle]}
          resizeMode={resizeMode}
        />
      )
    } else {
      return <FastImage
        source={{ uri: url, priority: FastImage.priority.normal }}
        style={[defaultStyle, imageStyle]}
        onLoadEnd={onLoad}
        resizeMode={resizeMode}
      />
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {
        !imgLoaded && (
          <Image source={loadingImg} style={styles.backgroundImage} />
        )
      }
      {renderImgElem(uri, styles.image, onNormalUriLoaded)}
      {
        higherQualityUri && renderImgElem(higherQualityUri, styles.highQualityImage)
      }
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
  highQualityImage: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    height: '100%',
    width: '100%',
  }
})
