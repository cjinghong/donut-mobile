import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/core"

export const NftDetailsScreen = observer(function NftDetailsScreen() {
  const styles = useStyleSheet(styleService)
  const navigation = useNavigation()
  const { nfts, currentSelectedNftId } = useStores()

  useEffect(() => {
    if (!currentSelectedNftId) {
      navigation.goBack()
    }
  }, [currentSelectedNftId])

  if (!currentSelectedNftId) {
    return null
  }

  return (
    <Screen style={styles.container} preset="scroll">
      <Text>{currentSelectedNftId}</Text>
    </Screen>
  )
})

const styleService = StyleService.create({
  container: {
    flex: 1,
  }
})
