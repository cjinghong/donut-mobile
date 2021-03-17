import React from "react"
import { ListRenderItemInfo, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { groupBy } from "ramda"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { NFT } from "../../models/entities/nft"
import NFTCollection from "./nft-collection"

export interface NftGalleryProps {
  nfts: NFT[]
  loading: boolean
}

/**
 * Describe your component here
 */
export const NftGallery: React.FC<NftGalleryProps> = observer(({ nfts }) => {
  const { bottom } = useSafeAreaInsets()
  const groupedNfts = groupBy((obj: NFT) => {
    return obj.collection.name
  }, nfts)

  const renderItem = (info: ListRenderItemInfo<string>) => {
    const { item, index } = info
    const nfts = groupedNfts[item]
    return (
      <NFTCollection nfts={nfts} defaultIsOpen={index === 0}/>
    )
  }

  return (
    <FlatList
      removeClippedSubviews
      data={Object.keys(groupedNfts)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: bottom }}
    />
  )
})
