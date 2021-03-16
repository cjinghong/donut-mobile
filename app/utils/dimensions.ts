import { Dimensions } from "react-native"

const { width, height } = Dimensions.get('screen')
const min = width > height ? height : width
const max = width < height ? height : width

/// Width of screen
export const screenWidth = width

/// Height of screen
export const screenHeight = height

/// Returns width or height, whichever is smaller
export const vmin = min

/// Returns width or height, whichever is larger
export const vmax = max
