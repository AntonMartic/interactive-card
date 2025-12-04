import { StyleSheet, Text, View } from "react-native";

import { CardInfo } from "@/app";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { filterNonDigits, getMonths, getYears } from "@/utils/helpers";
import { Dispatch, SetStateAction } from "react";
import { DropDown } from "./DropDown";

export type UpdateHandler = (
  field: keyof CardInfo,
  value: string | boolean
) => void;

export function CardForms({
  cardInfo,
  setCardInfo,
}: {
  cardInfo: CardInfo;
  setCardInfo: Dispatch<SetStateAction<CardInfo>>;
}) {
  const updateCardInfo: UpdateHandler = (field, value) => {
    setCardInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>Card Number</Text>
          <TextField
            onChangeText={(text) => updateCardInfo("cardNumber", text)}
            value={cardInfo.cardNumber}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Card Holders</Text>
          <TextField
            onChangeText={(text) =>
              updateCardInfo("holder", text.toUpperCase())
            }
            value={cardInfo.holder}
          />
        </View>
        <View style={styles.lastInput}>
          <View style={{ flex: 2 }}>
            <Text style={styles.inputLabel}>Expiration Date</Text>
            <View style={styles.dropdownContainer}>
              <DropDown
                data={getMonths()}
                selectedValue={cardInfo.month}
                onValueChange={(value) => updateCardInfo("month", value)}
              />
              <DropDown
                data={getYears()}
                selectedValue={cardInfo.year}
                onValueChange={(value) => updateCardInfo("year", value)}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextField
              onChangeText={(text) =>
                updateCardInfo("cvv", filterNonDigits(text))
              }
              onFocus={() => updateCardInfo("cvvFocus", true)}
              onBlur={() => updateCardInfo("cvvFocus", false)}
              value={cardInfo.cvv}
              maxLength={4}
            />
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
