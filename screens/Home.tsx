import 'react-native-gesture-handler'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { Main } from './Main'
import { Device } from './Device'
import { Command } from './Command'
import {
  Command as CommandInterface,
  Device as DeviceInterface,
} from '../types/device'
import { RouteProp } from '@react-navigation/native'
import { Control } from './Control'

type HomeStackParamList = {
  Main: undefined
  Device: {
    newCommand?: CommandInterface
    device?: DeviceInterface
  }
  Command: undefined
  Control: {
    device: DeviceInterface
  }
}

export type MainProps = NativeStackScreenProps<HomeStackParamList, 'Main'>
export type DeviceProps = NativeStackScreenProps<HomeStackParamList, 'Device'>
export type CommandProps = NativeStackScreenProps<HomeStackParamList, 'Command'>
export type ControlProps = NativeStackScreenProps<HomeStackParamList, 'Control'>

const Stack = createStackNavigator<HomeStackParamList>()

export const Home: React.FC = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => {
        return {
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 28,
          },
          headerShadowVisible: false,
          headerTintColor: 'white',
          headerTitle: getHeaderTitle(route),
          headerShown: route.name !== 'Main',
        }
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Device" component={Device} />
      <Stack.Screen name="Command" component={Command} />
      <Stack.Screen name="Control" component={Control} />
    </Stack.Navigator>
  )
}

const getHeaderTitle = (
  route: RouteProp<HomeStackParamList, keyof HomeStackParamList>
) => {
  switch (route.name) {
    case 'Device': {
      return 'New device'
    }
    case 'Command': {
      return 'Add command'
    }
  }
}
