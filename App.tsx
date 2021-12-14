import React from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'
import { AppContextProvider } from './contexts/appContext'
import { defaultTheme } from './styles/colors'
import { FirebaseContextProvider } from './contexts/firebaseContext'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer theme={defaultTheme}>
        <FirebaseContextProvider>
          <AppContextProvider>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                headerTransparent: true,
                tabBarIcon: ({ color, size }) => {
                  return (
                    <Ionicons
                      name={route.name === 'Home' ? 'home' : 'settings'}
                      size={size}
                      color={color}
                    />
                  )
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </AppContextProvider>
        </FirebaseContextProvider>
      </NavigationContainer>
    </MenuProvider>
  )
}
