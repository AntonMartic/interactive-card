import { useEffect, useState } from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native";

export function Card() {
  const [randomImage, setRandomImage] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    const randomCardNumber = Math.floor(Math.random() * 25) + 1;

    const imageSource = require(`../assets/cards/${randomCardNumber}.jpg`);
    setRandomImage(imageSource);
  }, []);

  if (!randomImage) {
    return <View style={styles.card} />;
  }

  return <ImageBackground source={randomImage} resizeMode="cover" style={styles.card}></ImageBackground>;
}

const styles = StyleSheet.create({
  card: {
    zIndex: 2,
    width: 390,
    height: 245,
    marginBottom: -122.5,
    backgroundColor: "lightgray",
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
});
