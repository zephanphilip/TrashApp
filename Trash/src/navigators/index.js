import React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

import { Auth, SplashScreen, WelcomeScreen, Home, Profile, EducationalContent, Checkout, ChatWithAgent, AiChatBot } from "../screens";
import { StyleSheet, Text } from "react-native";
import { Display } from "../utils";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigators = () => {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = React.useState("");

  
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRoute = navigationRef.getCurrentRoute()?.name;
        console.log("Current Route:", currentRoute);
        setCurrentRoute(currentRoute);
      }}
    >
      <SignedOut>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </SignedOut>

      <SignedIn>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="EducationalContent" component={EducationalContent} />
          {/* social media */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="ChatWithAgent" component={ChatWithAgent} />
          <Stack.Screen name="AiChatBot" component={AiChatBot} />
        </Stack.Navigator>
      </SignedIn>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFE5E5",
    borderRadius: 16,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: Display.setHeight(6),
    marginHorizontal: 25,
  },
  tabLabel: {
    fontSize: 7,
    marginBottom: 0,
  },
});

export default Navigators;
