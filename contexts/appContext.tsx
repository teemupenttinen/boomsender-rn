import React, { useContext, useEffect, useState } from 'react'
import { Device } from '../types/device'
import { getData, STORAGE_KEYS, storeData } from '../storage'

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
  const [ipAddresses, setIpAddreses] = useState<string[]>([])
  const [ports, setPorts] = useState<number[]>([])

  const readStorage = async () => {
    const loadedDevices = await getData(STORAGE_KEYS.devices)
    if (loadedDevices) {
      setDevices(loadedDevices)
    }

    const loadedIpAddresses = await getData(STORAGE_KEYS.ipAddresses)
    if (loadedIpAddresses) {
      setIpAddreses(loadedIpAddresses)
    }

    const loadedPorts = await getData(STORAGE_KEYS.ports)
    if (loadedPorts) {
      setPorts(loadedPorts)
    }
  }

  useEffect(() => {
    readStorage()
  }, [])

  const addNewDevice = (newDevice: Device) => {
    const newDevices = [...devices, newDevice]
    setDevices(newDevices)
    storeData(STORAGE_KEYS.devices, newDevices)
  }

  const editDevice = (newDevice: Device) => {
    const newDevices = [
      ...devices.filter((d) => d.id !== newDevice.id),
      newDevice,
    ]
    setDevices(newDevices)
    storeData(STORAGE_KEYS.devices, newDevices)
  }

  const removeDevice = (id: Device['id']) => {
    const newDevices = devices.filter((d) => d.id !== id)
    setDevices(newDevices)
    storeData(STORAGE_KEYS.devices, newDevices)
  }

  const addIpAddress = (ip: string) => {
    if (!ipAddresses.includes(ip)) {
      const newIpAddresses = [...ipAddresses, ip]
      setIpAddreses(newIpAddresses)
      storeData(STORAGE_KEYS.ipAddresses, newIpAddresses)
    }
  }

  const deleteIpAddress = (ip: string) => {
    const newIpAddresses = ipAddresses.filter((i) => i !== ip)
    setIpAddreses(newIpAddresses)
    storeData(STORAGE_KEYS.ipAddresses, newIpAddresses)
  }

  const addPort = (port: number) => {
    if (!ports.includes(port)) {
      const newPorts = [...ports, port]
      setPorts(newPorts)
      storeData(STORAGE_KEYS.ports, newPorts)
    }
  }

  const deletePort = (port: number) => {
    const newPorts = ports.filter((p) => p !== port)
    setPorts(newPorts)
    storeData(STORAGE_KEYS.ports, newPorts)
  }

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
