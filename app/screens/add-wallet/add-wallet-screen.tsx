import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { Screen } from "../../components"

export const AddWalletScreen: React.FC = observer(() => {
  const styles = useStyleSheet(styleService)

  // Render wallets
  return (
    <Screen style={styles.container} preset="fixed">
      <View>
        <Text category="h4">
          Add YO Wallet!
        </Text>
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
