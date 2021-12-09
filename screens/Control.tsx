import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { Button } from '../components/Button'
import { useApp } from '../contexts/appContext'
import { colors } from '../styles/colors'
import { ControlProps } from './Home'
import DropDownPicker from 'react-native-dropdown-picker'
import dgram from 'react-native-udp'
import { BaseScreen } from '../components/BaseScreen'
import Constants from 'expo-constants'
import tcp from '../tcp'

export const Control: React.FC<ControlProps> = ({ route }) => {
  const [openIpDropdown, setOpenIpDropdown] = useState(false)
  const [openPortDropdown, setOpenPortDropdown] = useState(false)
  const [openCommandDropdown, setOpenCommandDropdown] = useState(false)
  const [ipAddress, setIpAddress] = useState('')
  const [port, setPort] = useState<string>('')
  const [command, setCommand] = useState('')
  const [waitForResponse, setConnAlive] = useState(false)
  const [response, setResponse] = useState('')

  const { ipAddresses, ports } = useApp()

  useEffect(() => {
    if (openIpDropdown) {
      setOpenPortDropdown(false)
      setOpenCommandDropdown(false)
    }
  }, [openIpDropdown])

  useEffect(() => {
    if (openPortDropdown) {
      setOpenIpDropdown(false)
      setOpenCommandDropdown(false)
    }
  }, [openPortDropdown])

  useEffect(() => {
    if (openCommandDropdown) {
      setOpenIpDropdown(false)
      setOpenPortDropdown(false)
    }
  }, [openCommandDropdown])

  useEffect(() => {
    if (route.params?.device) {
      if (ipAddresses.length > 0) {
        setIpAddress(ipAddresses[0].ipAddress)
      }
      setPort(route.params.device.port.toString())
      setCommand(route.params.device.commands[0].command)
    }
  }, [route])

  const device = route.params?.device

  const sendCommand = () => {
    setResponse('')
    if (device.controlMethod === 'TCP') {
      const sock = tcp.createConnection(
        { localAddress: ipAddress, port: parseInt(port) },
        () => {
          sock.write(command)
          if (!waitForResponse) {
            sock.destroy()
          }
        }
      )
      if (waitForResponse) {
        sock.on('data', (data: any) => {
          setResponse(data.toString())
          sock.destroy()
        })
      }
    } else {
      const socket = dgram.createSocket({ type: 'udp4' })
      socket.bind()
      socket.once('listening', () => {
        socket.send(
          command,
          undefined,
          undefined,
          parseInt(port),
          ipAddress,
          () => {
            socket.close()
          }
        )
      })
    }
  }

  const portsArr = [
    ...ports.map((p) => ({
      value: p.port.toString(),
      label: p.port.toString(),
    })),
  ]
  if (!ports.find((p) => p.port === device.port)) {
    portsArr.push({
      value: device.port.toString(),
      label: device.port.toString(),
    })
  }
  return (
    <BaseScreen>
      {Constants.appOwnership === 'expo' && device.controlMethod === 'TCP' && (
        <Text style={styles.mockWarning}>
          You are running the app with Expo Go. TCP client will be mocked
        </Text>
      )}
      <Text style={styles.label}>IP Address</Text>
      <DropDownPicker
        open={openIpDropdown}
        value={ipAddress}
        items={ipAddresses.map((ip) => ({
          value: ip.ipAddress,
          label: ip.ipAddress,
        }))}
        setOpen={setOpenIpDropdown}
        setValue={setIpAddress}
        zIndex={3}
      />
      <Text style={[styles.label, styles.gap]}>Port</Text>
      <DropDownPicker
        open={openPortDropdown}
        value={port}
        items={portsArr}
        setOpen={setOpenPortDropdown}
        setValue={setPort}
        zIndex={2}
      />
      <Text style={[styles.label, styles.gap]}>Command</Text>
      <DropDownPicker
        open={openCommandDropdown}
        value={command}
        items={device.commands.map((c) => ({
          value: c.command,
          label: c.name,
        }))}
        setOpen={setOpenCommandDropdown}
        setValue={setCommand}
        zIndex={1}
      />
      {device.controlMethod === 'TCP' && (
        <>
          <Text style={[styles.label, styles.gap]}>Response</Text>
          <View style={styles.responseContainer}>
            <Text>{response}</Text>
          </View>

          <View style={styles.connectionStateContainer}>
            <Text style={[styles.label, styles.connectionLabel]}>
              Wait for response
            </Text>
            <Switch
              trackColor={{ true: '#34C759', false: '#fafafa' }}
              style={styles.switch}
              value={waitForResponse}
              onValueChange={setConnAlive}
            />
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Send" color={colors.button} onPress={sendCommand} />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  mockWarning: {
    color: colors.red,
  },
  label: {
    color: colors.white,
    fontSize: 24,
    marginBottom: 14,
  },
  gap: {
    marginTop: 16,
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
