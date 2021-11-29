import React, { useContext, useEffect, useState } from 'react'
import { Command, Device } from '../types/device'
import tcpSocket from 'net'

interface AppContextValues {
  devices: Device[]
  ipAddresses: string[]
  ports: number[]
  addNewDevice: (newDevice: Device) => void
  removeDevice: (id: Device['id']) => void
  editDevice: (newDevice: Device) => void
  addIpAddress: (ip: string) => void
  deleteIpAddress: (ip: string) => void
  addPort: (port: number) => void
  deletePort: (port: number) => void
}

const AppContext = React.createContext<AppContextValues>({
  devices: [],
  ipAddresses: [],
  ports: [],
  addNewDevice: () => {},
  removeDevice: () => {},
  editDevice: () => {},
  addIpAddress: () => {},
  deleteIpAddress: () => {},
  addPort: () => {},
  deletePort: () => {},
})

export const AppContextProvider: React.FC = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([])
  const [ipAddresses, setIpAddreses] = useState<string[]>(['127.0.0.1'])
  const [ports, setPorts] = useState<number[]>([8080, 1259])

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: 'TV1',
        controlMethod: 'TCP',
        commands: [
          { name: 'Power On', command: 'poweron\x0a' },
          { name: 'Power Off', command: 'poweroff\x0a' },
        ],
        port: 1337,
      },
    ])
  }, [])

  const addNewDevice = (newDevice: Device) => {
    setDevices([...devices, newDevice])
  }

  const editDevice = (newDevice: Device) => {
    const newDevices = [
      ...devices.filter((d) => d.id !== newDevice.id),
      newDevice,
    ]
    setDevices(newDevices)
  }

  const removeDevice = (id: Device['id']) => {
    const newDevices = devices.filter((d) => d.id !== id)
    setDevices(newDevices)
  }

  const addIpAddress = (ip: string) =>
    !ipAddresses.includes(ip) && setIpAddreses([...ipAddresses, ip])

  const deleteIpAddress = (ip: string) =>
    setIpAddreses(ipAddresses.filter((i) => i !== ip))

  const addPort = (port: number) =>
    !ports.includes(port) && setPorts([...ports, port])

  const deletePort = (port: number) => setPorts(ports.filter((p) => p !== port))

  return (
    <AppContext.Provider
      value={{
        devices,
        ipAddresses,
        ports,
        addNewDevice,
        removeDevice,
        editDevice,
        addIpAddress,
        deleteIpAddress,
        addPort,
        deletePort,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}
