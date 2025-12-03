import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export type TextFieldProps = {
  onChangeText: (text: string) => void;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function TextField({
  onChangeText,
  value,
  onFocus = () => {},
  onBlur = () => {},
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  const textInputField = [
    styles.textField,
    isFocused && styles.textFieldFocused,
  ];

  return (
    <TextInput
      style={textInputField}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      onChangeText={onChangeText}></TextInput>
  );
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
