import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TextField } from "@/components/TextField";

export default function Index() {
  return (
    <View style={styles.body}>
      <Card />
      <View style={styles.outerContainer}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextField />
          </View>
          <View>
            <Text style={styles.inputLabel}>Card Holders</Text>
            <TextField />
          </View>
          <View style={styles.lastInput}>
            <View style={{ flex: 2 }}>
              <Text style={styles.inputLabel}>Expiration Date</Text>
              <View style={styles.temp}></View> {/* TODO: Dropdown menus here */}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextField />
            </View>
          </View>
          <Button />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  temp: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  outerContainer: {
    paddingTop: 162.5,
    padding: 40,
    backgroundColor: "white",
  },
  inputContainer: {
    display: "flex",
    gap: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  lastInput: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
