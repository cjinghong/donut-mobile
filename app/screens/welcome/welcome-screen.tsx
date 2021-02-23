import React from "react"
import { View, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components'
import * as Animatable from 'react-native-animatable'

import { Screen } from "../../components"
import { color, spacing } from "../../theme"
import { HapticButton } from "../../components/haptic-button/haptic-button"

const donutImage = require("./donut.jpg")

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const styles = useStyleSheet(styleService)

  const goHome = () => navigation.navigate("home")

  return (
    <View testID="WelcomeScreen" style={styles.container}>
      <Screen style={styles.innerContainer} preset="fixed" backgroundColor={color.transparent}>
        <Text category='h2' style={styles.title}>
          Welcome to Donut.
        </Text>
        <Text category='s1' style={styles.subtitle}>
          The world's tastiest Ethereum wallet
        </Text>
        <Animatable.Image
          animation={{
            from: {
              translateY: 0
            },
            to: {
              translateY: -20
            },
          }}
          direction="alternate"
          easing="ease-in"
          iterationCount="infinite"
          source={donutImage}
          style={styles.image}
        />
      </Screen>
      <SafeAreaView>
        <HapticButton onPress={goHome} size="large">Continue</HapticButton>
      </SafeAreaView>
    </View>
  )
})

const styleService = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-background-primary-500',
    paddingHorizontal: spacing[4],
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    zIndex: -1,
    alignSelf: "center",
    marginVertical: spacing[5],
    maxWidth: "100%",
  },
  text: {
    color: 'color-text'
  },
  title: {
    paddingBottom: 8,
    color: 'color-text'
  },
  subtitle: {

    color: 'color-text'
  },
})
