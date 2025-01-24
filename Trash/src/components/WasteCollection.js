import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const WasteCollection = () => {
  return (
    <View style={styles.container}>
      <Text>Select your Category</Text>
    </View>
  )
}

export default WasteCollection

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
        paddingHorizontal: 15,
        backgroundColor:"#5c6738",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
      },
  });
