import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const width = Dimensions.get("window").width

export default function OptionCardComponent({ title, description, onPress, isSelected }) {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.optionCard, isSelected && styles.selectedCard]}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription} >{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    width: width*.95,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 4,
  },
  optionTitle: {
    fontSize: 24,
    fontFamily: "BlackHanSans-Regular",
    color: "#1A1110",
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    fontFamily: "sofiasans-regular",
    color: "#1A1110",
  },
  selectedCard: {
    backgroundColor: "#e6f7ff", // Example selected color
    borderColor: "#007bff",
    borderWidth: .5,  }
});
