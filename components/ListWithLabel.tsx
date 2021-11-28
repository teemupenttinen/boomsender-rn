import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { colors } from '../styles/colors'
import { RowItem } from './RowItem'

interface ListWithLabelProps {
  data: RowItem[]
  onAdd: () => void
  containerStyle?: StyleProp<ViewStyle>
  label: string
}

export const ListWithLabel: React.FC<ListWithLabelProps> = ({
  data,
  onAdd,
  containerStyle,
  label,
}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.listLabelContainer}>
        <Text style={styles.listLabel}>{label}</Text>
        <Text style={styles.listAction} onPress={onAdd}>
          +
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={RowItem}
        keyExtractor={(item) => item.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listLabelContainer: {
    flexDirection: 'row',
    paddingRight: 14,
  },
  listLabel: {
    color: colors.white,
    flexBasis: 0,
    flexGrow: 1,
    fontSize: 24,
    lineHeight: 32,
  },
  listAction: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 32,
  },
  list: {
    paddingTop: 8,
  },
})
