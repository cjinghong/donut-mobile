import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen } from "../../components"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

export const WalletScreen = observer(function WalletScreen() {
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  useEffect(() => {
    // Init openseaport
    seaport.api.getAssets({
      owner: '0x15f7320adb990020956d29edb6ba17f3d468001e',
      limit: 10,
      offset: 0
    })
      .then((res) => {
        // console.log('assets', res.assets.map((asset) => asset.name))
        // console.log('assets count', res.estimatedCount)
      }).catch((error) => {
        console.log('error', error)
      })
  }, [])

  const styles = useStyleSheet(styleService)

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
