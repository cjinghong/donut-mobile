import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { Wallet } from "../../models/entities/wallet"
import { HapticTouchable } from "../haptic-touchable/haptic-touchable"

interface WalletsContainerProps {
  currentWallet: Wallet;
}

export const WalletsContainer: React.FC<WalletsContainerProps> = observer(({ currentWallet }) => {
  const styles = useStyleSheet(styleService)

  // Render wallets
  return (
    <HapticTouchable>
      <View style={styles.card}>
        <Text category="h4">
          {currentWallet.name}
        </Text>
        <Text numberOfLines={1} style={styles.publicKey}>
          {currentWallet.publicKey}
        </Text>
      </View>
    </HapticTouchable>
  )
})

const styleService = StyleService.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    padding: 24,
    shadowColor: "color-gray",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15
  },
  publicKey: {
    paddingHorizontal: 24
  },
  container: {
    flex: 1,
    padding: 16
  }
})
