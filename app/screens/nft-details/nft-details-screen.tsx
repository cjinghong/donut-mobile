import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/core"
import { NftCollection } from "../../components/nft-collection/nft-collection"
import { View } from "react-native"
import { HybridImageView } from "../../components/hybrid-image-view/hybrid-image-view"
import { screenHeight } from "../../utils/dimensions"

export const NftDetailsScreen = observer(function NftDetailsScreen() {
  const styles = useStyleSheet(styleService)
  const navigation = useNavigation()
  const { nfts, currentSelectedNftId } = useStores()

  useEffect(() => {
    if (!currentSelectedNftId) {
      navigation.goBack()
    }
  }, [currentSelectedNftId])

  if (!currentSelectedNftId) {
    return null
  }

  const selectedNft = nfts.find((nft) => nft.id === currentSelectedNftId)
  const imageUri = selectedNft.imageUrl || selectedNft.imagePreviewUrl || selectedNft.imageUrlThumbnail

  return (
    <Screen style={styles.container}>
      <View style={styles.nftContainer}>
        <HybridImageView
          uri={imageUri}
          higherQualityUri={selectedNft.imageUrlOriginal}
          resizeMode="contain"
        />
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
