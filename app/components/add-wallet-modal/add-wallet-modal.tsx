import React, { useEffect, useState } from "react"
import { View, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { StyleService, useStyleSheet } from "@ui-kitten/components"
import Clipboard from '@react-native-clipboard/clipboard'

import { typography } from "../../theme"
import BottomModal, { BottomModalProps } from "../bottom-modal/bottom-modal"
import { HapticButton } from "../haptic-button/haptic-button"
import { HapticTouchable } from "../haptic-touchable/haptic-touchable"
import { Text } from "../text/text"
import { useStores } from "../../models"

export interface AddWalletModalProps {
  showSampleWallet: boolean
}

/**
 * Describe your component here
 */
export const AddWalletModal: React.FC<AddWalletModalProps & BottomModalProps> = observer(({
  showSampleWallet,
  visible,
  onDismiss,
  ...modalProps
}) => {
  const styles = useStyleSheet(styleService)
  const [walletAddress, setWalletAddress] = useState('')
  const { addWallet, wallets } = useStores()

  // Reset text field
  const dismissAddWallet = () => {
    setWalletAddress('')
    onDismiss()
  }

  const onPasteFromClipboard = async () => {
    const text = await Clipboard.getString()
    setWalletAddress(text)
  }

  const onAddSampleWallet = () => {
    dismissAddWallet()
  }

  const onAddWallet = () => {
    Alert.prompt(
      "Wallet Name",
      "Enter a name for your wallet",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: (name) => {
            addWallet({
              name,
              privateKey: undefined,
              publicKey: walletAddress
            })
            dismissAddWallet()
          }
        }
      ],
      'plain-text',
      `My Wallet ${wallets.length + 1}`
    )
    // try {
    //   if (!name) {
    //     setName(defaultName)
    //   }
    //   addWallet({
    //     name: name || defaultName,
    //     publicKey,
    //     privateKey: undefined
    //   })
    //   navigation.navigate('home')
    // } catch (error) {
    //   // TODO: - Create custom alert modal
    //   Alert.alert("Error", error.message)
    // }
  }

  return (
    <BottomModal visible={visible} onDismiss={dismissAddWallet} {...modalProps}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View />
          <TextInput
            style={[styles.text, styles.input]}
            onChangeText={setWalletAddress}
            value={walletAddress}
            placeholder="Enter a wallet's public key to discover its NFTs..."
            placeholderTextColor='#8F9BB3'
            numberOfLines={10}
            multiline
            blurOnSubmit={true}
          />
          <View>
            <HapticTouchable style={styles.pasteButton} onPress={onPasteFromClipboard}>
              <View style={styles.pasteContainer}>
                <Text style={[styles.text, styles.pasteText]}>Paste</Text>
              </View>
            </HapticTouchable>
            <HapticButton size="large" onPress={onAddWallet}>Add Wallet</HapticButton>
            {
              showSampleWallet && (
                <HapticTouchable onPress={onAddSampleWallet}>
                  <Text style={[styles.text, styles.sampleWalletText]}>...or check out a sample wallet</Text>
                </HapticTouchable>
              )
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BottomModal>
  )
})

const styleService = StyleService.create({
  text: {
    fontFamily: typography.primary,
    fontSize: 16,
    color: 'color-gray-800'
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    fontFamily: typography.primary,
    textAlign: 'center',
    fontSize: 21,
  },
  pasteButton: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: 16
  },
  pasteContainer: {
    borderColor: 'color-primary-500',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100
  },
  pasteText: {
    color: 'color-primary-500',
    fontWeight: '800'
  },
  sampleWalletText: {
    textAlign: 'center',
    paddingTop: 16,
    color: 'color-primary-500'
  },
})
