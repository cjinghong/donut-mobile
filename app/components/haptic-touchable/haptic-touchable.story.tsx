import * as React from "react"
import { Text } from 'react-native'
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { HapticTouchable } from "./haptic-touchable"

storiesOf("HapticTouchable", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <HapticTouchable style={{ backgroundColor: color.error }}><Text>Press</Text></HapticTouchable>
      </UseCase>
    </Story>
  ))
