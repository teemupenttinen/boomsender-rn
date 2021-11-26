import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Main } from './Main'
import { Device } from './Device'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type HomeStackParamList = {
  Main: undefined
  Device: undefined
}

export type MainProps = NativeStackScreenProps<HomeStackParamList, 'Main'>
export type DeviceProps = NativeStackScreenProps<HomeStackParamList, 'Device'>

const Stack = createStackNavigator<HomeStackParamList>()

export const Home: React.FC = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Device">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Device" component={Device} />
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  )
}
