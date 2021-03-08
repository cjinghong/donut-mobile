import React, { useEffect } from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { WalletScreen } from "../screens/wallet/wallet-screen"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/core"
import { observer } from "mobx-react-lite"

export type HomeParamList = {
  wallet: undefined
}
export type HomeNavigatorType = StackNavigationProp<HomeParamList>;

const Stack = createStackNavigator<HomeParamList>()

export const HomeNavigator = observer(() => {
  const navigation = useNavigation()
  const { onboarded } = useStores()

  // Show onboarding if not onboarded
  useEffect(() => {
    if (!onboarded) {
      navigation.navigate('welcome')
    }
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="wallet" component={WalletScreen} />
    </Stack.Navigator>
  )
})
