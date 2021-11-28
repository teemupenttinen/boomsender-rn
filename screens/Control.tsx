import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { Button } from '../components/Button'
import { useApp } from '../contexts/appContext'
import { colors } from '../styles/colors'
import { ControlProps } from './Home'

export const Control: React.FC<ControlProps> = ({ route }) => {
  const { ipAddresses, ports } = useApp()
  const [ipAddress, setIpAddress] = useState('')
  const [port, setPort] = useState<number | undefined>()
  const [command, setCommand] = useState('')
  const [connAlive, setConnAlive] = useState(false)

  useEffect(() => {
    if (route.params?.device) {
      setPort(route.params.device.port)
    }
  }, [route])

  const device = route.params?.device

  if (!device) {
    return (
      <View>
        <Text>No device found</Text>
      </View>
    )
  }
  return (
    <View style={styles.control}>
      <Text style={styles.label}>IP Address</Text>
      <Picker
        style={styles.dropdown}
        selectedValue={ipAddress}
        onValueChange={(value) => setIpAddress(value)}
      >
        {ipAddresses.map((ip) => (
          <Picker.Item label={ip} value={ip} />
        ))}
      </Picker>
      <Text style={[styles.label, styles.gap]}>Port</Text>
      <Picker
        style={styles.dropdown}
        selectedValue={port}
        onValueChange={(value) => setPort(value)}
      >
        {[device.port, ...ports].map((p) => (
          <Picker.Item label={p.toString()} value={p} />
        ))}
      </Picker>
      <Text style={[styles.label, styles.gap]}>Command</Text>
      <Picker
        style={styles.dropdown}
        selectedValue={command}
        onValueChange={(value) => setCommand(value)}
      >
        {device.commands.map((c) => (
          <Picker.Item label={c.name} value={c} />
        ))}
      </Picker>
      <Text style={[styles.label, styles.gap]}>Response</Text>
      <View style={styles.responseContainer}>
        <Text>power\x0a</Text>
      </View>
      {device.controlMethod === 'TCP' && (
        <View style={styles.connectionStateContainer}>
          <Text style={[styles.label, styles.connectionLabel]}>
            Keep connection alive
          </Text>
          <Switch
            trackColor={{ true: '#34C759', false: '#fafafa' }}
            style={styles.switch}
            value={connAlive}
            onValueChange={setConnAlive}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Send"
          color="#B88B4A"
          onPress={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  control: {
    padding: 16,
    height: '100%',
  },
  label: {
    color: colors.white,
    fontSize: 24,
    marginBottom: 14,
  },
  gap: {
    marginTop: 16,
  },
  dropdown: {
    borderRadius: 8,
    height: 60,
  },
  responseContainer: {
    flex: 2,
    backgroundColor: colors.primaryBackground,
    borderRadius: 8,
    padding: 8,
  },
  connectionStateContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionLabel: {
    marginTop: 10,
  },
  switch: {
    marginLeft: 16,
    height: 30,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
})
