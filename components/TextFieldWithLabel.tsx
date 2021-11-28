import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native'
import { TextField } from './TextField'

interface TextFieldWithLabelProps {
  value: string
  label: string
  onChangeText: (text: string) => void
  containerStyle?: StyleProp<ViewStyle>
  keyboardType?: KeyboardTypeOptions
}

export const TextFieldWithLabel: React.FC<TextFieldWithLabelProps> = ({
  value,
  label,
  onChangeText,
  containerStyle,
  keyboardType,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextField
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
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
