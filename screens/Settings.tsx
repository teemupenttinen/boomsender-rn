import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListWithLabel } from '../components/ListWithLabel'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useApp } from '../contexts/appContext'
import { TextFieldWithLabel } from '../components/TextFieldWithLabel'
import { Button } from '../components/Button'

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
    <View style={{ padding: 16 }}>
      <TextFieldWithLabel
        label={label}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" color="#B88B4A" onPress={addHandler} />
      </View>
    </View>
  )
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { ipAddresses, ports } = useApp()

  return (
    <View style={{ padding: 16 }}>
      <ListWithLabel
        data={ipAddresses.map((ip) => {
          return {
            text: ip,
            value: ip,
          }
        })}
        onAdd={() => navigation.navigate('AddScreen', { type: 'IP' })}
        label="Ip Addresses"
      ></ListWithLabel>
      <ListWithLabel
        containerStyle={{ marginTop: 16 }}
        data={ports.map((port) => ({
          text: port.toString(),
          value: port.toString(),
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
      return `Add ${route.params?.type === 'IP' ? 'IP address' : 'port'}`
    }
  }
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 24,
    marginBottom: 14,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
})
