import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

const FormCard = ({
  destination,
  setDestination,
  findTaxiRoute,
  isLoading,
}) => {
  return (
    <View style={styles.formCard}>
      <Text style={styles.title}>Find Your Taxi</Text>
      <TextInput
        style={styles.input}
        placeholder="Where are you heading? (e.g., Bole Airport)"
        value={destination}
        onChangeText={setDestination}
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={findTaxiRoute}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Searching..." : "Find Taxi Route"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCard;
