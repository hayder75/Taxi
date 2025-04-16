import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2A44", // Dark blue background
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  formCard: {
    width: "90%", // Slightly narrower for better balance
    maxWidth: 400, // Maximum width for larger screens
    backgroundColor: "#FFFFFF", // White card for contrast
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2D2D2D",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#2D2D2D",
    backgroundColor: "#FAFAFA",
  },
  listContainer: {
    marginTop: 10,
    backgroundColor: "#FFFFFF", // White background for the list box
    borderRadius: 10,
    maxHeight: 200, // Limit the height to make it scrollable
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  listItem: {
    padding: 14, // Padding inside each list item
    borderBottomWidth: 1, // Separator between items
    borderBottomColor: "#F0F0F0", // Light separator
  },
  listItemText: {
    fontSize: 16,
    color: "#2D2D2D",
    fontWeight: "400",
  },
  // Existing styles for MapScreen and RouteCard (unchanged)
  map: {
    flex: 1,
  },
  routeCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D2D2D",
    marginBottom: 8,
  },
  routeText: {
    fontSize: 16,
    color: "#2D2D2D",
    marginBottom: 4,
  },
  routeSubText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
