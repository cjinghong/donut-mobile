import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActionSheetIOS, View } from "react-native"
import { Screen } from "../../components"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { WalletsContainer } from "../../components/wallet/wallets-container"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"
import { truncateStringMiddle } from "../../utils/strings"

export const WalletScreen = observer(() => {
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  const navigation = useNavigation()
  const { wallets, currentWalletIndex, setCurrentWalletIndex } = useStores()

  useEffect(() => {
    // Init openseaport
    // seaport.api.getAssets({
    //   owner: '0x15f7320adb990020956d29edb6ba17f3d468001e',
    //   limit: 10,
    //   offset: 0
    // })
    //   .then((res) => {
    //     console.log('assets', res.assets)
    //   }).catch((error) => {
    //     console.log('error', error)
    //   })
  }, [])

  useEffect(() => {
    !wallets.length && onAddWallet()
  }, [wallets])

  const styles = useStyleSheet(styleService)

  const onAddWallet = () => {
    navigation.navigate("addWallet")
  }

  const onEditWalletPress = (index: number) => {
    const options = [
      ...wallets.map(w => `${w.name}: ${truncateStringMiddle(w.publicKey, 4, 4)}`),
      'Add New Wallet',
      'Cancel'
    ]
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select Wallet',
      options,
      cancelButtonIndex: options.length - 1
    }, (selectedOptionIndex) => {
      const cancelIndex = options.length - 1
      const addWalletIndex = options.length - 2
      if (selectedOptionIndex === cancelIndex) {
        // Do nothing
      } else if (selectedOptionIndex === addWalletIndex) {
        onAddWallet()
      } else {
        setCurrentWalletIndex(selectedOptionIndex)
      }
    })
  }

  if (!wallets.length) {
    return null
  }

  return (
    <Screen style={styles.container} preset="fixed">
      <WalletsContainer
        wallets={wallets}
        currentWalletIndex={currentWalletIndex}
        onSelectWalletIndex={setCurrentWalletIndex}
        onWalletIndexPress={onEditWalletPress}
      />
      <View>
        <Text>{(wallets[currentWalletIndex] || {}).publicKey}</Text>
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
