import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BusinessInput = ({ 
  label, 
  value, 
  onChangeText, 
  error, 
  placeholder,
  isDropdown = false,
  options = [],
  editable = true
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
          style={[styles.input, error && styles.inputError, !editable && styles.inputDisabled]}
        >
          <Text style={[
            styles.dropdownText, 
            !value && styles.placeholderText
          ]}>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Feather name="x" size={24} color="#1A1110" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={[
                    styles.optionText,
                    value === option && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                  {value === option && (
                    <Feather name="check" size={20} color="#43B3AE" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f6f3e7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "sofiasans-bold",
    color: "#1A1110",
  },
  optionsList: {
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  optionText: {
    fontSize: 16,
    fontFamily: "sofiasans-regular",
    color: "#1A1110",
  },
  selectedOptionText: {
    color: "#43B3AE",
    fontFamily: "sofiasans-medium",
  },
});

export default BusinessInput;
