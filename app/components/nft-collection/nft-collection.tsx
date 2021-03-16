import React, { useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  View
} from "react-native"
import { observer } from "mobx-react-lite"
import { Spinner, StyleService, Text } from "@ui-kitten/components"
import { BlurView } from "@react-native-community/blur"

import { NFT } from "../../models/entities/nft"
import { HybridImageView } from "../hybrid-image-view/hybrid-image-view"
import DonutLoader from "../donut-loader/donut-loader"

export interface NftCollectionProps {
  nfts: NFT[]
  loading: boolean
}

export const NftCollection: React.FC<NftCollectionProps> = observer(({ nfts, loading }) => {
  const { width, height } = Dimensions.get('screen')
  const min = width > height ? height : width
  const imageSize = min * 0.8

  const scrollX = useRef(new Animated.Value(0)).current
  const flatList = useRef<any>()

  useEffect(() => {
    flatList.current?.scrollToOffset({ animated: false, offset: 0 })
  }, [nfts])

  const renderBackdrop = () => {
    const renderNftBackdropImages = () => {
      return nfts.map((nft, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
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
    const { item, index } = info
    const imgUrl = item.imageUrlOriginal || item.imageUrl || item.imagePreviewUrl || item.imageUrlThumbnail

    const inputRange = [
      (index - 0.4) * width,
      index * width,
      (index + 0.4) * width,
    ]
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    })
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    })
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [height * 0.6, 1, height * 0.6],
    })

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
          { width }
        ]}
      >
        <Animated.View style={[
          {
            opacity,
            transform: [{ scale }, { translateY }],
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

  return (
    <View style={styles.container}>
      {
        loading ? (
          <DonutLoader/>
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
            />
          </>
        )
      }
    </View>
  )
})

const styles = StyleService.create({
  container: {
    width: '100%',
    height: '100%'
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
