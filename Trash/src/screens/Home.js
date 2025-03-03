import { View, Text, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Seperator } from "../components";
import Header from "../components/Header";
import WelcomeText from "../components/WelcomeText";
import WasteSelection from "../components/WasteSelection";
import YourOrders from "../components/YourOrders";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header/>
      <WelcomeText/>
      <WasteSelection/>
      <YourOrders/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
