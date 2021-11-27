import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { ListWithLabel } from '../components/ListWithLabel'
import { SegmentedControl } from '../components/SegmentedControl'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { useApp } from '../contexts/appContext'
import {
  Command,
  ControlMethod,
  Device as DeviceInterface,
} from '../types/device'
import { DeviceProps } from './Home'

const CONTROL_METHODS: ControlMethod[] = ['TCP', 'UDP']

export const Device: React.FC<DeviceProps> = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [controlMethod, setControlMethod] = useState<ControlMethod>('TCP')
  const [commands, setCommands] = useState<Command[]>([])

  useEffect(() => {
    if (route.params?.newCommand) {
      console.log('Add command')
      setCommands([...commands, route.params.newCommand])
    }
  }, [route])

  const { addNewDevice } = useApp()

  const addNewDeviceHandler = () => {
    const newDevice: DeviceInterface = {
      id: 0,
      name,
      controlMethod,
      commands,
    }
    addNewDevice(newDevice)
    navigation.navigate('Main')
  }

  return (
    <View style={styles.device}>
      <TextFieldWithLabel label="Name" onChangeText={setName} />
      <Text style={styles.controlMethodText}>Control method</Text>
      <SegmentedControl
        options={CONTROL_METHODS.map((c) => ({ value: c, name: c }))}
        active={controlMethod}
        onChange={(newValue) => setControlMethod(newValue as ControlMethod)}
      />
      <TextFieldWithLabel
        containerStyle={styles.portContainer}
        label="Port"
        onChangeText={setName}
      />
      <ListWithLabel
        data={commands.map((c) => ({ value: c.name, text: c.name }))}
        onAdd={() => navigation.navigate('Command')}
      />

      <View style={styles.buttonContainer}>
        <Button color="#B88B4A" title="Add" onPress={addNewDeviceHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  device: {
    padding: 16,
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  controlMethodText: {
    color: 'white',
    fontSize: 24,
    marginTop: 14,
    marginBottom: 14,
  },
  portContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
})
