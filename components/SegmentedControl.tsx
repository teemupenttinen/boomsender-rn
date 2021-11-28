import React from 'react'
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export interface SegmentedControlOption {
  value: string
  name: string
}

interface SegmentedControlProps {
  options: SegmentedControlOption[]
  active: string
  onChange: (value: string) => void
  containerStyle?: StyleProp<ViewStyle>
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  active,
  onChange,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        return (
          <View
            style={[styles.option, active === option.value && styles.active]}
          >
            <TouchableOpacity
              onPress={() => onChange(option.value)}
              containerStyle={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.text}>{option.name}</Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#4f4d65',
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'stretch',
    borderRadius: 7,
  },
  option: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  active: {
    backgroundColor: '#fafafa',
  },
  text: {
    width: '100%',
    flex: 1,
  },
})
