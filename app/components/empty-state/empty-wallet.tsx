import { StyleService, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { vmin } from '../../utils/dimensions'

import { HapticButton } from '../haptic-button/haptic-button'
import { HapticTouchable } from '../haptic-touchable/haptic-touchable'
export const image = require("./empty-wallet.gif")

interface EmptyWalletProps {
  onAddWallet: () => void
  onAddSampleWallet: () => void
}

const EmptyWallet: React.FC<EmptyWalletProps> = ({
  onAddWallet,
  onAddSampleWallet
}) => {
  const styles = useStyleSheet(styleService)

  const imageStyles = {
    width: vmin * 0.4,
    height: vmin * 0.4,
  }

  return (
    <View style={styles.emptyContainer}>
      <Image style={[styles.image, imageStyles]} source={image} />
      <Text style={styles.emptyTitle}>
        No wallets available. Let's add one right now?
      </Text>
      <HapticButton onPress={onAddWallet}>
        Add New Wallet
      </HapticButton>
      <HapticTouchable onPress={onAddSampleWallet}>
        <Text style={styles.sampleWalletText}>...or check out sample wallet</Text>
      </HapticTouchable>
    </View>
  )
}

const styleService = StyleService.create({
  emptyContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
    marginBottom: 24
  },
  emptyTitle: {
    color: 'color-gray-800',
    fontSize: 24,
    padding: 16,
    textAlign: 'center'
  },
  sampleWalletText: {
    color: 'color-primary-500',
    padding: 16
  }
})

export default EmptyWallet
