import { cardBackgroundImages } from "@/utils/cardImages";
import { useEffect, useState } from "react";
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native";

const chip = require("../assets/cards/chip.png");
const CHIP_ASPECT_RATIO = 101 / 82;

export function Card() {
  const [randomBackground, setRandomBackground] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    const randomCardNumber = Math.floor(Math.random() * cardBackgroundImages.length);
    setRandomBackground(cardBackgroundImages[randomCardNumber]);
  }, []);

  if (!randomBackground) {
    return <View style={styles.card} />;
  }

  return (
    <ImageBackground source={randomBackground} resizeMode="cover" style={styles.card}>
      <View style={styles.darkerBackgorund}>
        <View style={styles.cardTypeContainer}>
          <Image source={chip} style={styles.chip}></Image>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    zIndex: 2,
    width: 390,
    height: 245,
    marginBottom: -122.5,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#20387559",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    overflow: "hidden",
  },
  darkerBackgorund: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  cardTypeContainer: {
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    width: 60,
    height: "auto",
    aspectRatio: CHIP_ASPECT_RATIO,
  },
});
