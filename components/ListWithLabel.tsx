import React from 'react'
import { View, StyleSheet, Text, FlatList, ListRenderItem } from 'react-native'
import { RowItem } from './RowItem'

interface ListWithLabelProps {
  data: RowItem[]
  onAdd: () => void
}

export const ListWithLabel: React.FC<ListWithLabelProps> = ({
  data,
  onAdd,
}) => {
  return (
    <View>
      <View style={styles.listLabelContainer}>
        <Text style={styles.listLabel}>Devices</Text>
        <Text style={styles.listAction} onPress={onAdd}>
          +
        </Text>
      </View>
      <FlatList style={styles.list} data={data} renderItem={RowItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  listLabelContainer: {
    flexDirection: 'row',
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
})
