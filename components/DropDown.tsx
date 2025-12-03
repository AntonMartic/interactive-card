import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet } from "react-native";

export type DropDownData = {
  label: string;
  value: string | null;
};
export function DropDown({ data }: { data: DropDownData[] }) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const isPlaceholderDisabled = selectedValue !== null;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const dropDown = [styles.container, isFocused && styles.containerFocused];

  return (
    <Picker style={dropDown} onFocus={handleFocus} onBlur={handleBlur} selectionColor="#3d9cff" selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
      {data.map((item, index) => {
        const isPlaceholder = item.value == null;
        const disabled = isPlaceholder && isPlaceholderDisabled;
        return <Picker.Item key={item.label + index} label={item.label.toString()} value={item.value} enabled={!disabled} />;
      })}
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  containerFocused: {
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
