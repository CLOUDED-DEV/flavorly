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
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PlatformSelectionModal = ({ 
  visible, 
  onClose, 
  onSelect, 
  platforms, 
  selectedPlatforms,
  currentIndex 
}) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram":
        return <FontAwesome name="instagram" size={24} color="#1A1110" />;
      case "TikTok":
        return <FontAwesome6 name="tiktok" size={24} color="#1A1110" />;
      case "YouTube":
        return <FontAwesome name="youtube-play" size={24} color="#1A1110" />;
      case "X":
        return <FontAwesome6 name="x-twitter" size={24} color="#1A1110" />;
      default:
        return null;
    }
  };

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
              <Text style={styles.modalTitle}>Select Platform</Text>
              {platforms.map((platform) => {
                const isDisabled = selectedPlatforms.some(
                  (p, i) => p === platform && i !== currentIndex
                );
                return (
                  <TouchableOpacity
                    key={platform}
                    style={[
                      styles.modalOption,
                      isDisabled && styles.modalOptionDisabled,
                    ]}
                    onPress={() => !isDisabled && onSelect(platform)}
                    disabled={isDisabled}
                  >
                    <View style={styles.modalOptionContent}>
                      {getPlatformIcon(platform)}
                      <Text
                        style={[
                          styles.modalOptionText,
                          isDisabled && styles.modalOptionTextDisabled,
                        ]}
                      >
                        {platform}
                      </Text>
                    </View>
                    {isDisabled && (
                      <Text style={styles.modalOptionDisabledText}>
                        Already selected
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
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
  modalTitle: {
    fontSize: 18,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E4D6A7",
  },
  modalOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
  },
  modalOptionDisabled: {
    opacity: 0.5,
  },
  modalOptionTextDisabled: {
    color: "#A0A0A0",
  },
  modalOptionDisabledText: {
    fontSize: 12,
    fontFamily: "sofiasans-light",
    color: "#9B2915",
    marginTop: 4,
    marginLeft: 36,
  },
});

export default PlatformSelectionModal;
