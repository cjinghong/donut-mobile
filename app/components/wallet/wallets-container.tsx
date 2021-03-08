import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { Wallet } from "../../models/entities/wallet"

interface WalletsContainerProps {
  wallets: Wallet[];
  currentWallet: Wallet;
}

export const WalletsContainer: React.FC<WalletsContainerProps> = observer(function WalletScreen({
  wallets,
  currentWallet
}) {
  const styles = useStyleSheet(styleService)

  // Render wallets
  return (
    <View style={styles.card}>
      <Text category="h4">
        My Wallet 1
        </Text>
      <View style={styles.copyReceiveContainer}>
        <Text>0x15f7320adb9900209...</Text>
      </View>
    </View>
  )
})

const styleService = StyleService.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    padding: 16,
    shadowColor: "color-gray",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15
  },
  copyReceiveContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    padding: 16
  }
})
