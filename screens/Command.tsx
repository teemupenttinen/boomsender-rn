import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { colors } from '../styles/colors'
import { CommandProps } from './Home'
import { BaseScreen } from '../components/BaseScreen'
import { layout } from '../styles/layout'

export const Command: React.FC<CommandProps> = ({ navigation }) => {
  const [name, setName] = useState('')
  const [command, setCommand] = useState('')

  const addNewCommandHandler = () => {
    navigation.navigate('Device', { newCommand: { name, command } })
  }

  return (
    <BaseScreen>
      <TextFieldWithLabel value={name} label="Name" onChangeText={setName} />
      <TextFieldWithLabel
        containerStyle={layout.gap}
        value={command}
        label="Command"
        onChangeText={setCommand}
      />
      <View style={[layout.gap, styles.addButtonContainer]}>
        <Button
          color={colors.button}
          title="Add"
          onPress={addNewCommandHandler}
        />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  addButtonContainer: {
   alignItems: 'center',
   justifyContent: 'center'
  }
})
