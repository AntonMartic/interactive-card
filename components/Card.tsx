import { CardInfo } from "@/app";
import {
  cardBackgroundImages,
  cardIcons,
  cardIconsAspect,
} from "@/utils/cardImages";
import { formatCardDisplay, getCardIssuer } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
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
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const Issuer = getCardIssuer(cardInfo.cardNumber);
  const IssuerIcon = cardIcons[Issuer];
  const IssuerAspect = cardIconsAspect[Issuer];

  useEffect(() => {
    const randomCardNumber = Math.floor(
      Math.random() * cardBackgroundImages.length
    );
    setRandomBackground(cardBackgroundImages[randomCardNumber]);
  }, []);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: cardInfo.cvvFocus ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [cardInfo.cvvFocus]);

  const frontInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  if (!randomBackground) {
    return <View style={styles.cardBackground} />;
  }

  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          {
            transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            backfaceVisibility: "hidden",
          },
        ]}>
        <ImageBackground
          source={randomBackground}
          resizeMode="cover"
          style={styles.cardBackground}>
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
      </Animated.View>

      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
            backfaceVisibility: "hidden",
          },
        ]}>
        <ImageBackground
          source={randomBackground}
          resizeMode="cover"
          style={[styles.cardBackground, { transform: [{ scaleX: -1 }] }]}>
          <View
            style={[
              styles.darkerBackgorund,
              {
                transform: [{ scaleX: -1 }],
                justifyContent: "space-between",
                paddingVertical: 25,
              },
            ]}>
            <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "black",
              }}></View>
            <View
              style={{
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "right",
                  marginBottom: 5,
                }}>
                CVV
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  width: "100%",
                  height: 40,
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "right",
                    fontFamily: "monospace",
                    marginRight: 10,
                  }}>
                  {cardInfo.cvv}
                </Text>
              </View>
            </View>
            <Image
              source={IssuerIcon}
              style={{
                height: 40,
                width: "auto",
                maxWidth: 100,
                aspectRatio: IssuerAspect,
                resizeMode: "contain",
                opacity: 0.7,
                marginLeft: "auto",
                marginRight: 15,
              }}
            />
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    zIndex: 2,
    marginBottom: -122.5,
    marginTop: 20,
    position: "relative",
  },
  cardBackground: {
    width: 390,
    height: 245,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 24,
    letterSpacing: 3.5,
    fontFamily: "monospace",
  },
  cardLabels: {
    color: "lightgray",
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "monospace",
  },
  cardInfoInput: {
    color: "white",
    fontSize: 18,
    fontFamily: "monospace",
  },
});
