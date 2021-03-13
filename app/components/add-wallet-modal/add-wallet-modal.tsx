import React, { useEffect, useRef, useState } from "react"
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  KeyboardEvent,
  Easing,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StyleService, useStyleSheet } from "@ui-kitten/components"
import Clipboard from '@react-native-clipboard/clipboard'
import { heightPercentageToDP } from "react-native-responsive-screen"
import { useSafeAreaInsets } from "react-native-safe-area-context"

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
  const { bottom } = useSafeAreaInsets()

  const inputRef = useRef<any>()
  const translateY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const keyboardWillShow = (event: KeyboardEvent) => {
      const { duration, endCoordinates } = event
      const { height } = endCoordinates
      Animated.timing(
        translateY, {
          duration,
          toValue: -height + bottom,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }
      ).start()
    }
    const keyboardWillHide = (event: KeyboardEvent) => {
      const { duration } = event
      Animated.timing(
        translateY, {
          duration,
          toValue: 0,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease)
        }
      ).start()
    }
    Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', keyboardWillHide)
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow)
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide)
    }
  }, [])

  // Auto show keyboard
  useEffect(() => {
    inputRef.current?.focus()
  }, [visible])

  // Reset text field
  const dismissAddWallet = () => {
    setWalletAddress('')
    onDismiss()
  }

  const onPasteFromClipboard = async () => {
    const text = await Clipboard.getString()
    setWalletAddress(text)
  }

  const blurInput = () => {
    inputRef.current?.blur()
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

  const bottomContainerStyle: any = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    transform: [{ translateY }]
  }

  return (
    <BottomModal
      avoidKeyboard={false}
      visible={visible}
      onDismiss={dismissAddWallet}
      {...modalProps}
    >
      <TouchableWithoutFeedback onPress={blurInput}>
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            style={[styles.text, styles.input]}
            onChangeText={setWalletAddress}
            value={walletAddress}
            placeholder="Enter a wallet's public key to discover its NFTs..."
            placeholderTextColor='#8F9BB3'
            numberOfLines={10}
            multiline
            blurOnSubmit={true}
          />
          <Animated.View style={bottomContainerStyle}>
            <HapticTouchable style={styles.pasteButton} onPress={onPasteFromClipboard}>
              <View style={styles.pasteContainer}>
                <Text style={[styles.text, styles.pasteText]}>Paste</Text>
              </View>
            </HapticTouchable>
            <HapticButton size="large" onPress={onAddWallet}>Add Wallet</HapticButton>
            {
              showSampleWallet && (
                <HapticTouchable onPress={onAddSampleWallet}>
                  <Text style={[styles.text, styles.sampleWalletText]}>
                    ...or check out a sample wallet
                  </Text>
                </HapticTouchable>
              )
            }
          </Animated.View>
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
    marginTop: heightPercentageToDP('25%'),
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
