import React from 'react'
import { Text, View } from "react-native"
import { TextField } from "../components/TextField"

export const Settings: React.FC = () => {
  return (
    <View>
      <Text>Settings</Text>
      <TextField onChangeText={(text) => console.log(text)}/>
    </View>
  )
}