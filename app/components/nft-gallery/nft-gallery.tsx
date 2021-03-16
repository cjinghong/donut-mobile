import React, { useState } from "react"
import { ViewStyle, ListRenderItemInfo } from "react-native"
import { observer } from "mobx-react-lite"

import { StyleService, useStyleSheet } from '@ui-kitten/components'

import { NFT } from "../../models/entities/nft"
import { groupBy } from "ramda"
import { FlatList } from "react-native-gesture-handler"
import NFTCollectionItem from "./nft-collection-item"

export interface NftGalleryProps {
  style?: ViewStyle
  nfts: NFT[]
  loading: boolean
}

/**
 * Describe your component here
 */
export const NftGallery: React.FC<NftGalleryProps> = observer(({ style, nfts }) => {
  const groupedNfts = groupBy((obj: NFT) => {
    return obj.collection.name
  }, nfts)

  const renderItem = (info: ListRenderItemInfo<string>) => {
    const { item } = info
    const nfts = groupedNfts[item]
    return (
      <NFTCollectionItem nfts={nfts} />
    )
  }

  return (
    <FlatList
      removeClippedSubviews
      data={Object.keys(groupedNfts)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  )
})
