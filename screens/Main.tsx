import 'react-native-gesture-handler'
import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { RowItem } from '../components/RowItem'
import { useApp } from '../contexts/appContext'
import { MainProps } from './Home'

export const Main = ({ navigation }: MainProps) => {
  const { devices } = useApp()

  const transformedDevices: RowItem[] = devices.map((d) => ({
    id: d.id,
    text: d.name,
  }))

  const addNewDevice = () => {
    navigation.navigate("Device")
  }

  return (
    <View style={styles.main}>
      <View style={styles.listLabelContainer}>
        <Text style={styles.listLabel}>Devices</Text>
        <Text style={styles.listAction} onPress={addNewDevice}>
          +
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={transformedDevices}
        renderItem={RowItem}
      />
      <View style={styles.middleLabel}>
        <Text style={{ color: 'white', fontSize: 24 }}>
          This space is reserved for your devices!
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 8,
    height: '100%',
  },
  listLabelContainer: {
    flexDirection: 'row',
    // paddingLeft: 8,
    paddingRight: 24,
  },
  listLabel: {
    color: 'white',
    flexBasis: 0,
    flexGrow: 1,
    fontSize: 24,
    lineHeight: 32,
  },
  listAction: {
    color: 'white',
    fontSize: 32,
    lineHeight: 32,
  },
  list: {
    paddingTop: 8,
  },
  middleLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    zIndex: -1,
  },
})
