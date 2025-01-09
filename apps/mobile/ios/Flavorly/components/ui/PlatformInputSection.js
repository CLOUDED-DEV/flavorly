import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AntDesign, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const PlatformInputSection = ({
  platforms,
  onPlatformPress,
  onUpdatePlatform,
  onAddPlatform,
  maxPlatforms,
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
    <View style={styles.creatorContainer}>
      <Text style={styles.creatorTitle}>Your Social Media Platforms</Text>
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
                onPress={() => onPlatformPress(index)}
              >
                <View style={styles.platformSelectContent}>
                  {item.platform && getPlatformIcon(item.platform)}
                  <Text
                    style={[
                      styles.platformSelectText,
                      item.platform && styles.platformSelectTextSelected,
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
              style={[styles.platformInput, item.error && styles.inputError]}
              placeholder="Enter your username"
              placeholderTextColor="#A0A0A0"
              value={item.username}
              onChangeText={(text) => onUpdatePlatform(index, "username", text)}
            />
            {item.error && <Text style={styles.errorText}>{item.error}</Text>}
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={[
          styles.addPlatformButton,
          platforms.length >= maxPlatforms && styles.addPlatformButtonDisabled,
        ]}
        onPress={onAddPlatform}
        disabled={platforms.length >= maxPlatforms}
      >
        <AntDesign name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.addPlatformButtonText}>Add Another Platform</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addPlatformButtonDisabled: {
    backgroundColor: "#A0A0A0",
    opacity: 0.5,
  },
});

export default PlatformInputSection;
