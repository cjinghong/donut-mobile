import { BlurView } from '@react-native-community/blur'
import { useNavigation } from '@react-navigation/core'
import { Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { chunk } from 'lodash'
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { SharedElement } from 'react-navigation-shared-element'

import { NFT } from '../../models/entities/nft'
import { screenWidth } from '../../utils/dimensions'
import { HapticTouchable } from '../haptic-touchable/haptic-touchable'
import { HybridImageView } from '../hybrid-image-view/hybrid-image-view'

interface NFTCollectionProps {
  nfts: NFT[]
  /// If true, the accordion is opened by default
  defaultIsOpen?: boolean
}

const NFTCollection: React.FC<NFTCollectionProps> = ({ nfts, defaultIsOpen }) => {
  const navigation = useNavigation()
  const styles = useStyleSheet(styleService)
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false)
  const [currentFont, setCurrentFont] = useState(24)

  const onSelectNft = (nft: NFT) => {
    navigation.navigate('nftDetails', { nftId: nft.id })
  }

  const renderNfts = () => {
    const maxImageSize = 200
    const numberOfCols = Math.floor(screenWidth / maxImageSize)
    const chunks = chunk(nfts, numberOfCols).map((cols) => {
      const diff = numberOfCols - cols.length
      if (diff === 0) {
        return cols
      }
      const newCols = [...cols]
      for (let i = 0; i < diff; i++) {
        newCols.push(null)
      }
      return newCols
    })
    return chunks.map((nftRow) => {
      return (
        <View
          key={nftRow.map((row, index) => row ? row.name : `nft-row-placeholder-${index}`).join('-')}
          style={styles.row}
        >
          {nftRow.map((nft, index) => {
            const imageWidth = screenWidth / nftRow.length - 16

            // Return invisible placeholder view
            // if no NFT is available
            if (!nft) {
              return (
                <View key={`nft-placeholder-${index}`}>
                  <View style={[
                    styles.nftContainer,
                    { width: imageWidth, height: imageWidth }
                  ]} />
                </View>
              )
            }

            const imageUri = nft.imagePreviewUrl || nft.imageUrl || nft.imageUrlOriginal
            return (
              <HapticTouchable key={nft.id} onPress={() => onSelectNft(nft)}>
                <SharedElement id={nft.id}>
                  <View style={[
                    styles.nftContainer,
                    { width: imageWidth, height: imageWidth }
                  ]}>
                    <HybridImageView uri={imageUri} />
                  </View>
                </SharedElement>
              </HapticTouchable>
            )
          })}
        </View>
      )
    })
  }

  const { collection } = nfts[0]
  const { name } = collection
  const headerBackgroundImage = collection.featuredImageUrl || collection.imageUrl || collection.largeImageUrl

  return (
    <View>
      <HapticTouchable onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.container}>
          <Text
            category="h4"
            style={[styles.titleText, { fontSize: currentFont }]}
            adjustsFontSizeToFit
            onTextLayout={(e) => {
              const { lines } = e.nativeEvent
              if (lines.length > 1) {
                setCurrentFont(currentFont - 1)
              }
            }}
          >
            {name}
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
      </HapticTouchable>

      <Collapsible style={styles.collapsible} collapsed={!isOpen}>
        <Image
          source={{ uri: headerBackgroundImage }}
          style={StyleSheet.absoluteFillObject}
        />
        <BlurView
          blurType="light"
          blurAmount={40}
          style={StyleSheet.absoluteFillObject}
        />
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
    borderTopWidth: 1,
    borderTopColor: 'color-gray-500',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    overflow: 'hidden'
  },
  collapsible: {
    paddingVertical: 8
  },
  titleText: {
    width: screenWidth - 32 - 16 - 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nftContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 20,
    overflow: 'hidden',
  }
})

export default NFTCollection
