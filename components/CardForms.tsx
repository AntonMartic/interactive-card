import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { DropDown } from "./DropDown";

export function CardForms() {
  return (
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
            <View style={styles.dropdownContainer}>
              <DropDown />
              <DropDown />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextField />
          </View>
        </View>
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 162.5,
    padding: 20,
    backgroundColor: "white",
    width: "100%",
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
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
