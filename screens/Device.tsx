import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { useApp } from '../contexts/appContext'

export const Device: React.FC = () => {
  const [name, setName] = useState('')
  const { addNewDevice } = useApp()

  return (
    <View style={styles.device}>
      <TextFieldWithLabel label="Name" onChangeText={setName} />
      <TextFieldWithLabel
        containerStyle={styles.portContainer}
        label="Port"
        onChangeText={setName}
      />

      <View style={styles.buttonContainer}>
        <Button
          color="#B88B4A"
          title="Add"
          onPress={() => addNewDevice(name)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  device: {
    padding: 8,
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  portContainer: {
    marginTop: 16,
  },
  listLabelContainer: {
    flexDirection: 'row',
    // paddingLeft: 8,
    paddingRight: 24,
  },
  listLabel: {
    color: 'white',
    flexBasis: 0,
    flexGrow: 1,
    fontSize: 24,
    lineHeight: 32,
  },
  listAction: {
    color: 'white',
    fontSize: 32,
    lineHeight: 32,
  },
  list: {
    paddingTop: 8,
  },
  middleLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    zIndex: -1,
  },
})
