import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BenefitsModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.benefitsModalTitle}>Why Join Flavorly?</Text>
              
              <View style={styles.benefitItem}>
                <MaterialIcons name="restaurant" size={24} color="#9B2915" />
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>Discover Local Gems</Text>
                  <Text style={styles.benefitDescription}>Find and book the best local restaurants in your area</Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <MaterialIcons name="star" size={24} color="#E9B44C" />
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>Personalized For You</Text>
                  <Text style={styles.benefitDescription}>Get AI-powered recommendations based on your preferences</Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <MaterialIcons name="schedule" size={24} color="#9B2915" />
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>Loyalty Program</Text>
                  <Text style={styles.benefitDescription}>Earn perks and unique dining opportunities</Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <MaterialIcons name="loyalty" size={24} color="#9B2915" />
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>Content Creator Program</Text>
                  <Text style={styles.benefitDescription}>Receive early access to share your food reviews and unlock exclusive benefits</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.closeBenefitsButton}
                onPress={onClose}
              >
                <Text style={styles.closeBenefitsButtonText}>Got it!</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: width - 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  benefitsModalTitle: {
    fontSize: 24,
    fontFamily: "sofiasans-bold",
    color: "#1A1110",
    marginBottom: 20,
    textAlign: "center",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  benefitTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: "sofiasans-light",
    color: "#1A1110",
    opacity: 0.8,
    lineHeight: 20,
  },
  closeBenefitsButton: {
    backgroundColor: "#43B3AE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  closeBenefitsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "sofiasans-medium",
  },
});

export default BenefitsModal;
