import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BellRinging, CaretDown, MapPin } from "phosphor-react-native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ClimaCard } from "../../components/ClimaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ForecastResponse, WeatherData, WeatherIcon } from "../../types/types";
import iconMapper from "../../helpers/iconMapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../helpers/api";
import { StatusBar } from "expo-status-bar";

export function Home({ navigation }: any) {
  const [greeting, setGreeting] = useState<string>("");
  const [gradientColors, setGradientColors] = useState<string[]>([]);
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [maxTemp, setMaxTemp] = useState<number | null>(null);
  const [minTemp, setMinTemp] = useState<number | null>(null);
  const [currentIcon, setCurrentIcon] = useState<WeatherIcon | null>(null);
  const [currentIconColor, setCurrentIconColor] = useState<string>("#FFFFFF");
  const [user, setUser] = useState<{ nome: string }>();

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

    const hour: number = new Date().getHours();
    console.log(hour);
    if (hour >= 6 && hour < 12) {
      setGreeting("Bom dia");
      setGradientColors(["#4E68A1", "#718EC7", "#A1C7FF"]);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Boa tarde");
      setGradientColors(["#292A4E", "#715C77", "#C75C2E"]);
    } else {
      setGreeting("Boa noite");
      setGradientColors(["#0D1440", "#1E3D5C", "#274060"]);
    }

    axios
      .get<ForecastResponse>(
        `https://api.openweathermap.org/data/2.5/forecast?q=Sao%20Paulo&units=metric&appid=e78524d686bc08ef779127bba924e88c`
      )
      .then((response) => {
        const forecastData = response.data.list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 7);
        setForecast(forecastData);

        const todayWeather = response.data.list[0];
        const iconData = iconMapper(todayWeather.weather[0].icon);
        console.log(todayWeather);
        setCurrentTemp(todayWeather.main.temp);
        setMaxTemp(todayWeather.main.temp_max);
        setMinTemp(todayWeather.main.temp_min);
        setCurrentIcon(iconData.icon);
        setCurrentIconColor(iconData.color);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });

    async function getName() {
      const name = await AsyncStorage.getItem("name");
      if (name) {
        setUser({ nome: name });
      }
    }

    getName();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    );
  }
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {greeting === "Boa tarde" || greeting === "Boa noite" ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <MapPin color="#fff" size={32} />
              <Text style={styles.headerLeftText}>São Paulo</Text>
              <CaretDown color="#fff" size={32} />
            </View>
            <BellRinging color="#fff" size={32} />
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTextUser}>
              {greeting}, {user?.nome}
            </Text>
            {currentIcon && (
              <MaterialCommunityIcons
                name={currentIcon}
                size={200}
                color={currentIconColor}
              />
            )}

            {currentTemp !== null && (
              <Text style={styles.infoTextClima}>
                {Math.round(currentTemp)}°C
              </Text>
            )}

            {maxTemp !== null && minTemp !== null && (
              <Text style={styles.infoTextMaxMin}>
                Max.: {Math.round(maxTemp)}° Min.: {Math.round(minTemp)}°
              </Text>
            )}
          </View>
        </View>

        <View style={styles.climaSemanal}>
          <Text style={styles.climaSemanalText}>
            Previsão para os proximos 7 dias
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {forecast.map((day, index) => {
              const iconData = iconMapper(day.weather[0].icon);
              return (
                <ClimaCard
                  key={index}
                  day={new Date(day.dt * 1000).toLocaleDateString("pt-BR", {
                    weekday: "short",
                  })}
                  temperature={day.main.temp}
                  icon={iconData.icon}
                  color={iconData.color}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 35,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLeftText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  info: {
    paddingVertical: 70,
    alignItems: "center",
    gap: 10,
  },
  infoTextUser: {
    fontSize: 32,
    fontWeight: "300",
    color: "#fff",
  },
  infoTextClima: {
    fontSize: 100,
    fontWeight: "300",
    color: "#fff",
  },
  infoTextMaxMin: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  climaSemanal: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  climaSemanalText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
