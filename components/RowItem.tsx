import React from 'react'
import { Button, ListRenderItem, Text, View, StyleSheet } from 'react-native'

export interface RowItem {
  value: string,
  text: string
}

export const RowItem: ListRenderItem<RowItem> = ({ item }) => (
  <View style={styles.rowItem}>
    <Text style={styles.text}>{item.text}</Text>
    <Button title="menu" onPress={() => console.log('menu')} />
  </View>
)

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#FAFAFA",
    height: 60,
    borderBottomColor: "#3992EE",
    borderBottomWidth: 1
  },
  text: {
    flexBasis: 0,
    flexGrow: 1,
    color: "black",
    fontSize: 20
  }
})
