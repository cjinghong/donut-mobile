import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"

import { HapticTouchable } from "../haptic-touchable/haptic-touchable"
import { Wallet } from "../../models/entities/wallet"

interface WalletsContainerProps {
  style?: ViewStyle,
  wallet: Wallet,
  onWalletPress: () => void;
}

const CONTENT_HEIGHT = 100

const WalletView: React.FC<WalletsContainerProps> = observer(({
  style,
  wallet,
  onWalletPress
}) => {
  const styles = useStyleSheet(styleService)

  const { name, publicKey } = wallet

  return (
    <HapticTouchable onPress={() => onWalletPress()}>
      <View style={[
        styles.card,
        ...(style ? [style] : [])
      ]}>
        <View
          style={styles.walletContainer}
        >
          <Text category="h4">
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.publicKey}>
            {publicKey}
          </Text>
        </View>
      </View>
    </HapticTouchable>
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

export default WalletView
