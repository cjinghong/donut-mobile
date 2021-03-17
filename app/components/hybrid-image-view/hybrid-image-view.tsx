import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { SvgUri, Styles, SvgCssUri } from "react-native-svg"
import Video from 'react-native-video'

const loadingImg = require("./loading.gif")

export interface HybridImageViewProps {
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle | Styles
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
export const HybridImageView: React.FC<HybridImageViewProps> = ({ containerStyle, imageStyle, uri }) => {
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const fileType = getFileType(uri)

  // Other than images, its always loaded
  const [imgLoaded, setImgLoaded] = useState(fileType !== 'image')

  const onLoad = () => {
    if (isMounted) {
      setImgLoaded(true)
    }
  }

  let imgElem: Element
  if (fileType === 'svg') {
    // imgElem = (
    //   <SvgUri
    //     uri={uri}
    //     style={[styles.image, imageStyle]}
    //   />
    // )
    imgElem = (
      <SvgCssUri
        uri={uri}
        style={[styles.image, imageStyle]}
        fill={"black"}
      />
    )
  } else if (fileType === 'video') {
    imgElem = (
      <Video source={{ uri }} // Can be a URL or a local file.
        muted
        repeat
        style={[styles.image, imageStyle]}
      />
    )
  } else {
    imgElem = <FastImage
      source={{ uri, priority: FastImage.priority.normal }}
      style={[styles.image, imageStyle]}
      onLoadEnd={onLoad}
    />
  }

  // imgElem = <SvgUri
  //     uri="https://storage.opensea.io/files/246fefb9491d5223c65de2152498cbb3.svg"
  //     // uri={uri}
  //     style={[styles.image, imageStyle, { backgroundColor: 'white' }]}
  //     width={200}
  //     height={200}
  //   />

  // if (uri === 'https://storage.opensea.io/files/246fefb9491d5223c65de2152498cbb3.svg') {
  //   console.log('ft', uri)
  //   // imgElem = <FastImage
  //   //   source={{ uri: '', priority: FastImage.priority.normal }}
  //   //   style={[styles.image, imageStyle]}
  //   //   onLoadEnd={onLoad}
  //   // />
  //   imgElem = (
  //     <SvgCssUri
  //       uri={uri}
  //       style={[styles.image, imageStyle]}
  //       fill={"black"}
  //     />
  //   )
  // }

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
