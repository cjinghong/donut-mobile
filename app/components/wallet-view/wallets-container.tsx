import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Animated, NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"

import { Wallet } from "../../models/entities/wallet"
import { HapticTouchable } from "../haptic-touchable/haptic-touchable"
import { delay } from "../../utils/delay"

interface WalletsContainerProps {
  style?: ViewStyle,
  wallets: Wallet[];
  currentWalletIndex: number;
  onSelectWalletIndex: (index: number) => void;
  onWalletIndexPress: (index: number) => void;
}

const CONTENT_HEIGHT = 100

export const WalletsContainer: React.FC<WalletsContainerProps> = observer(({
  style,
  currentWalletIndex,
  wallets,
  onSelectWalletIndex,
  onWalletIndexPress
}) => {
  const styles = useStyleSheet(styleService)
  const scrollY = useRef(new Animated.Value(0)).current
  const flatList = useRef(null)

  useEffect(() => {
    flatList.current?.scrollToIndex({ index: currentWalletIndex, animated: true })
  }, [currentWalletIndex])

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 0.5) * CONTENT_HEIGHT,
      index * CONTENT_HEIGHT,
      (index + 0.5) * CONTENT_HEIGHT
    ]
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp"
    })
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: "clamp"
    })
    return (
      <HapticTouchable onPress={() => onWalletIndexPress(index)}>
        <Animated.View
          style={[
            styles.walletContainer,
            {
              transform: [
                { scale }
              ],
              opacity
            }
          ]}
        >
          <Text category="h4">
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.publicKey}>
            {item.publicKey}
          </Text>
        </Animated.View>
      </HapticTouchable>
    )
  }

  // Select wallet when scrolling ends
  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    // Divide the horizontal offset by the width of the view to see which page is visible
    const newWalletIndex = Math.floor(contentOffset.y / layoutMeasurement.height)

    if (newWalletIndex >= 0) {
      onSelectWalletIndex(newWalletIndex)
    }
  }

  // Render wallets
  return (
    <View style={[
      styles.card,
      ...(style ? [style] : [])
    ]}>
      <Animated.FlatList
        pagingEnabled
        style={styles.flatList}
        snapToInterval={CONTENT_HEIGHT}
        decelerationRate="fast"
        initialScrollIndex={currentWalletIndex}
        onScrollToIndexFailed={info => {
          delay(500).then(() => {
            flatList.current?.scrollToIndex({ index: info.index, animated: true })
          })
        }}
        ref={flatList}
        data={wallets}
        renderItem={renderItem}
        keyExtractor={(item: Wallet, index: number) => `${item.publicKey}-${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          // Use native driver improves transform/translate/opacity animations
          { useNativeDriver: true },
        )}
        onMomentumScrollEnd={onScrollEnd}
      />
    </View>
  )
})

const styleService = StyleService.create({
  card: {
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
    shadowColor: "color-gray",
    backgroundColor: 'white',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    height: CONTENT_HEIGHT
  },
  flatList: {
    width: '100%'
  },
  walletContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    height: CONTENT_HEIGHT,
  },
  publicKey: {
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    padding: 16
  },
  addWalletView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
})
