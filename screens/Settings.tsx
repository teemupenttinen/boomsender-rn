import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListWithLabel } from '../components/ListWithLabel'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useApp } from '../contexts/appContext'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { Button } from '../components/Button'
import { layout } from '../styles/layout'
import { colors } from '../styles/colors'

type AddType = 'IP' | 'PORT'

type SettingsStackParamList = {
  SettingsScreen: undefined
  AddScreen: {
    type: AddType
  }
}

type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'SettingsScreen'
>
type AddScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'AddScreen'
>

const Stack = createStackNavigator<SettingsStackParamList>()

const AddScreen: React.FC<AddScreenProps> = ({ route, navigation }) => {
  const [value, setValue] = useState('')
  const { addIpAddress, addPort } = useApp()

  const addHandler = () => {
    if (route.params.type === 'IP') {
      addIpAddress(value)
    } else {
      addPort(parseInt(value))
    }
    navigation.goBack()
  }

  const label = route.params.type === 'IP' ? 'IP address' : 'Port'
  return (
    <View style={layout.viewPadding}>
      <TextFieldWithLabel
        label={label}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" color={colors.button} onPress={addHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
})

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { ipAddresses, ports, deleteIpAddress, deletePort } = useApp()

  return (
    <View style={layout.viewPadding}>
      <ListWithLabel
        data={ipAddresses.map((ip) => {
          return {
            text: ip.ipAddress,
            value: ip.id,
            onDelete: () => {
              deleteIpAddress(ip.id)
            },
          }
        })}
        onAdd={() => navigation.navigate('AddScreen', { type: 'IP' })}
        label="Ip Addresses"
      ></ListWithLabel>
      <ListWithLabel
        containerStyle={layout.gap}
        data={ports.map((port) => ({
          text: port.port.toString(),
          value: port.port.toString(),
          onDelete: () => {
            deletePort(port.id)
          },
        }))}
        onAdd={() => navigation.navigate('AddScreen', { type: 'PORT' })}
        label="Ports"
      ></ListWithLabel>
    </View>
  )
}

export const Settings: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
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
        }
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
    </Stack.Navigator>
  )
}

const getHeaderTitle = (
  route: RouteProp<SettingsStackParamList, keyof SettingsStackParamList>
) => {
  switch (route.name) {
    case 'SettingsScreen': {
      return 'Settings'
    }
    case 'AddScreen': {
      return route.params?.type === 'IP' ? 'IP address' : 'Port'
    }
  }
}
