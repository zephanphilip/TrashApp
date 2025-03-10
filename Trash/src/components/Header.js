import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Images } from '../constants'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
  const {user} = useUser()
  const navigation = useNavigation()
  return (
     <View style={styles.header}>
            
              
            <Text style={styles.logoText}>TRASH</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
                source={{uri:user?.imageUrl}}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </View>
          
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal:15,
    paddingVertical:16
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color:"#000"
  }
})