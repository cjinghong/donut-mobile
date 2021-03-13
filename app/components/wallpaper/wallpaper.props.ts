import { ImageStyle } from "react-native"
import { WallpaperPresets } from "./wallpaper.presets"

export interface WallpaperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ImageStyle

  backgroundImage: string

  /**
   * One of the different types of wallpaper presets.
   */
  preset?: WallpaperPresets
}
