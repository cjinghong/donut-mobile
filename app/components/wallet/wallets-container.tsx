import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import * as Haptics from 'expo-haptics'

import { Wallet } from "../../models/entities/wallet"
import { HapticTouchable } from "../haptic-touchable/haptic-touchable"

interface WalletsContainerProps {
  wallets: Wallet[];
  currentWalletIndex: number;
  onSelectWalletIndex: (index: number) => void;
}

const CONTENT_HEIGHT = 120

export const WalletsContainer: React.FC<WalletsContainerProps> = observer(({
  currentWalletIndex,
  wallets,
  onSelectWalletIndex
}) => {
  const styles = useStyleSheet(styleService)
  const { height } = Dimensions.get("screen")
  const scrollY = useRef(new Animated.Value(0)).current
  const flatList = useRef(null)

  useEffect(() => {
    // Scroll to current wallet
    flatList.current.scrollToIndex({ index: currentWalletIndex })
  }, [])

  const renderAddWalletView = () => {
    const negativeScrollY = Animated.multiply(scrollY, -1)
    const inputRange = [0, CONTENT_HEIGHT * 0.3, CONTENT_HEIGHT * 0.6]
    const outputRange = [0, 0, 1]
    const opacity = negativeScrollY.interpolate({
      inputRange,
      outputRange
    })
    const translateY = negativeScrollY.interpolate({
      inputRange: [0, CONTENT_HEIGHT * 0.6, height],
      outputRange: [-100, 0, 0]
    })
    const scale = negativeScrollY.interpolate({
      inputRange: [0, CONTENT_HEIGHT * 0.5, CONTENT_HEIGHT * 0.55, height],
      outputRange: [0.8, 0.8, 1, 1]
    })

    return (
      <Animated.View style={[
        styles.addWalletView,
        {
          opacity,
          transform: [{ translateY, scale }]
        }
      ]}>
        <Text category="h3">Add New Wallet</Text>
      </Animated.View>
    )
  }

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
      <HapticTouchable>
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

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent

    // Divide the horizontal offset by the width of the view to see which page is visible
    const newWalletIndex = Math.floor(contentOffset.y / layoutMeasurement.height)
    onSelectWalletIndex(newWalletIndex)
  }
  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent
    if (y < -50) {
      // Show add wallet screen
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent
    if (y < -50 && y > -55) {
      // Show add wallet screen
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  // Render wallets
  return (
    <View style={styles.card}>
      {renderAddWalletView()}
      <Animated.FlatList
        pagingEnabled
        ref={flatList}
        data={wallets}
        renderItem={renderItem}
        keyExtractor={(item: Wallet, index: number) => `${item.publicKey}-${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          // Use native driver improves transform/translate/opacity animations
          { useNativeDriver: true, listener: onScroll },
        )}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
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
