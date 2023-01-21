import { Text, View, StyleSheet } from "react-native";

export function MyPage() {
  return (
    <View style={styles.myPage}>
      <View style={styles.myPageTop}>
        <Text style={styles.nickname}>닉네임</Text>
        <Text style={styles.postCount}>게시물</Text>
      </View>
      <View style={styles.myPageContent}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myPage: {
    width: "100%",
  },
  myPageTop: {
    padding: 16
  },
  nickname: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  postCount: {
    color: "#858585",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21
  },
  myPageContent: {

  }
});
