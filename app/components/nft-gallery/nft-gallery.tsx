import React from "react"
import { ListRenderItemInfo, FlatList, View, Image, Alert, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { groupBy } from "ramda"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"

import { NFT } from "../../models/entities/nft"
import NFTCollection from "./nft-collection"
import SimpleLink from "../simple-link/simple-link"
import { screenWidth, vmin } from "../../utils/dimensions"
const emptyImage = require('./empty.png')

export interface NftGalleryProps {
  nfts: NFT[]
}

/**
 * Describe your component here
 */
export const NftGallery: React.FC<NftGalleryProps> = observer(({ nfts }) => {
  const styles = useStyleSheet(styleService)
  const { bottom } = useSafeAreaInsets()
  const groupedNfts = groupBy((obj: NFT) => {
    return obj.collection.name
  }, nfts)

  const renderItem = (info: ListRenderItemInfo<string>) => {
    const { item, index } = info
    const nfts = groupedNfts[item]
    return (
      <NFTCollection nfts={nfts} defaultIsOpen={index === 0} />
    )
  }

  const goToOpenSea = () => {
    const url = 'https://opensea.io'
    if (Linking.canOpenURL(url)) {
      Alert.alert('Navigate To OpenSea', `Do you want to navigate to ${url}?`, [
        { text: "OK", onPress: () => Linking.openURL(url) },
        { text: "Cancel", style: 'cancel' }
      ])
    }
  }

  const goToRoadmap = () => {
    // const url = 'https://opensea.io'
    // if (Linking.canOpenURL(url)) {
    //   Linking.openURL(url)
    // }
  }

  return (
    <FlatList
      removeClippedSubviews
      data={Object.keys(groupedNfts)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: bottom }}
      ListEmptyComponent={(
        <View style={styles.emptyContainer}>
          <Image source={emptyImage} style={styles.emptyImage} />
          <Text category="h3" style={[styles.emptyText, styles.emptyTitle]}>Hold right there! 🚨</Text>
          <Text category="p1" style={styles.emptyText}>
            It seems like you don't own any NFTs. Check out some of the NFTs for
            sale on <SimpleLink onPress={goToOpenSea}>Open Sea</SimpleLink>.
          </Text>
          <Text category="p1" style={[styles.emptyText, styles.caption]}>
            The <Text style={styles.bold}>Donut NFT dealer</Text> is still a work-in-progress. You can learn more about our
            roadmap <SimpleLink onPress={goToRoadmap}>here</SimpleLink>.
          </Text>
        </View>
      )}
    />
  )
})

const styleService = StyleService.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyImage: {
    resizeMode: 'contain',
    width: vmin * 0.5,
    height: vmin * 0.5,
    maxWidth: 240,
    maxHeight: 240
  },
  emptyTitle: {
    color: 'color-primary-500',
    paddingVertical: 24,
  },
  emptyText: {
    textAlign: 'center',
    paddingBottom: 8,
  },
  caption: {
    paddingTop: 16
  },
  bold: {
    fontWeight: '800'
  },
})
