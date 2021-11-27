import React, { useContext, useEffect, useState } from 'react'
import { Device } from '../types/device'

interface AppContextValues {
  devices: Device[]
  addNewDevice: (newDevice: Device) => void
}

const AppContext = React.createContext<AppContextValues>({
  devices: [],
  addNewDevice: () => {},
})

export const AppContextProvider: React.FC = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([])

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: 'TV1',
        controlMethod: 'UDP',
        commands: [{ name: 'CMD 1', command: '123' }],
      },
    ])
  }, [])

  const addNewDevice = (newDevice: Device) => {
    setDevices([...devices, newDevice])
  }

  return (
    <AppContext.Provider value={{ devices, addNewDevice }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const { devices, addNewDevice } = useContext(AppContext)

  return { devices, addNewDevice }
}
