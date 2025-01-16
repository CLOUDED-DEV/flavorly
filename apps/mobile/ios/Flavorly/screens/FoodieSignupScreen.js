import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import CTAButton from "../components/ui/CTAButton";
import EmailInput from "../components/ui/EmailInput";
import BenefitsModal from "../components/ui/BenefitsModal";
import PlatformSelectionModal from "../components/ui/PlatformSelectionModal";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import PlatformInputSection from "../components/ui/PlatformInputSection";
import { supabase } from "../utils/supabase";
const { width } = Dimensions.get("window");

export default function FoodieSignupScreen({ navigation }) {
  const [toggleIsEnabled, setToggleIsEnabled] = useState(false);
  const [platforms, setPlatforms] = useState([
    { platform: "", username: "", error: "" },
  ]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  const socialPlatforms = ["Instagram", "TikTok", "YouTube", "X"];

  // Preload icons
  useEffect(() => {
    setIconsLoaded(true);
  }, []);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    const isValid = emailRegex.test(text);
    setEmailError(isValid ? "" : "Please enter a valid email");
    if (isValid) {
      setFormError(""); // Clear form error when email becomes valid
    }
  };

  const isFormValid = () => {
    // Check email validity first
    if (!email || emailError) return false;
    
    // If content creator mode is enabled, check platform requirements
    if (toggleIsEnabled) {
      const hasValidPlatform = platforms.some(
        (p) => p.platform && p.username && !p.error
      );
      return hasValidPlatform;
    }
    
    // If not in content creator mode, only email is required
    return true;
  };

  const toggleSwitch = () => {
    setToggleIsEnabled((previousState) => {
      if (!previousState) {
        // Turning on content creator mode
        setPlatforms([
          {
            platform: "",
            username: "",
            error: "",
          },
        ]);
      } else {
        // Turning off content creator mode
        setFormError(""); // Clear any form errors
        setPlatforms([{ platform: "", username: "", error: "" }]); // Reset platforms
      }
      return !previousState;
    });
  };

  const addPlatform = () => {
    setPlatforms([
      ...platforms,
      {
        platform: "",
        username: "",
        error: "",
      },
    ]);
  };

  const updatePlatform = (index, field, value) => {
    const updatedPlatforms = [...platforms];
    const platform = updatedPlatforms[index];

    if (field === "username") {
      platform.error = value.trim() ? "" : "Username is required";
    }

    platform[field] = value;
    setPlatforms(updatedPlatforms);

    // Clear form error when user fixes issues
    if (platforms.every((p) => !p.platform || (p.platform && p.username))) {
      setFormError("");
    }
  };

  const selectPlatform = (platform) => {
    if (selectedIndex === null) return;

    // Don't allow duplicate platforms
    if (
      platform &&
      platforms.some((p, i) => p.platform === platform && i !== selectedIndex)
    ) {
      return;
    }

    updatePlatform(selectedIndex, "platform", platform);
    setShowPlatformModal(false);
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

          <EmailInput 
            email={email}
            onChangeEmail={validateEmail}
            error={emailError}
          />

          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>
                Sign up for our Content Creator program
              </Text>
              <Switch
                trackColor={{ false: "#E4D6A7", true: "#43B3AE" }}
                thumbColor={toggleIsEnabled ? "#f6f3e7" : "#FFFFFF"}
                ios_backgroundColor="#E4D6A7"
                onValueChange={toggleSwitch}
                value={toggleIsEnabled}
                style={styles.switch}
              />
            </View>
            <Text style={styles.switchDescription}>
              Earn rewards and share your dining experiences from other platforms
            </Text>
          </View>

          {toggleIsEnabled && (
            <PlatformInputSection
              platforms={platforms}
              onPlatformPress={(index) => {
                setSelectedIndex(index);
                setShowPlatformModal(true);
              }}
              onUpdatePlatform={updatePlatform}
              onAddPlatform={addPlatform}
              maxPlatforms={socialPlatforms.length}
            />
          )}

          {formError && (
            <Text style={[styles.errorText, styles.formErrorText]}>
              {formError}
            </Text>
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
                const { data, error } = await supabase.functions.invoke('waitlist-signup', {
                  body: {
                    email,
                    creator_interest: toggleIsEnabled,
                    social_media: toggleIsEnabled ? platforms
                      .filter(p => p.platform && p.username)
                      .map(p => ({
                        platform: p.platform,
                        handle: p.username
                      })) : undefined
                  }
                });

                if (error) throw error;

                // Show confirmation modal after successful submission
                setShowConfirmationModal(true);
              } catch (error) {
                // Log the full error object to see its structure
                // console.error('Submission error:', JSON.stringify(error, null, 2));
                setFormError("Failed to submit. Please make sure this email is not already registered.");

              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={!isFormValid() || isSubmitting}
          />
          <View style={styles.moreInformationContainer}>
            <TouchableOpacity onPress={() => setShowBenefitsModal(true)}>
              <Text style={styles.moreInformationText}>Why Join Flavorly? Click Here To Learn More!</Text>
            </TouchableOpacity>
          </View>
        </View>


        <PlatformSelectionModal
          visible={showPlatformModal && iconsLoaded}
          onClose={() => setShowPlatformModal(false)}
          onSelect={selectPlatform}
          platforms={socialPlatforms}
          selectedPlatforms={platforms.map(p => p.platform)}
          currentIndex={selectedIndex}
        />

        <BenefitsModal
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
  switchContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontSize: Math.min(16, width*0.04),
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
  },
  switchDescription: {
    fontSize: 14,
    fontFamily: "sofiasans-light",
    color: "#1A1110",
    opacity: 0.8,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.1 }],
  },
  submitButtonContainer: {
    backgroundColor: "#f6f3e7",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingBottom: 35
  },
  moreInformationContainer: {
    // borderWidth: 2,
    marginTop: 20,
    alignItems: "center"
  },
  moreInformationText: {
    fontFamily: "sofiasans-bold", 
    color: "#1A1110",
    fontSize: 15,
    textAlign: "center"
  },
  errorText: {
    color: "#9B2915",
    fontSize: 14,
    fontFamily: "sofiasans-light",
    marginTop: 4,
    marginLeft: 4,
  },
  formErrorText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
