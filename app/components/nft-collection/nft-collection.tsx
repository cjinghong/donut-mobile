import React, { useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  View
} from "react-native"
import { observer } from "mobx-react-lite"
import { StyleService } from "@ui-kitten/components"
import { SvgUri } from 'react-native-svg'
import FastImage from 'react-native-fast-image'
import { BlurView } from "@react-native-community/blur"

import { NFT } from "../../models/entities/nft"

export interface NftCollectionProps {
  nfts: NFT[]
}

export const NftCollection: React.FC<NftCollectionProps> = observer(({ nfts }) => {
  const { width, height } = Dimensions.get('screen')
  const min = width > height ? height : width
  const imageSize = min * 0.8

  const scrollX = useRef(new Animated.Value(0)).current
  const flatList = useRef<any>()

  useEffect(() => {
    flatList.current?.scrollToOffset({ animated: false, offset: 0 })
  }, [nfts])

  const renderItem = (info: ListRenderItemInfo<NFT>) => {
    const { item, index } = info
    const imgUrl = item.imagePreviewUrl || item.imageUrlThumbnail || item.imageUrl || item.imageUrlOriginal

    const inputRange = [
      (index - 0.4) * width,
      index * width,
      (index + 0.4) * width,
    ]
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.1, 1, 0.1],
    })
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    })
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [imageSize, 1, imageSize],
    })

    const renderImage = () => {
      const extension = imgUrl.split('.').slice(-1)[0]
      const imageStyle: any = {
        borderRadius: 20,
        width: imageSize,
        height: imageSize,
        overflow: 'hidden'
      }
      if (extension === 'svg') {
        return (
          <View style={imageStyle}>
            <SvgUri uri={imgUrl} />
          </View>
        )
      }
      return (
        <FastImage
          style={imageStyle}
          source={{
            uri: imgUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )
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
          {renderImage()}
        </Animated.View>
      </View>
    )
  }

  return (
    <View>
      <View style={StyleSheet.absoluteFillObject}>
        {
          nfts.map((nft, index) => {
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
            const extension = imgUrl.split('.').slice(-1)[0]
            return (
              <Animated.View
                key={`${nft.tokenAddress}-${nft.tokenId}`}
                style={[
                  StyleSheet.absoluteFillObject,
                  { opacity }
                ]}
              >
                {
                  extension === 'svg' ? (
                    <SvgUri uri={imgUrl} style={StyleSheet.absoluteFillObject} />
                  ) : (
                    <FastImage
                      source={{ uri: imgUrl }}
                      style={StyleSheet.absoluteFillObject}
                    />
                  )
                }
                <FastImage
                  source={{ uri: nft.imageUrlOriginal || nft.imageUrl }}
                  style={StyleSheet.absoluteFillObject}
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
      </View>
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
    </View>
  )
})

const styles = StyleService.create({
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
