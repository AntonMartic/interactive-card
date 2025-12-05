import { CardInfo } from "@/app";
import {
  cardBackgroundImages,
  cardIcons,
  cardIconsAspect,
} from "@/utils/cardImages";
import { formatCardDisplay, getCardIssuer } from "@/utils/utils";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function Card({ cardInfo }: { cardInfo: CardInfo }) {
  const [randomBackground, setRandomBackground] =
    useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    const randomCardNumber = Math.floor(
      Math.random() * cardBackgroundImages.length
    );
    setRandomBackground(cardBackgroundImages[randomCardNumber]);
  }, []);

  const Issuer = getCardIssuer(cardInfo.cardNumber);
  const IssuerIcon = cardIcons[Issuer];
  const IssuerAspect = cardIconsAspect[Issuer];

  if (!randomBackground) {
    return <View style={styles.card} />;
  }

  return (
    <ImageBackground
      source={randomBackground}
      resizeMode="cover"
      style={styles.card}>
      <View style={styles.darkerBackgorund}>
        <View style={styles.cardRows}>
          <Image
            source={cardIcons.chip}
            style={{
              height: 40,
              width: "auto",
              aspectRatio: cardIconsAspect.chip,
            }}
          />
          <Image
            source={IssuerIcon}
            style={{
              height: 40,
              width: "auto",
              maxWidth: 100,
              aspectRatio: IssuerAspect,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={styles.cardRows}>
          <Text style={styles.cardNumberInput}>
            {formatCardDisplay(cardInfo.cardNumber)}
            {/*cardInfo.cardNumber || "#### #### #### ####"*/}
          </Text>
        </View>
        <View style={styles.cardRows}>
          <View>
            <Text style={styles.cardLabels}>Card Holder</Text>
            <Text style={styles.cardInfoInput}>
              {cardInfo.holder || "FULL NAME"}
            </Text>
          </View>
          <View style={{ minWidth: 60 }}>
            <Text style={styles.cardLabels}>Expires</Text>
            <Text style={styles.cardInfoInput}>
              {cardInfo.month || "MM"}/{cardInfo.year || "YY"}
            </Text>
          </View>
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
    display: "flex",
    justifyContent: "space-between",
  },
  cardRows: {
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumberInput: {
    color: "white",
    fontSize: 26,
    letterSpacing: 4,
  },
  cardLabels: {
    color: "lightgray",
    fontSize: 12,
    marginBottom: 5,
  },
  cardInfoInput: {
    color: "white",
    fontSize: 18,
  },
});
