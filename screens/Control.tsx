import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { Button } from '../components/Button'
import { useApp } from '../contexts/appContext'
import { colors } from '../styles/colors'
import { ControlProps } from './Home'
import DropDownPicker from 'react-native-dropdown-picker'
import tcpSocket from 'react-native-tcp-socket'
import { BaseScreen } from '../components/BaseScreen'

export const Control: React.FC<ControlProps> = ({ route }) => {
  const [openIpDropdown, setOpenIpDropdown] = useState(false)
  const [openPortDropdown, setOpenPortDropdown] = useState(false)
  const [openCommandDropdown, setOpenCommandDropdown] = useState(false)
  const [ipAddress, setIpAddress] = useState('')
  const [port, setPort] = useState<number>(8080)
  const [command, setCommand] = useState('')
  const [connAlive, setConnAlive] = useState(false)

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
      setPort(route.params.device.port)
      setCommand(route.params.device.commands[0].command)
    }
  }, [route])

  const device = route.params?.device

  const sendCommand = () => {
    if (route.params?.device.controlMethod === 'TCP') {
      const sock = tcpSocket.createConnection(
        { localAddress: ipAddress, port: port },
        () => {
          if (sock) {
            sock.write(command)
            sock.destroy()
          }
        }
      )
    }
  }

  if (!device) {
    return (
      <View>
        <Text>No device found</Text>
      </View>
    )
  }

  return (
    <BaseScreen>
      <View style={styles.ipDropdown}>
        <Text style={styles.label}>IP Address</Text>
        <DropDownPicker
          open={openIpDropdown}
          value={ipAddress}
          items={ipAddresses.map((ip) => ({ value: ip, label: ip }))}
          setOpen={setOpenIpDropdown}
          setValue={setIpAddress}
        />
      </View>
      <View style={styles.portDropdown}>
        <Text style={[styles.label, styles.gap]}>Port</Text>
        <DropDownPicker
          open={openPortDropdown}
          value={port}
          items={ports.map((p) => ({
            value: p.toString(),
            label: p.toString(),
          }))}
          setOpen={setOpenPortDropdown}
          setValue={setPort}
        />
      </View>
      <View style={styles.commandDropdown}>
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
        />
      </View>
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
        <Button title="Send" color={colors.button} onPress={sendCommand} />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: 24,
    marginBottom: 14,
  },
  gap: {
    marginTop: 16,
  },
  ipDropdown: {
    zIndex: 12,
  },
  portDropdown: {
    zIndex: 11,
  },
  commandDropdown: {
    zIndex: 10,
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
