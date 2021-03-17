import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import { View } from "react-native"
import { HybridImageView } from "../../components/hybrid-image-view/hybrid-image-view"
import { screenHeight } from "../../utils/dimensions"
import { SharedElement } from "react-navigation-shared-element"
import { HomeParamList } from "../../navigation/home-navigator"

const NftDetailsScreen = observer(function NftDetailsScreen() {
  const styles = useStyleSheet(styleService)
  const navigation = useNavigation()
  const { nfts } = useStores()
  const { params } = useRoute<RouteProp<HomeParamList, 'nftDetails'>>()
  const { nftId } = params || {}

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

  return (
    <Screen style={styles.container}>
      <View style={styles.nftContainer}>
        <SharedElement id={nftId}>
          <HybridImageView
            uri={imageUri}
            higherQualityUri={selectedNft.imageUrlOriginal}
            resizeMode="contain"
          />
        </SharedElement>
      </View>
    </Screen>
  )
})

const styleService = StyleService.create({
  container: {
    flex: 1,
    padding: 16
  },
  nftContainer: {
    height: screenHeight * 0.5
  },
})

export default NftDetailsScreen
