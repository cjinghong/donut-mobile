import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, View } from "react-native"
import { Input, StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { Screen } from "../../components"
import { HapticButton } from "../../components/haptic-button/haptic-button"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"

export const AddWalletScreen: React.FC = observer(() => {
  const navigation = useNavigation()
  const styles = useStyleSheet(styleService)
  const { addWallet, wallets } = useStores()

  const defaultName = `My wallet ${wallets.length + 1}`
  const [name, setName] = useState(defaultName)
  const [publicKey, setPublicKey] = useState('')

  const onAddWallet = () => {
    try {
      if (!name) {
        setName(defaultName)
      }
      addWallet({
        name: name || defaultName,
        publicKey,
        privateKey: undefined
      })
      navigation.navigate('home')
    } catch (error) {
      // TODO: - Create custom alert modal
      Alert.alert("Error", error.message)
    }
  }

  // Render wallets
  return (
    <Screen style={styles.container} preset="fixed">
      <View>
        <Text category="h4">
          Add YO Wallet!
        </Text>
        <Input
          label="Wallet Name"
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => {
            setName(text)
          }}
        />
        <Input
          label="Public Key"
          placeholder="Enter public Key"
          value={publicKey}
          onChangeText={(text) => {
            setPublicKey(text)
          }}
        />
        <HapticButton onPress={onAddWallet} size="large">Done</HapticButton>
      </View>
    </Screen>
  )
})

const styleService = StyleService.create({
  container: {
    flex: 1,
    padding: 16
  }
})
