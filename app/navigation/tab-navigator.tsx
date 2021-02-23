import React from 'react'
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CompositeNavigationProp } from '@react-navigation/native'

import { MainNavigatorType } from './main-navigator'
import { WalletScreen } from '../screens/wallet/wallet-screen'

export type TabNavigatorParamList = {
  Wallet: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<TabNavigatorParamList>()

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets()

  const WalletIcon = (props: any) => <Icon {...props} name="donutWallet" pack="custom" />

  return (
    <BottomNavigation
      style={{ paddingBottom: bottom }}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator">
      <BottomNavigationTab icon={WalletIcon} title="Wallet" />
    </BottomNavigation>
  )
}

const TabNavigator = () => {
  return (
    <Navigator
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      backBehavior="initialRoute">
      <Screen name="Wallet" component={WalletScreen} />
    </Navigator>
  )
}

export type TabNavigatorType = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList>,
  MainNavigatorType
>;

export default TabNavigator
