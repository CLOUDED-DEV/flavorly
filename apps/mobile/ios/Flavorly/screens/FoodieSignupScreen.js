import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import CTAButton from "../components/ui/CTAButton";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function FoodieSignupScreen({ navigation }) {
  const [toggleIsEnabled, setToggleIsEnabled] = useState(false);
  const [platforms, setPlatforms] = useState([
    { platform: "", username: "", error: "" },
  ]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  const socialPlatforms = ["Instagram", "TikTok", "YouTube"];

  // Preload icons
  useEffect(() => {
    setIconsLoaded(true);
  }, []);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setEmailError(emailRegex.test(text) ? "" : "Please enter a valid email");
  };

  const isFormValid = () => {
    if (!email || emailError) return false;
    if (toggleIsEnabled) {
      const hasValidPlatform = platforms.some(
        (p) => p.platform && p.username && !p.error
      );
      if (!hasValidPlatform) return false;
    }
    return true;
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram":
        return <FontAwesome name="instagram" size={24} color="#1A1110" />;
      case "TikTok":
        return <FontAwesome name="music" size={24} color="#1A1110" />;
      case "YouTube":
        return <FontAwesome name="youtube-play" size={24} color="#1A1110" />;
      default:
        return null;
    }
  };

  const toggleSwitch = () => {
    setToggleIsEnabled((previousState) => !previousState);
    if (!toggleIsEnabled) {
      setPlatforms([
        {
          platform: "",
          username: "",
          error: "",
        },
      ]);
    }
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

          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>
                Sign up as a Content Creator
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
              Create content, earn rewards, and share your dining experiences
            </Text>
          </View>

          {toggleIsEnabled && (
            <View style={styles.creatorContainer}>
              <Text style={styles.creatorTitle}>
                Your Social Media Platforms
              </Text>
              {platforms.map((item, index) => (
                <View key={index} style={styles.platformContainer}>
                  <View style={styles.platformWrapper}>
                    <View style={styles.platformRow}>
                      <TouchableOpacity
                        style={[
                          styles.platformSelect,
                          item.platform && {
                            borderColor: "#43B3AE",
                            borderWidth: 2,
                          },
                        ]}
                        onPress={() => {
                          setSelectedIndex(index);
                          setShowPlatformModal(true);
                        }}
                      >
                        <View style={styles.platformSelectContent}>
                          {item.platform && getPlatformIcon(item.platform)}
                          <Text
                            style={[
                              styles.platformSelectText,
                              item.platform &&
                                styles.platformSelectTextSelected,
                            ]}
                          >
                            {item.platform || "Select Platform"}
                          </Text>
                        </View>
                        <AntDesign name="down" size={20} color="#1A1110" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <TextInput
                      style={[
                        styles.platformInput,
                        item.error && styles.inputError,
                      ]}
                      placeholder="Enter your username"
                      placeholderTextColor="#A0A0A0"
                      value={item.username}
                      onChangeText={(text) =>
                        updatePlatform(index, "username", text)
                      }
                    />
                    {item.error && (
                      <Text style={styles.errorText}>{item.error}</Text>
                    )}
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={[
                  styles.addPlatformButton,
                  platforms.length >= socialPlatforms.length &&
                    styles.addPlatformButtonDisabled,
                ]}
                onPress={addPlatform}
                disabled={platforms.length >= socialPlatforms.length}
              >
                <AntDesign name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.addPlatformButtonText}>
                  Add Another Platform
                </Text>
              </TouchableOpacity>
            </View>
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
            title="Submit"
            onPress={() => {
              if (!isFormValid()) {
                setFormError("Please complete all required fields");
                return;
              }
              console.log("Foodie submit", {
                email,
                isContentCreator: toggleIsEnabled,
                platforms: toggleIsEnabled
                  ? platforms.filter((p) => p.platform && p.username)
                  : [],
              });
            }}
            disabled={!isFormValid()}
          />
        </View>

        {/* Hidden container to preload icons */}
        {iconsLoaded && (
          <View style={{ position: "absolute", opacity: 0 }}>
            {socialPlatforms.map((platform) => (
              <View key={platform}>{getPlatformIcon(platform)}</View>
            ))}
          </View>
        )}

        <Modal
          visible={showPlatformModal && iconsLoaded}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPlatformModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowPlatformModal(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Platform</Text>
                  {socialPlatforms.map((platform) => {
                    const isDisabled = platforms.some(
                      (p, i) => p.platform === platform && i !== selectedIndex
                    );
                    return (
                      <TouchableOpacity
                        key={platform}
                        style={[
                          styles.modalOption,
                          isDisabled && styles.modalOptionDisabled,
                        ]}
                        onPress={() => !isDisabled && selectPlatform(platform)}
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
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
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
  creatorContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  creatorTitle: {
    fontSize: 18,
    fontFamily: "sofiasans-medium",
    color: "#1A1110",
    marginBottom: 16,
  },
  platformContainer: {
    marginBottom: 16,
  },
  platformWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  platformRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  platformSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    borderColor: "transparent",
    borderWidth: 2,
  },
  platformSelectContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  platformSelectText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "sofiasans-light",
    color: "#A0A0A0",
  },
  platformSelectTextSelected: {
    color: "#1A1110",
  },
  platformInput: {
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
  addPlatformButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#43B3AE",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addPlatformButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "sofiasans-medium",
    color: "#FFFFFF",
  },
  submitButtonContainer: {
    backgroundColor: "#f6f3e7",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
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
  addPlatformButtonDisabled: {
    backgroundColor: "#A0A0A0",
    opacity: 0.5,
  },
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
