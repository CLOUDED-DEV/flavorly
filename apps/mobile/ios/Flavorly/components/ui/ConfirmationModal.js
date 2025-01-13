import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ConfirmationModal({ visible, onClose, navigation }) {
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible && animationRef.current) {
      // Reset and play animation when modal becomes visible
      animationRef.current.reset();
      animationRef.current.play();
    }
  }, [visible]);
  const handleClose = () => {
    onClose();
    // Reset navigation stack to prevent going back
    navigation.reset({
      index: 0,
      routes: [{ name: 'WaitlistJoin' }],
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={handleClose}
              >
                <Feather name="x" size={24} color="#1A1110" />
              </TouchableOpacity>
              
              <View style={styles.contentContainer}>
                <LottieView
                  ref={animationRef}
                  source={require("../../assets/confirmationAnimation.json")}
                  autoPlay={false}
                  loop={false}
                  style={styles.animation}
                />
                <Text style={styles.title}>You're In!</Text>
                <Text style={styles.description}>
                  Welcome to Flavorly! We've added you to our waitlist and you'll be receiving a confirmation email shortly. We can't wait to help you discover amazing local dining experiences!
                </Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#f6f3e7",
    borderRadius: 20,
    padding: 25,
    width: "85%",
    maxHeight: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
    zIndex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: Math.min(28, width * 0.07),
    fontFamily: "sofiasans-bold",
    color: "#43B3AE",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: Math.min(16, width * 0.04),
    fontFamily: "sofiasans-regular",
    color: "#1A1110",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 22,
  },
});
