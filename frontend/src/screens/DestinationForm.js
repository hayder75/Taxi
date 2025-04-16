import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "../styles/styles";

const taxiStations = [
  {
    name: "Bole Taxi Station",
    latitude: 9.013,
    longitude: 38.773,
    directTo: ["Bole Airport", "CMC"],
  },
  {
    name: "Piazza Taxi Station",
    latitude: 9.033,
    longitude: 38.753,
    directTo: ["Arat Kilo", "Sidist Kilo"],
  },
  {
    name: "Mexico Square Taxi",
    latitude: 9.01,
    longitude: 38.742,
    directTo: ["Meskel Square", "Lideta"],
  },
  {
    name: "Meskel Square Station",
    latitude: 9.011,
    longitude: 38.761,
    directTo: ["Mexico Square", "Bole"],
  },
  {
    name: "Sar Bet Taxi Stand",
    latitude: 9.025,
    longitude: 38.735,
    directTo: ["Lideta", "Autobis Tera"],
  },
  {
    name: "CMC Taxi Terminal",
    latitude: 9.02,
    longitude: 38.827,
    directTo: ["Bole", "Hayahulet"],
  },
  {
    name: "Megenagna Station",
    latitude: 9.021,
    longitude: 38.802,
    directTo: ["Bole", "CMC"],
  },
  {
    name: "Lideta Taxi Stop",
    latitude: 9.013,
    longitude: 38.732,
    directTo: ["Mexico Square", "Sar Bet"],
  },
  {
    name: "Kazanchis Station",
    latitude: 9.015,
    longitude: 38.767,
    directTo: ["Meskel Square", "Bole"],
  },
  {
    name: "4 Kilo Taxi Stand",
    latitude: 9.034,
    longitude: 38.763,
    directTo: ["Piazza", "Sidist Kilo"],
  },
];

// Create a list of all possible destinations from taxiStations.directTo
const allDestinations = Array.from(
  new Set(taxiStations.flatMap((station) => station.directTo))
).sort();

const DestinationForm = ({ navigation }) => {
  const [destination, setDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] =
    useState(allDestinations);

  const handleInputChange = (text) => {
    setDestination(text);
    if (text.trim() === "") {
      setFilteredDestinations(allDestinations);
    } else {
      const filtered = allDestinations.filter((dest) =>
        dest.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  };

  const handleDestinationSelect = (selectedDestination) => {
    setDestination(selectedDestination);
    navigation.navigate("MapScreen", { destination: selectedDestination });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Where Are You Going?</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your destination (e.g., Bole Airport)"
          value={destination}
          onChangeText={handleInputChange}
          placeholderTextColor="#888"
        />
        {destination.trim() !== "" && filteredDestinations.length > 0 && (
          <View style={styles.listContainer}>
            <FlatList
              data={filteredDestinations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleDestinationSelect(item)}
                >
                  <Text style={styles.listItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default DestinationForm;
