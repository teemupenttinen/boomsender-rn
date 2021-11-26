import React from 'react'
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
  Theme,
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'
import { AppContextProvider } from './contexts/appContext'

const Tab = createBottomTabNavigator()

const defaultTheme: Theme = {
  dark: false,
  colors: {
    primary: '#000',
    background: '#242331',
    card: '#fff',
    text: '#000',
    border: '#000',
    notification: '#000',
  },
}
export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer theme={defaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name === 'Home' ? false : true,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}
