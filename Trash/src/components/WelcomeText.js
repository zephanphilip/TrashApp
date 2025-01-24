import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';

const WelcomeText = () => {
    const { user } = useUser();
    const navigation = useNavigation();
  return (
    <View style={styles.welcomeSection}>
    <Text style={styles.greeting}>
      Welcome {user?.firstName || 'Guest'},
    </Text>
    <Text style={styles.questionText}>
      What scrap do you want to clear today?
    </Text>
    </View>
  )
}

export default WelcomeText

const styles = StyleSheet.create({
    welcomeSection: {
      marginBottom: 14,
      paddingHorizontal: 15,
      backgroundColor:"#5c6738",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    greeting: {
      fontSize: 18,
      color:"white",
      marginBottom: 8,
      
    },
    questionText: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 6,
      color:"#fbf9e2"
    },
  });
  