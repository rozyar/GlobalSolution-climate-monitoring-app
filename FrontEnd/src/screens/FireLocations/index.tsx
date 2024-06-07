import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import api from "../../helpers/api";
import { FireLocation } from "../../types/types";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export function FireLocations({ navigation }: any) {
  const [locations, setLocations] = useState<FireLocation[]>([]);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Login");
      } else {
        try {
          const response = await api.post("/auth/check-token");
          if (response.data.status !== "valid") {
            navigation.replace("Login");
          }
        } catch (error) {
          console.error("Token validation error:", error);
          navigation.replace("Login");
        }
      }
    };
    checkToken();

    api
      .get<FireLocation[]>("/fire-locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fire locations:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização de Queimadas</Text>
      <StatusBar style="dark" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.description}
            icon={require("../../assets/flame.png")}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{location.name}</Text>
                <Text style={styles.calloutDescription}>
                  {location.description}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  callout: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  },
});
