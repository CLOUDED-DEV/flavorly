import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

const EmailInput = ({ email, onChangeEmail, error }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Enter your email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={onChangeEmail}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
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
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#9B2915",
  },
  errorText: {
    color: "#9B2915",
    fontSize: 14,
    fontFamily: "sofiasans-light",
    marginTop: 4,
    marginLeft: 4,
  },
});

export default EmailInput;
