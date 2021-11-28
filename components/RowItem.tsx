import React from 'react'
import { ListRenderItem, Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { colors } from '../styles/colors'

export interface RowItem {
  value: string
  text: string
  onDelete?: () => void
  onEdit?: () => void
  onRowPress?: () => void
}

export const RowItem: ListRenderItem<RowItem> = ({ item }) => (
  <View style={styles.rowItem}>
    <TouchableOpacity
      containerStyle={styles.rowLabel}
      onPress={item.onRowPress}
    >
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
    <Menu>
      <MenuTrigger>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>?</Text>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.menuOptionsContainer}>
        <MenuOption
          style={styles.menuItemContainer}
          onSelect={item.onEdit}
          text="Edit"
        />
        <MenuOption style={styles.menuItemContainer} onSelect={item.onDelete}>
          <Text style={styles.menuItemContainerText}>Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
)

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: colors.primaryBackground,
    height: 60,
    borderBottomColor: colors.borderLineColor,
    borderBottomWidth: 1,
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
  rowLabel: {
    flexBasis: 0,
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: colors.black },
  menuItemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLineColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemContainerText: {
    color: colors.red,
  },
  menuOptionsContainer: { borderRadius: 8 },
})
