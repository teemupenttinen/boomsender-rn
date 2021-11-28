import React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native'

interface TextFieldProps {
  value: string
  onChangeText: (text: string) => void
  keyboardType?: KeyboardTypeOptions
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.field}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  field: {
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    padding: 5,
    height: 50,
  },
})
