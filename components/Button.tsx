import { StyleSheet, Text, View } from "react-native";

export function Button() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Submit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#2364d2",
    shadowColor: "#2364d2",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  label: {
    fontSize: 22,
    fontWeight: 500,
    color: "#FFFFFF",
  },
});
