import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Images } from '../constants'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {
  const {user} = useUser()
  return (
     <View style={styles.header}>
            <TouchableOpacity>
              <Image 
                source={Images.Notification}
                style={styles.notificationIcon}
              />
            </TouchableOpacity>
              
            <Text style={styles.logoText}>TRASH</Text>
            
            <Image 
                source={{uri:user?.imageUrl}}
                style={styles.profileIcon}
              />
            
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
    fontSize: 22,
    fontWeight: 'bold',
    color:"#000"
  }
})