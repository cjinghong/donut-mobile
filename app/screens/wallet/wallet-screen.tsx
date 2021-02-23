import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import Web3 from 'web3'
import { getAddressBalances } from 'eth-balance-checker/lib/web3'

import { Screen, Wallpaper } from "../../components"
import { Api } from "../../services/api"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const WalletScreen = observer(function WalletScreen() {
  const styles = useStyleSheet(styleService)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  //   const api = new Api()
  //   api.setup()

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/26afd41534b749d7bce517cb73fe0d9a")
  )
  const address = '0xCCc985a0EFC439D74af214EA26762c441A86d5A8'
  const tokens = ['0x3845badAde8e6dFF049820680d1F14bD3903a5d0']

  useEffect(() => {
    getAddressBalances(web3, address, tokens).then(balances => {
      console.log(balances)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <Screen style={styles.container} preset="scroll">
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
