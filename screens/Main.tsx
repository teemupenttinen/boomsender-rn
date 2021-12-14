import 'react-native-gesture-handler'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useApp } from '../contexts/appContext'
import { MainProps } from './Home'
import { ListWithLabel } from '../components/ListWithLabel'
import { colors } from '../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseScreen } from '../components/BaseScreen'

export const Main = ({ navigation }: MainProps) => {
  const { devices, removeDevice, shareDevice } = useApp()

  return (
    <SafeAreaView>
      <BaseScreen>
        <ListWithLabel
          label="Devices"
          containerStyle={styles.list}
          data={devices.map((d) => ({
            value: d.id,
            text: d.name,
            onDelete: () => {
              removeDevice(d.id)
            },
            onEdit: () => {
              navigation.navigate('Device', { device: d })
            },
            onRowPress: () => {
              navigation.navigate('Control', { device: d })
            },
            onShare: () => {
              const { id, ...device } = d
              shareDevice(device)
            },
          }))}
          onAdd={() => navigation.navigate('Device', {})}
        />
        <View style={styles.middleLabel}>
          <Text style={styles.middleLabelText}>
            This space is reserved for your devices!
          </Text>
        </View>
      </BaseScreen>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  middleLabelText: { color: colors.white, fontSize: 24, textAlign: 'center' },
})
