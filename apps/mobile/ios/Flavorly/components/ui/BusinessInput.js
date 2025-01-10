import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const BusinessInput = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  isDropdown = false,
  options = [],
  editable = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOptionSelect = (option) => {
    onChangeText(option);
    setShowModal(false);
  };

  const renderInput = () => {
    if (isDropdown) {
      return (
        <TouchableOpacity
          onPress={() => editable && setShowModal(true)}
          style={[
            styles.input,
            error && styles.inputError,
            !editable && styles.inputDisabled,
          ]}
        >
          <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>
          <Feather name="chevron-down" size={20} color="#1A1110" />
        </TouchableOpacity>
      );
    }

    return (
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    );
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>{label}</Text>
      {renderInput()}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={()=>setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select {label}</Text>
              </View>
              <ScrollView style={styles.optionsList}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionItem}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        value === option && styles.selectedOptionText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: height*.03,
  },
  label: {
    fontSize: 16,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: "sofiasans-light",
    color: "#1A1110",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#9B2915",
  },
  inputDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.8,
  },
  errorText: {
    color: "#9B2915",
    fontSize: 14,
    fontFamily: "sofiasans-light",
    marginTop: 4,
    marginLeft: 4,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "sofiasans-light",
    color: "#1A1110",
  },
  placeholderText: {
    color: "#A0A0A0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalHeader: {
    fontSize: 18,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    marginBottom: 10,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    textAlign: "center",
  },
  optionsList: {
    marginTop: 10,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E4D6A7",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
  },
  selectedOptionText: {
    color: "#43B3AE",
    fontFamily: "sofiasans-medium",
  },
});

export default BusinessInput;
