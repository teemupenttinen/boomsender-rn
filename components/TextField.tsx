import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface TextFieldProps {
  onChangeText: (text: string) => void
}

export const TextField: React.FC<TextFieldProps> = ({ onChangeText }) => {
  return <TextInput onChangeText={onChangeText} style={styles.field} />
}

const styles = StyleSheet.create({
  field: {
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    padding: 5,
    height: 50,
  },
})
