import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export function TextField() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const textInputField = [styles.textField, isFocused && styles.textFieldFocused];

  return <TextInput style={textInputField} onFocus={handleFocus} onBlur={handleBlur} selectionColor="#3d9cff"></TextInput>;
}

const styles = StyleSheet.create({
  textField: {
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#ced6e0",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    color: "#1a3b5d",
    outlineWidth: 0,
    outlineColor: "transparent",
  },
  textFieldFocused: {
    borderColor: "#3d9cff",
    shadowColor: "#20387559",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
