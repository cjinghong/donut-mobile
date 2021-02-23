import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const WalletScreen = observer(function WalletScreen() {
  const styles = useStyleSheet(styleService)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={styles.container} preset="fixed">
      <Wallpaper />
      <View style={styles.card}>
        <Text category="h4">
          My Wallet 1
        </Text>
        <View style={styles.copyReceiveContainer}>
          <Text>Copy Address</Text>
          <Text>Receive</Text>
        </View>
      </View>
      <View>
        <Text>My Crypto</Text>
      </View>
    </Screen>
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
