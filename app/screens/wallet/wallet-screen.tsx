import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActionSheetIOS, View } from "react-native"
import { Spinner, StyleService, useStyleSheet } from "@ui-kitten/components"
import Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

import { Screen } from "../../components"
import { useStores } from "../../models"
import { truncateStringMiddle } from "../../utils/strings"
import { NFT } from "../../models/entities/nft"
import { AddWalletModal } from "../../components/add-wallet-modal/add-wallet-modal"
import EmptyWallet from "../../components/empty-state/empty-wallet"
import sampleWallets from "../../utils/sample-wallets"
import { NftCollection } from "../../components/nft-collection/nft-collection"
import WalletView from "../../components/wallet-view/wallet-view"
import { NftGallery } from "../../components/nft-gallery/nft-gallery"

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})

export const WalletScreen = observer(() => {
  const {
    wallets,
    currentWalletIndex,
    nfts,
    setCurrentWalletIndex,
    setNfts,
    addWallet
  } = useStores()
  const [loadingNfts, setLoadingNfts] = useState(false)

  // Retrieve assets if wallet exist
  useEffect(() => {
    if (!wallets.length) return

    const loadNfts = async () => {
      setLoadingNfts(true)
      try {
        const { assets } = await seaport.api.getAssets({
          owner: wallets[currentWalletIndex].publicKey,
          limit: 30,
          offset: 0,
        })
        // console.log(assets)
        setNfts(assets as any)
      } catch (error) {
        console.log('error', error)
      }
      setLoadingNfts(false)
    }

    loadNfts()
  }, [wallets, currentWalletIndex])

  const styles = useStyleSheet(styleService)
  const [showAddWalletModal, setShowAddWalletModal] = useState(false)

  const onAddWallet = () => {
    setShowAddWalletModal(true)
  }

  const onAddSampleWallet = () => {
    const randomWallet = sampleWallets[Math.floor(Math.random() * sampleWallets.length)]
    addWallet(randomWallet)
  }

  const onEditWalletPress = () => {
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

  const renderWalletView = () => {
    if (!wallets.length) {
      return <EmptyWallet onAddWallet={onAddWallet} onAddSampleWallet={onAddSampleWallet} />
    }
    return (
      <>
        <WalletView
          style={styles.walletContainer}
          wallet={wallets[currentWalletIndex]}
          onWalletPress={onEditWalletPress}
        />
        <View style={styles.contentContainer}>
          {/* <NftCollection nfts={nfts} loading={loadingNfts}/> */}
          <NftGallery nfts={nfts} loading={loadingNfts}/>
        </View>
      </>
    )
  }

  return (
    <Screen style={styles.container} preset="fixed">
      <AddWalletModal
        showSampleWallet={!wallets.length}
        visible={showAddWalletModal}
        onDismiss={() => setShowAddWalletModal(false)}
      />
      {renderWalletView()}
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
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // zIndex: -10
  },
  walletContainer: {
    margin: 16,
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
