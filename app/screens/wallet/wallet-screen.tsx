import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActionSheetIOS, Image, View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

import { Screen } from "../../components"
import { WalletsContainer } from "../../components/wallet/wallets-container"
import { useStores } from "../../models"
import { truncateStringMiddle } from "../../utils/strings"
import { NFT } from "../../models/entities/nft"
import { AddWalletModal } from "../../components/add-wallet-modal/add-wallet-modal"
import EmptyWallet from "../../components/empty-state/empty-wallet"

export const WalletScreen = observer(() => {
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  const {
    wallets,
    currentWalletIndex,
    nfts,
    setCurrentWalletIndex,
    setNfts
  } = useStores()

  useEffect(() => {
    // Init openseaport
    seaport.api.getAssets({
      // owner: '0x15f7320adb990020956d29edb6ba17f3d468001e',
      limit: 10,
      offset: 0,
      asset_contract_address: '0x61097cc82c503ff2d95ce11edd93e0f0cab30c59',
      token_ids: [2]
    })
      .then(({ assets }) => {
        console.log(assets)
        setNfts(assets as NFT[])
      }).catch((error) => {
        console.log('error', error)
      })
  }, [])

  useEffect(() => {
    !wallets.length && onAddWallet()
  }, [wallets])

  const styles = useStyleSheet(styleService)
  const [showAddWalletModal, setShowAddWalletModal] = useState(false)

  const onAddWallet = () => {
    setShowAddWalletModal(true)
  }

  const onAddSampleWallet = () => {
    // TODO: - Add sample wallet
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

  return (
    <Screen style={styles.container} preset="fixed">
      <AddWalletModal
        showSampleWallet={!wallets.length}
        visible={showAddWalletModal}
        onDismiss={() => setShowAddWalletModal(false)}
      />
      {
        wallets.length ? (
          <>
            <WalletsContainer
              style={styles.walletContainer}
              wallets={wallets}
              currentWalletIndex={currentWalletIndex}
              onSelectWalletIndex={setCurrentWalletIndex}
              onWalletIndexPress={onEditWalletPress}
            />
            <View>
              <Text>{(wallets[currentWalletIndex] || {}).publicKey}</Text>
            </View>
            {
              nfts[0] && (
                <Image
                  style={{
                    width: 300,
                    height: 300,
                    resizeMode: 'contain',
                    backgroundColor: nfts[0].backgroundColor
                  }}
                  source={{ uri: nfts[0].imageUrlOriginal }}
                />
              )
            }
          </>
        ) : (
          <EmptyWallet onAddWallet={onAddWallet} onAddSampleWallet={onAddSampleWallet}/>
        )
      }
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
    padding: 16,
  },
  walletContainer: {
    marginTop: 16
  },
  emptyContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: 'color-gray-800',
    fontSize: 21
  }
})
