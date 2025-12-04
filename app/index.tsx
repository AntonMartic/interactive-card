import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { CardForms } from "@/components/CardForms";
import { useState } from "react";

export type CardInfo = {
  cardNumber: string;
  holder: string;
  month: string | "";
  year: string | "";
  cvv: string;
  cvvFocus: boolean;
};

export default function Index() {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    holder: "",
    month: "",
    year: "",
    cvv: "",
    cvvFocus: false,
  });

  console.log(cardInfo);
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Card cardInfo={cardInfo} />
        <CardForms cardInfo={cardInfo} setCardInfo={setCardInfo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#cde4f3ff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
