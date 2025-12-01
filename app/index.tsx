import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { CardForms } from "@/components/CardForms";

export default function Index() {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Card />
        <CardForms />
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
