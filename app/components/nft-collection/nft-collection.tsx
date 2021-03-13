import React, { useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageProps,
  ListRenderItemInfo,
  StyleSheet,
  TextStyle,
  View
} from "react-native"
import { observer } from "mobx-react-lite"
import { StyleService } from "@ui-kitten/components"
import { SvgUri } from 'react-native-svg'

import { color, typography } from "../../theme"
import { Text } from "../"
import { NFT } from "../../models/entities/nft"

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface NftCollectionProps {
  nfts: NFT[]
}

export const NftCollection: React.FC<NftCollectionProps> = observer(({ nfts }) => {
  const { width, height } = Dimensions.get('screen')
  const scrollX = useRef(new Animated.Value(0)).current

  const min = width > height ? height : width
  const imageSize = min * 0.8

  const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: nfts.map((_, i) => i * width),
      outputRange: nfts.map((nft) => nft.backgroundColor || '#ffffff'),
      extrapolate: 'clamp'
    })
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor }
        ]}
      />
    )
  }

  const renderItem = (info: ListRenderItemInfo<NFT>) => {
    const { item, index } = info
    const imgUrl = item.imageUrlOriginal || item.imageUrl

    const inputRange = [
      (index - 0.4) * width,
      index * width,
      (index + 0.4) * width,
    ]
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: "clamp"
    })
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp"
    })
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [imageSize / 2, 1, imageSize / 2],
      extrapolate: "clamp",
    })

    const renderImage = () => {
      const extension = imgUrl.split('.').slice(-1)[0]
      if (extension === 'svg') {
        return (
          <SvgUri
            width={imageSize}
            height={imageSize}
            uri={imgUrl}
            style={styles.image as ImageProps}
          />
        )
      }
      return (
        <Image
          style={[
            styles.image,
            {
              width: imageSize,
              height: imageSize,
            }
          ]}
          source={{ uri: imgUrl }}
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
        <Animated.View style={{
          opacity,
          transform: [{ scale }, { translateY }],
        }}>
          {renderImage()}
        </Animated.View>
      </View>
    )
  }

  return (
    <>
      <Backdrop scrollX={scrollX} />
      <FlatList
        horizontal
        pagingEnabled
        key={nfts.map(nft => `${nft.tokenAddress}-${nft.tokenId}`).join(',')}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.tokenAddress}-${item.tokenId}`}
        data={nfts}
        renderItem={renderItem}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        <Text style={TEXT}>Hello</Text>
      </FlatList>
    </>
  )
})

const styles = StyleService.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'contain',
  }
})
