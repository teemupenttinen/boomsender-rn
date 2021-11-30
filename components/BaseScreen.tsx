import React from 'react'
import { View, StyleSheet } from 'react-native'
import { layout } from '../styles/layout'

export const BaseScreen: React.FC = ({ children }) => {
  return <View style={styles.baseScreen}>{children}</View>
}

const styles = StyleSheet.create({
  baseScreen: {
    padding: layout.viewPadding.padding,
    height: '100%',
  },
})
