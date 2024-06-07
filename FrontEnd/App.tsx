import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

enableScreens();

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Home } from "./src/screens/Home";
import { TrashLocation } from "./src/screens/TrashLocation";
import { FireLocations } from "./src/screens/FireLocations";
import { LoginScreen } from "./src/screens/Login";
import { RegisterScreen } from "./src/screens/Register";

enum IconNames {
  WeatherSunny = "weather-sunny",
  MapMarker = "map-marker",
  Fire = "fire",
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconNames = IconNames.WeatherSunny;

          if (route.name === "Clima") {
            iconName = IconNames.WeatherSunny;
          } else if (route.name === "Lixo Plástico") {
            iconName = IconNames.MapMarker;
          } else if (route.name === "Queimadas") {
            iconName = IconNames.Fire;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Clima" component={Home} />
      <Tab.Screen name="Lixo Plástico" component={TrashLocation} />
      <Tab.Screen name="Queimadas" component={FireLocations} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "#1a1a1a" },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
