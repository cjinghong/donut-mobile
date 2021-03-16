import React, { useEffect, useRef } from "react"
import {
  Alert,
  Animated,
  Image,
  Linking,
  ListRenderItemInfo,
  StyleSheet,
  View
} from "react-native"
import { observer } from "mobx-react-lite"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { BlurView } from "@react-native-community/blur"

import { NFT } from "../../models/entities/nft"
import { HybridImageView } from "../hybrid-image-view/hybrid-image-view"
import DonutLoader from "../donut-loader/donut-loader"
import { screenHeight, screenWidth, vmin } from "../../utils/dimensions"
import SimpleLink from "../simple-link/simple-link"

const emptyImage = require('./empty.png')

export interface NftCollectionProps {
  nfts: NFT[]
  loading: boolean
}

export const NftCollection: React.FC<NftCollectionProps> = observer(({ nfts, loading }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const flatList = useRef<any>()
  const styles = useStyleSheet(styleService)

  useEffect(() => {
    flatList.current?.scrollToOffset({ animated: false, offset: 0 })
  }, [nfts])

  const renderBackdrop = () => {
    const renderNftBackdropImages = () => {
      return nfts.map((nft, index) => {
        const inputRange = [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ]
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        })
        const imgUrl = nft.imageUrlThumbnail || nft.imagePreviewUrl || nft.imageUrl || nft.imageUrlOriginal
        return (
          <Animated.View
            key={`${nft.tokenAddress}-${nft.tokenId}`}
            style={[
              StyleSheet.absoluteFillObject,
              { opacity }
            ]}
          >
            <HybridImageView
              uri={imgUrl}
              containerStyle={StyleSheet.absoluteFillObject}
            />
            <BlurView
              blurType="light"
              blurAmount={60}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        )
      })
    }
    return (
      <View style={StyleSheet.absoluteFillObject}>
        {renderNftBackdropImages()}
      </View>
    )
  }

  const renderItem = (info: ListRenderItemInfo<NFT>) => {
    const imageSize = vmin * 0.9
    const { item, index } = info
    const imgUrl = item.imageUrlOriginal || item.imageUrl || item.imagePreviewUrl || item.imageUrlThumbnail

    const inputRange = [
      (index - 0.4) * screenWidth,
      index * screenWidth,
      (index + 0.4) * screenWidth,
    ]
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    })
    // const scale = scrollX.interpolate({
    //   inputRange,
    //   outputRange: [0.4, 1, 0.4],
    // })
    // const translateY = scrollX.interpolate({
    //   inputRange,
    //   outputRange: [screenHeight * 0.6, 1, screenHeight * 0.6],
    // })

    const containerStyle: any = {
      borderRadius: 20,
      width: imageSize,
      height: imageSize,
      overflow: 'hidden',
      backgroundColor: 'white'
    }

    return (
      <View
        style={[
          styles.itemContainer,
          { width: screenWidth }
        ]}
      >
        <Animated.View style={[
          {
            opacity,
            transform: [
              // { scale },
              // { translateY }
            ],
          },
          styles.nftImageContainer
        ]}>
          <HybridImageView
            uri={imgUrl}
            // uri={''}
            containerStyle={containerStyle}
          />
          <Text category="h5">{item.name}</Text>
        </Animated.View>
      </View>
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
    <View style={styles.container}>
      {
        loading ? (
          <DonutLoader />
        ) : (
          <>
            {renderBackdrop()}
            <Animated.FlatList
              horizontal
              pagingEnabled
              removeClippedSubviews
              ref={flatList}
              initialNumToRender={5}
              key={nfts.map(nft => `${nft.tokenAddress}-${nft.tokenId}`).join(',')}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.tokenAddress}-${item.tokenId}`}
              data={nfts}
              renderItem={renderItem}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              bounces={!!nfts.length}
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
          </>
        )
      }
    </View>
  )
})

const styleService = StyleService.create({
  container: {
    width: '100%',
    height: '100%'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: vmin * 0.1,
    width: screenWidth
  },
  emptyImage: {
    resizeMode: 'contain',
    width: vmin * 0.5,
    height: vmin * 0.5,
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
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nftImageContainer: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20
  }
})
