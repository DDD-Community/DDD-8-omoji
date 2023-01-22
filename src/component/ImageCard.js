import * as React from "react";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const data = [
  { src: require("../../assets/mock-images/image01.png") },
  { src: require("../../assets/mock-images/image02.png") },
  { src: require("../../assets/mock-images/image03.png") },
  { src: require("../../assets/mock-images/image04.png") },
  { src: require("../../assets/mock-images/image05.png") },
];

export function ImageCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const linearHeight = cardHeight / 3.3;

  const onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setCardWidth(() => width);
    setCardHeight(() => height);
    console.log("onLayout", cardWidth, cardHeight);
  };

  const onPress = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    if (linearHeight > locationY) {
      console.log("detail");
    } else {
      if (cardWidth / 2 < locationX) {
        console.log("right");
      } else {
        console.log("left");
      }
      setCurrentIndex(prev => cardWidth / 2 < locationX ? prev + 1 : prev - 1);
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Pressable style={styles.pressableContainer} onPress={onPress}>
        <Image
          style={{ width: 358, height: 638 }}
          source={data[currentIndex]?.src}
        />
        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}
                        locations={[0.5, 1]}
                        colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0)"]}
                        style={[styles.linearGradientLayer, { height: linearHeight }]}>
          <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            flexDirection: "column",
            width: "100%",
            padding: 20,
          }}>
            <View style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
              {data.map((item, i) => <View key={i} style={[styles.slide, { backgroundColor: currentIndex === i ? "#FFFFFF" : "#8F8F8F" }]}></View>)}
            </View>
            <Text style={{ fontSize: 21, fontWeight: "700", marginTop: 32 }}>오늘 데이트 하는데 어떤 스타일이 제일 괜찮나요?</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  pressableContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  linearGradientLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100$%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  slide: {
    width: "18%",
    height: 4,
    borderRadius: 20,
  },
});
