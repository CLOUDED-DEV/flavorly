import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function BusinessBenefitsModal({ visible, onClose }) {
  const benefits = [
    {
      title: "Save on High Fees",
      description:
        "No hidden fees or high commissions by offering affordable plans for businesses of all sizes.",
    },
    {
      title: "Drive More Bookings and Revenue",
      description:
        "Leverage AI-driven recommendations to attract more diners to your establishment.",
    },
    {
      title: "Exclusive Early Adopter Perks",
      description:
        "Get access to limited-time discounts and special offers for businesses that join early.",
    },
    {
      title: "Simple Setup, Powerful Tools",
      description:
        "Manage reservations, menus, and schedules effortlessly with user-friendly dashboards.",
    },
    {
      title: "Build a Loyal Customer Base",
      description:
        "Reward diners with loyalty programs that encourage repeat visits and positive reviews.",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Why Join Flavorly?</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Feather name="x" size={24} color="#1A1110" />
                </TouchableOpacity>
              </View>

              <View style={styles.scrollContainer}>
                <ScrollView style={styles.scrollView}>
                  {benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitContainer}>
                      <Text style={styles.benefitTitle}>{benefit.title}</Text>
                      <Text style={styles.benefitDescription}>
                        {benefit.description}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#f6f3e7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerText: {
    fontSize: Math.min(24, width * 0.06),
    fontFamily: "sofiasans-bold",
    color: "#1A1110",
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  benefitContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  benefitTitle: {
    fontSize: Math.min(18, width * 0.045),
    fontFamily: "sofiasans-bold",
    color: "#43B3AE",
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: Math.min(16, width * 0.04),
    fontFamily: "sofiasans-regular",
    color: "#1A1110",
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
  },
});
