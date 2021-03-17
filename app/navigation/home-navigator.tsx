import React, { useEffect } from "react"
import { Easing } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/core"
import { observer } from "mobx-react-lite"
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

import { WalletScreen } from "../screens/wallet/wallet-screen"
import { useStores } from "../models"
import NftDetailsScreen from "../screens/nft-details/nft-details-screen"

export type HomeParamList = {
  wallet: undefined
  nftDetails: { nftId: string }
}
export type HomeNavigatorType = StackNavigationProp<HomeParamList>;

const Stack = createSharedElementStackNavigator<HomeParamList>()

export const HomeNavigator = observer(() => {
  const navigation = useNavigation()
  const { onboarded } = useStores()

  // Show onboarding if not onboarded
  useEffect(() => {
    if (!onboarded) {
      navigation.navigate('welcome')
    }
  }, [])

  const nftDetailsScreenOptions: any = () => {
    const animConfig = {
      animation: 'timing',
      config: {
        duration: 200, easing: Easing.inOut(Easing.linear)
      }
    }
    return {
      gestureEnabled: false,
      transitionSpec: {
        open: animConfig,
        close: animConfig
      },
      cardStyleInterpolator: ({ current }) => {
        const { progress } = current
        return {
          cardStyle: {
            opacity: progress,
          }
        }
      }
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="wallet" component={WalletScreen} />
      <Stack.Screen
        name="nftDetails"
        component={NftDetailsScreen}
        options={nftDetailsScreenOptions}
        sharedElementsConfig={(route) => {
          const { nftId } = route.params
          return [nftId]
        }}
      />
    </Stack.Navigator>
  )
})
