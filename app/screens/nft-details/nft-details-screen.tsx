import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import { ScrollView, Image, View, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { SharedElement } from "react-navigation-shared-element"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useStores } from "../../models"
import { HybridImageView } from "../../components/hybrid-image-view/hybrid-image-view"
import { screenWidth } from "../../utils/dimensions"
import { HomeParamList } from "../../navigation/home-navigator"
import { color } from "../../theme"

const CONTAINER_PADDING = 16

const NftDetailsScreen = observer(function NftDetailsScreen() {
  const styles = useStyleSheet(styleService)
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const { nfts } = useStores()

  const { params } = useRoute<RouteProp<HomeParamList, 'nftDetails'>>()
  const { nftId } = params || {}

  const [imageSize, setImageSize] = useState({
    width: screenWidth - CONTAINER_PADDING * 2,
    height: screenWidth - CONTAINER_PADDING * 2
  })

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

    if (y <= -150) {
      navigation.goBack()
    }
  }

  const imageContainerStyles = [
    styles.nftContainer,
    { backgroundColor: selectedNft.backgroundColor || 'transparent' },
    { width: imageSize.width, height: imageSize.height }
  ]

  return (
    <ScrollView
      style={[
        { paddingTop: top + 8 },
        styles.container
      ]}
      onScroll={onScroll}
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
    </ScrollView>
  )
})

const styleService = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: CONTAINER_PADDING,
  },
  nftContainer: {
    overflow: 'hidden',
    borderRadius: 20
  },
})

export default NftDetailsScreen
