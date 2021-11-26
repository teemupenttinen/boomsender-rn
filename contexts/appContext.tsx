import React, { useContext, useEffect, useState } from 'react'

interface AppContextValues {
  devices: Device[]
  addNewDevice: (name: string) => void
}

const AppContext = React.createContext<AppContextValues>({
  devices: [],
  addNewDevice: () => {},
})

export const AppContextProvider: React.FC = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([])

  useEffect(() => {
    setDevices([{ id: 1, name: 'TV1' }])
  }, [])

  const addNewDevice = (name: string) => {
    setDevices([...devices, { id: Math.floor(Math.random() * 100), name }])
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
