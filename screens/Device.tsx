import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BaseScreen } from '../components/BaseScreen'
import { Button } from '../components/Button'
import { ListWithLabel } from '../components/ListWithLabel'
import { SegmentedControl } from '../components/SegmentedControl'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { useApp } from '../contexts/appContext'
import { colors } from '../styles/colors'
import {
  Command,
  ControlMethod,
  OmitID,
  Device as DeviceInterface
} from '../types/device'
import { DeviceProps } from './Home'

const CONTROL_METHODS: ControlMethod[] = ['TCP', 'UDP']

export const Device: React.FC<DeviceProps> = ({ navigation, route }) => {
  const [id, setId] = useState<string | undefined>()
  const [name, setName] = useState('')
  const [controlMethod, setControlMethod] = useState<ControlMethod>('TCP')
  const [commands, setCommands] = useState<Command[]>([])
  const [port, setPort] = useState<string>('')

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
    const device: OmitID<DeviceInterface> = {
      name,
      controlMethod,
      commands,
      port: parseInt(port),
    }

    if (id) {
      editDevice({
        id,
        ...device
      })
    } else {
      addNewDevice(device)
    }
    setId(undefined)
    setName('')
    setControlMethod('TCP')
    setCommands([])
    setPort('')
    navigation.navigate('Main')
  }

  return (
    <BaseScreen>
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
        onChangeText={(text) => setPort(text)}
        keyboardType={'number-pad'}
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
          color={colors.button}
          title={id ? 'Save' : 'Add'}
          onPress={addNewDeviceHandler}
        />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  commandsList: {
    marginTop: 32,
    maxHeight: 180,
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
