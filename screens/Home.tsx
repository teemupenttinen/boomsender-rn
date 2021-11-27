import 'react-native-gesture-handler'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { Main } from './Main'
import { Device } from './Device'
import { Command } from './Command'
import { Command as CommandInterface } from '../types/device'

type HomeStackParamList = {
  Main: undefined
  Device: {
    newCommand?: CommandInterface
  }
  Command: undefined
}

export type MainProps = NativeStackScreenProps<HomeStackParamList, 'Main'>
export type DeviceProps = NativeStackScreenProps<HomeStackParamList, 'Device'>
export type CommandProps = NativeStackScreenProps<HomeStackParamList, 'Command'>

const Stack = createStackNavigator<HomeStackParamList>()

export const Home: React.FC = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Device">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Device" component={Device} />
      <Stack.Screen name="Command" component={Command} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  )
}
