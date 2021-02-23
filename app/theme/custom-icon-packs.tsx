/* eslint-disable react/display-name */
import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'

const IconProvider = (source: ImageSourcePropType) => ({
  toReactElement: ({ animation: _, ...props }: any) => (
    <Image {...props} source={source} />
  ),
})

export const CustomIconsPack = {
  name: 'custom',
  icons: {
    donutWallet: IconProvider(require('./icons/donutWallet.png')),
  },
}
