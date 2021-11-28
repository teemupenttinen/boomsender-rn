import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/colors'

interface ButtonProps {
  title: string
  color: string
  onPress: () => void
}

export const Button: React.FC<ButtonProps> = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.white,
  },
  button: {
    width: 300,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})
