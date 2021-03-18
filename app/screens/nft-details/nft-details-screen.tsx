import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import { Image, View, NativeScrollEvent, NativeSyntheticEvent, Animated } from "react-native"
import { SharedElement } from "react-navigation-shared-element"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import LottieView from 'lottie-react-native'

import { useStores } from "../../models"
import { HybridImageView } from "../../components/hybrid-image-view/hybrid-image-view"
import { screenWidth } from "../../utils/dimensions"
import { HomeParamList } from "../../navigation/home-navigator"
import { color } from "../../theme"

const arrowAnim = require('./arrow-anim.json')
const CONTAINER_PADDING = 16
const SCROLL_DISMISS_THRESHOLD = 150

const NftDetailsScreen = observer(function NftDetailsScreen() {
  const styles = useStyleSheet(styleService)
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const { nfts } = useStores()
  const scrollY = useRef(new Animated.Value(0)).current

  const { params } = useRoute<RouteProp<HomeParamList, 'nftDetails'>>()
  const { nftId } = params || {}

  const [imageSize, setImageSize] = useState({
    width: screenWidth - CONTAINER_PADDING * 2,
    height: screenWidth - CONTAINER_PADDING * 2
  })
  const [dismissing, setDismissing] = useState(false)

  useEffect(() => {
    if (!nftId) {
      navigation.goBack()
    }
  }, [nftId])

  if (!nftId) {
    return null
  }

  const selectedNft = nfts.find((nft) => nft.id === nftId)
  const imageUri = selectedNft.imageUrl || selectedNft.imagePreviewUrl || selectedNft.imageUrlThumbnail

  // Get image size
  useEffect(() => {
    Image.getSize(
      imageUri,
      (width, height) => {
        // Get image ratio, scale to fit width
        if (!!width && !!height) {
          const ratio = height / width
          setImageSize({
            width: screenWidth - (CONTAINER_PADDING * 2),
            height: screenWidth * ratio - (CONTAINER_PADDING * 2)
          })
        }
      }, (error) => {
        console.log(error)
      })
  }, [])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event
    const { contentOffset } = nativeEvent
    const { y } = contentOffset

    if (y <= -SCROLL_DISMISS_THRESHOLD && !dismissing) {
      setDismissing(true)
      navigation.goBack()
    }
  }

  const imageContainerStyles = [
    styles.nftContainer,
    { backgroundColor: selectedNft.backgroundColor || 'transparent' },
    { width: imageSize.width, height: imageSize.height }
  ]

  const translateY = scrollY.interpolate({
    inputRange: [-SCROLL_DISMISS_THRESHOLD, -SCROLL_DISMISS_THRESHOLD + SCROLL_DISMISS_THRESHOLD * 0.4, 0],
    outputRange: [SCROLL_DISMISS_THRESHOLD / 2 - SCROLL_DISMISS_THRESHOLD * 0.2, 20, -100],
  })
  const scale = scrollY.interpolate({
    inputRange: [-SCROLL_DISMISS_THRESHOLD, -SCROLL_DISMISS_THRESHOLD + SCROLL_DISMISS_THRESHOLD * 0.4, 0],
    outputRange: [1, 0.9, 0.1],
  })
  const opacity = scrollY.interpolate({
    inputRange: [-SCROLL_DISMISS_THRESHOLD + SCROLL_DISMISS_THRESHOLD * 0.3, -SCROLL_DISMISS_THRESHOLD + SCROLL_DISMISS_THRESHOLD * 0.4, 0],
    outputRange: [1, 0.5, 0],
  })
  const progress = scrollY.interpolate({
    inputRange: [-SCROLL_DISMISS_THRESHOLD, 10],
    outputRange: [0.7, 0],
  })

  return (
    <View style={styles.container}>
      {
        !dismissing && (
          <View style={styles.headerContainer}>
            <Animated.View style={[
              styles.headerAnimTextContainer,
              {
                paddingTop: top,
                opacity,
                transform: [{ translateY }, { scale }]
              }
            ]}>
              <LottieView style={styles.arrowAnim} source={arrowAnim} progress={progress} />
              <Text category="s1" style={styles.headerText}>Pull down to go back</Text>
            </Animated.View>
          </View>
        )
      }
      <Animated.ScrollView
        style={[
          { paddingTop: top + 8 },
          styles.scrollView
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true, listener: onScroll }
        )}
        scrollEventThrottle={32}
      >
        <SharedElement id={nftId}>
          <View style={imageContainerStyles}>
            <HybridImageView
              videoControls
              uri={imageUri}
              higherQualityUri={selectedNft.imageUrlOriginal}
              resizeMode="contain"
            />
          </View>
        </SharedElement>
        {
          !dismissing && (
            <View style={styles.detailsContainer}>
              <Text category="h4">
                {selectedNft.name}
              </Text>
              <Text category="s1">
                {selectedNft.collection.description}
              </Text>
            </View>
          )
        }
      </Animated.ScrollView>
    </View>
  )
})

const styleService = StyleService.create({
  headerContainer: {
    position: 'absolute',
    height: SCROLL_DISMISS_THRESHOLD,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerAnimTextContainer: {
    alignItems: 'center'
  },
  arrowAnim: {
    width: 56,
    height: 56,
  },
  headerText: {
    color: 'color-primary-500'
  },
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  scrollView: {
    flex: 1,
    padding: CONTAINER_PADDING,
  },
  detailsContainer: {

  },
  nftContainer: {
    overflow: 'hidden',
    borderRadius: 20
  },
})

export default NftDetailsScreen
