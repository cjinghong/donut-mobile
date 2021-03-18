/* eslint-disable camelcase */
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NFTTrait } from '../../models/entities/nft'

interface TraitTagProps {
  trait: NFTTrait
}

const TraitTag: React.FC<TraitTagProps> = ({ trait }) => {
  const { trait_type, value } = trait
  const styles = useStyleSheet(styleService)

  return (
    <View style={styles.container}>
      <Text category="s1">
        {trait_type}
      </Text>
      <Text category="c1">
        {value}
      </Text>
    </View>
  )
}

const styleService = StyleService.create({
  container: {
    backgroundColor: 'color-gray-500',
    borderRadius: 9999,
    marginLeft: 8,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }
})

export default TraitTag
