import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

interface ButtonProps {
  title: string
  color: string
  onPress: () => void
}

export const Button: React.FC<ButtonProps> = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity style={buttonStyle(color).style} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const buttonStyle = (color: string) => {
  return StyleSheet.create({
    style: {
      width: 300,
      height: 60,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
  })
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
  },
})
