import { StyleSheet, Text, View } from "react-native";
import Sun02d from "../../assets/02d.svg";
import React from "react";
import { WeatherIcon } from "../../types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type ClimaCardProps = {
  day: string;
  temperature: number;
  icon: WeatherIcon;
  color: string;
};

export function ClimaCard(props: ClimaCardProps) {
  return (
    <>
      <View style={style.card}>
        <Text style={style.cardTitle}>{props.day}</Text>
        <MaterialCommunityIcons
          name={props.icon}
          size={30}
          color={props.color}
        />
        <Text style={style.cardPreview}>{Math.round(props.temperature)}°C</Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    width: 99,
    height: 129,
    backgroundColor: "rgba(255,255,255, 0.23)",
    borderRadius: 8,
    gap: 10,
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardPreview: {
    fontSize: 24,
    fontWeight: "300",
  },
});
