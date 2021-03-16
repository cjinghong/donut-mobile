import { Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { chunk } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Collapsible from 'react-native-collapsible'

import { NFT } from '../../models/entities/nft'
import { screenWidth, vmin } from '../../utils/dimensions'
import { HybridImageView } from '../hybrid-image-view/hybrid-image-view'

interface NFTItemProps {
  nfts: NFT[]
}

const NFTCollectionItem: React.FC<NFTItemProps> = ({ nfts }) => {
  const styles = useStyleSheet(styleService)
  const [isOpen, setIsOpen] = useState(false)
  const collectionName = nfts[0].collection.name

  const renderNfts = () => {
    // Chunk to rows of 2
    // TODO: - On tablet chunks to 3-4 cols
    const numberOfCols = 2
    const chunks = chunk(nfts, numberOfCols)
    return chunks.map((nftRow) => {
      return (
        <View key={nftRow.map(row => row.name).join('-')} style={styles.row}>
          {nftRow.map((nft) => {
            const imageWidth = vmin / nftRow.length - 16
            const imageUri = nft.imagePreviewUrl || nft.imageUrl || nft.imageUrlOriginal
            return (
              <View key={nft.name} style={[
                styles.nftContainer,
                { width: imageWidth, height: imageWidth }
              ]}>
                <HybridImageView uri={imageUri} />
              </View>
            )
          })}
        </View>
      )
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.container}>
          <Text category="h4">
            {collectionName}
          </Text>
          <View style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }]
          }}>
            <Icon style={styles.arrowIcon}
              fill='#8F9BB3'
              name="arrow-ios-upward-outline"
            />
          </View>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={!isOpen}>
        {renderNfts()}
      </Collapsible>
    </View>
  )
}

const styleService = StyleService.create({
  arrowIcon: {
    height: 32,
    width: 32,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'color-gray-500',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 32
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  nftContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20
  }
})

export default NFTCollectionItem
