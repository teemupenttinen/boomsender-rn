import React, { useContext, useEffect, useState } from 'react'
import { Device } from '../types/device'

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
  const [ipAddresses, setIpAddreses] = useState<string[]>(['192.168.1.12'])
  const [ports, setPorts] = useState<number[]>([1294, 1259])

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: 'TV1',
        controlMethod: 'UDP',
        commands: [
          { name: 'Power On', command: '123' },
          { name: 'Power Off', command: '123' },
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
