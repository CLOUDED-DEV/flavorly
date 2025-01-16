import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useCallback } from "react";
import { supabase } from "../utils/supabase";
import { Feather } from "@expo/vector-icons";
import CTAButton from "../components/ui/CTAButton";
import EmailInput from "../components/ui/EmailInput";
import BusinessInput from "../components/ui/BusinessInput";
import BusinessBenefitsModal from "../components/ui/BusinessBenefitsModal";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const { width } = Dimensions.get("window");

const businessTypes = [
  "Restaurant",
  "Food Truck (Coming Soon)",
  "Private Chef (Coming Soon)",
  "Pop-up Restaurant (Coming Soon)",
];

const posSystems = [
  "Toast",
  "Clover",
  "Square",
  "Stripe Terminal",
  "Other",
  "None"
];

export default function BusinessSignupScreen({ navigation }) {
  const [businessName, setBusinessName] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessTypeError, setBusinessTypeError] = useState("");
  const [posSystem, setPosSystem] = useState("");
  const [posSystemError, setPosSystemError] = useState("");
  const [formError, setFormError] = useState("");
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBusinessName = (text) => {
    setBusinessName(text);
    setBusinessNameError(text.trim() ? "" : "Business name is required");
    if (text.trim()) setFormError("");
  };

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    const isValid = emailRegex.test(text);
    setEmailError(isValid ? "" : "Please enter a valid email");
    if (isValid) setFormError("");
  };

  const validateBusinessType = (type) => {
    setBusinessType(type);
    setBusinessTypeError(type ? "" : "Business type is required");
    if (type) setFormError("");
  };

  const validatePosSystem = (system) => {
    setPosSystem(system);
    setPosSystemError(system ? "" : "POS system selection is required");
    if (system) setFormError("");
  };

  const isFormValid = () => {
    return (
      businessName.trim() &&
      !businessNameError &&
      email &&
      !emailError &&
      businessType &&
      !businessTypeError &&
      posSystem &&
      !posSystemError
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={28} color="#1A1110" />
            </TouchableOpacity>
            <Image
              source={require("../assets/flavorly_logo.png")}
              style={styles.logo}
            />
          </View>

          <BusinessInput
            label="Business Name"
            value={businessName}
            onChangeText={validateBusinessName}
            error={businessNameError}
            placeholder="Enter your business name"
          />

          <EmailInput 
            email={email}
            onChangeEmail={validateEmail}
            error={emailError}
          />

          <BusinessInput
            label="Business Type"
            value={businessType}
            onChangeText={validateBusinessType}
            error={businessTypeError}
            placeholder="Select your business type"
            isDropdown={true}
            options={businessTypes}
          />

          <BusinessInput
            label="POS System"
            value={posSystem}
            onChangeText={validatePosSystem}
            error={posSystemError}
            placeholder="Select your POS system"
            isDropdown={true}
            options={posSystems}
          />

          {formError && (
            <Text style={styles.formErrorText}>{formError}</Text>
          )}

          <StatusBar style="auto" />
        </ScrollView>

        <View style={styles.submitButtonContainer}>
          <CTAButton
            title={isSubmitting ? "Submitting..." : "Submit"}
            onPress={async () => {
              if (!isFormValid()) {
                setFormError("Please complete all required fields");
                return;
              }

              setIsSubmitting(true);
              setFormError("");

              try {
                // Only allow "Restaurant" type for now as per the edge function
                // if (businessType !== "Restaurant") {
                //   throw new Error("Only Restaurant type is currently supported");
                // }

                const { data, error } = await supabase.functions.invoke('business-signup', {
                  body: {
                    email,
                    business_name: businessName,
                    business_type: businessType,
                    pos_system: posSystem === "None" ? undefined : posSystem
                  }
                });

                if (error) throw error;

                // Show confirmation modal after successful submission
                setShowConfirmationModal(true);
              } catch (error) {
                console.error('Submission error:', error);
                setFormError(error.message || "Failed to submit. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={!isFormValid() || isSubmitting}
          />
          <View style={styles.moreInformationContainer}>
            <TouchableOpacity onPress={() => setShowBenefitsModal(true)}>
              <Text style={styles.moreInformationText}>
                Why Join Flavorly? Click Here To Learn More!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <BusinessBenefitsModal
          visible={showBenefitsModal}
          onClose={() => setShowBenefitsModal(false)}
        />

        <ConfirmationModal
          visible={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f3e7",
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "space-between",
    marginRight: -5,
  },
  logo: {
    height: 75,
    width: 75,
    resizeMode: "contain",
  },
  submitButtonContainer: {
    backgroundColor: "#f6f3e7",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingBottom: 35,
  },
  moreInformationContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  moreInformationText: {
    fontFamily: "sofiasans-bold",
    color: "#1A1110",
    fontSize: 15,
    textAlign: "center",
  },
  formErrorText: {
    color: "#9B2915",
    fontSize: 14,
    fontFamily: "sofiasans-light",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
