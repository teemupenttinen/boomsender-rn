import React, { useContext, useEffect, useState } from 'react'
import { Device, IPAddress, OmitID, Port } from '../types/device'
import { useFirebase } from './firebaseContext'

interface AppContextValues {
  devices: Device[]
  ipAddresses: IPAddress[]
  ports: Port[]
  addNewDevice: (newDevice: OmitID<Device>) => void
  removeDevice: (id: Device['id']) => void
  editDevice: (newDevice: Device) => void
  addIpAddress: (ip: string) => void
  deleteIpAddress: (ip: IPAddress['id']) => void
  addPort: (port: number) => void
  deletePort: (port: Port['id']) => void
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

type FirebaseStorage = {
  devices: Record<string, OmitID<Device>>
  ipAddresses: Record<string, string>
  ports: Record<string, number>
}

export const AppContextProvider: React.FC = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([])
  const [ipAddresses, setIpAddreses] = useState<IPAddress[]>([])
  const [ports, setPorts] = useState<Port[]>([])

  const { getData, addItem, updateItem, deleteItem, user } = useFirebase()

  const readFirebase = async () => {
    const data = (await getData()) as FirebaseStorage
    if (data.devices) {
      const loadedDevices = Object.keys(data.devices).map((id) => {
        return {
          ...data.devices[id],
          id,
        }
      })
      setDevices(loadedDevices)
    }

    if (data.ipAddresses) {
      const loadedIpAddresses = Object.keys(data.ipAddresses).map((id) => {
        return {
          ipAddress: data.ipAddresses[id],
          id,
        }
      })
      setIpAddreses(loadedIpAddresses)
    }

    if (data.ports) {
      const loadedPorts = Object.keys(data.ports).map((id) => {
        return {
          port: data.ports[id],
          id,
        }
      })
      setPorts(loadedPorts)
    }
  }

  useEffect(() => {
    if (user) {
      readFirebase()
    }
  }, [user])

  const addNewDevice = async (newDevice: OmitID<Device>) => {
    const newDeviceId = await addItem('devices', newDevice)
    const newDevices = [...devices, { id: newDeviceId, ...newDevice }]
    setDevices(newDevices)
  }

  const editDevice = (newDevice: Device) => {
    const newDevices = [
      ...devices.filter((d) => d.id !== newDevice.id),
      newDevice,
    ]
    setDevices(newDevices)
    updateItem('devices', newDevice.id, newDevice)
  }

  const removeDevice = (id: Device['id']) => {
    const newDevices = devices.filter((d) => d.id !== id)
    setDevices(newDevices)
    deleteItem('devices', id)
  }

  const addIpAddress = async (newIp: string) => {
    if (!ipAddresses.find((ip) => ip.ipAddress === newIp)) {
      const createdId = await addItem('ipAddresses', newIp)
      const newIpAddresses = [
        ...ipAddresses,
        { id: createdId, ipAddress: newIp },
      ]
      setIpAddreses(newIpAddresses)
    }
  }

  const deleteIpAddress = (id: IPAddress['id']) => {
    const newIpAddresses = ipAddresses.filter((ip) => ip.id !== id)
    setIpAddreses(newIpAddresses)
    deleteItem('ipAddresses', id)
  }

  const addPort = async (newPort: number) => {
    if (!ports.find((port) => port.port === newPort)) {
      const createdId = await addItem('ports', newPort)
      const newPorts = [...ports, { id: createdId, port: newPort }]
      setPorts(newPorts)
    }
  }

  const deletePort = (id: Port['id']) => {
    const newPorts = ports.filter((port) => port.id !== id)
    setPorts(newPorts)
    deleteItem('ports', id)
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
