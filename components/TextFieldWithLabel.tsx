import React from 'react'
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { TextField } from './TextField'

interface TextFieldWithLabelProps {
  label: string
  onChangeText: (text: string) => void
  containerStyle?: StyleProp<ViewStyle>
}

export const TextFieldWithLabel: React.FC<TextFieldWithLabelProps> = ({
  label,
  onChangeText,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextField onChangeText={onChangeText} />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 24,
    marginBottom: 14,
  },
})
