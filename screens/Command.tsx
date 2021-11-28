import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from '../components/Button'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { CommandProps } from './Home'

export const Command: React.FC<CommandProps> = ({ navigation }) => {
  const [name, setName] = useState('')
  const [command, setCommand] = useState('')

  const addNewCommandHandler = () => {
    navigation.navigate('Device', { newCommand: { name, command } })
  }

  return (
    <View>
      <TextFieldWithLabel value={name} label="Name" onChangeText={setName} />
      <TextFieldWithLabel
        value={command}
        label="Command"
        onChangeText={setCommand}
      />
      <View>
        <Button color="#B88B4A" title="Add" onPress={addNewCommandHandler} />
      </View>
    </View>
  )
}
