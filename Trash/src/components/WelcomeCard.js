import { View, StyleSheet,SafeAreaView, Image, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { Display } from '../utils';
import {Images} from '../constants'
import { useNavigation } from '@react-navigation/native';


export default function WelcomeCard({title, content, image,route}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate(route)}>
     <Image style={styles.image} source={Images[image]} resizeMode='contain'/>
     </TouchableOpacity>
     <Text style={styles.titleText}>{title}</Text>
     <Text style={styles.contentText}>{content}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      width: Display.setWidth(100),
     
    },
    image:{
        height: Display.setHeight(30),
        width: Display.setWidth(60)
    },
    titleText:{
        fontSize: 32,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    contentText:{
        fontSize:18,
        textAlign:"center",
        marginHorizontal:20
    },
  });