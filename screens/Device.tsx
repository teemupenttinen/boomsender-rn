import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { ListWithLabel } from '../components/ListWithLabel'
import { SegmentedControl } from '../components/SegmentedControl'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { useApp } from '../contexts/appContext'
import { colors } from '../styles/colors'
import {
  Command,
  ControlMethod,
  Device as DeviceInterface,
} from '../types/device'
import { DeviceProps } from './Home'

const CONTROL_METHODS: ControlMethod[] = ['TCP', 'UDP']

export const Device: React.FC<DeviceProps> = ({ navigation, route }) => {
  const [id, setId] = useState<number | undefined>()
  const [name, setName] = useState('')
  const [controlMethod, setControlMethod] = useState<ControlMethod>('TCP')
  const [commands, setCommands] = useState<Command[]>([])
  const [port, setPort] = useState(10000)

  useEffect(() => {
    if (route.params?.newCommand) {
      setCommands([...commands, route.params.newCommand])
    }

    if (route.params?.device) {
      const device = route.params.device
      setId(device.id)
      setName(device.name)
      setControlMethod(device.controlMethod)
      setCommands(device.commands)
    }
  }, [route])

  const { addNewDevice, editDevice } = useApp()

  const addNewDeviceHandler = () => {
    const newDevice: DeviceInterface = {
      id: id ?? 0,
      name,
      controlMethod,
      commands,
      port,
    }

    if (id) {
      editDevice(newDevice)
    } else {
      addNewDevice(newDevice)
    }
    setId(undefined)
    setName('')
    setControlMethod('TCP')
    setCommands([])
    setPort(10000)
    navigation.navigate('Main')
  }

  return (
    <View style={styles.device}>
      <TextFieldWithLabel value={name} label="Name" onChangeText={setName} />
      <Text style={styles.controlMethodText}>Control method</Text>
      <SegmentedControl
        options={CONTROL_METHODS.map((c) => ({ value: c, name: c }))}
        active={controlMethod}
        onChange={(newValue) => setControlMethod(newValue as ControlMethod)}
      />
      <TextFieldWithLabel
        value={port.toString()}
        containerStyle={styles.portContainer}
        label="Port"
        onChangeText={(text) => setPort(parseInt(text))}
        keyboardType={'numeric'}
      />
      <ListWithLabel
        label="Commands"
        data={commands.map((c) => ({
          value: c.name,
          text: c.name,
          onDelete: () => {},
          onEdit: () => {},
        }))}
        onAdd={() => navigation.navigate('Command')}
        containerStyle={styles.commandsList}
      />

      <View style={styles.buttonContainer}>
        <Button
          color="#B88B4A"
          title={id ? 'Save' : 'Add'}
          onPress={addNewDeviceHandler}
        />
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
  commandsList: {
    marginTop: 32,
  },
  controlMethodText: {
    color: colors.white,
    fontSize: 24,
    marginTop: 32,
    marginBottom: 14,
  },
  portContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
})
