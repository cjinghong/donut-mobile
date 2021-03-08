import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen } from "../../components"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { Web3 } from "web3-react-native"
import { OpenSeaPort, Network } from 'opensea-js'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const WalletScreen = observer(function WalletScreen() {
  const styles = useStyleSheet(styleService)
  const [web3, setWeb3] = useState(null)
  const [seaport, setSeaport] = useState(null)
  console.log(Web3)
  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider('https://mainnet.infura.io/')
  // )
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    const initWeb3 = async () => {
      const provider = await Web3('https://mainnet.infura.io/')
      setWeb3(provider)

      // const seaport = new OpenSeaPort(provider, {
      //   networkName: Network.Main
      // })
      // console.log(seaport)
    }
    initWeb3()
  }, [])

  return (
    <Screen style={styles.container} preset="fixed">
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
