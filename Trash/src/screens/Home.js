import { View, Text, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Seperator } from "../components";
import Header from "../components/Header";
import WelcomeText from "../components/WelcomeText";
import WasteCollection from "../components/WasteCollection";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header/>
      <WelcomeText/>
      
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuHead: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
  },
});
