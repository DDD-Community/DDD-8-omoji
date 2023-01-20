import { Text, View, StyleSheet } from "react-native";

export function MainScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.baseText}>main screen</Text>
      <Text>main screen</Text>
      <Text>main screen</Text>
      <Text>main screen</Text>
      <Text>main screen</Text>
      <Text>main screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  baseText: {
    fontFamily: "Cochin",
    color: "#FFF",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
