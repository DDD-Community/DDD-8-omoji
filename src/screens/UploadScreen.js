import * as React from "react";
import { Animated, Button, Easing, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageUploader } from "../component/ImageUploader";

const DEFAULT_HEIGHT = 300;

function useAnimatedBottom(show: boolean, height: number = DEFAULT_HEIGHT) {
  const animatedValue = React.useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  React.useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        // Accelerate then decelerate - https://cubic-bezier.com/#.28,0,.63,1
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false, // 'bottom' is not supported by native animated module
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        // Accelerate - https://easings.net/#easeInCubic
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
}

interface Props {
  children: React.ReactNode;
  show: boolean;
  height?: number;
  onOuterClick?: () => void;
}

export function UploadScreen({
                               children,
                               show,
                               height = DEFAULT_HEIGHT,
                               onOuterClick,
                             }: Props) {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const bottom = useAnimatedBottom(show, screenHeight);

  return (
    <Animated.View style={[styles.uploadScreen, { height: screenHeight, bottom }]}>
      <View style={[styles.uploadScreenContainer, {
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
      }]}>
        <View style={styles.uploadScreenHeader}>
          <Pressable>
            <Text style={styles.button} onPress={onOuterClick}>뒤로</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.button} onPress={onOuterClick}>완료</Text>
          </Pressable>
        </View>
        <ImageUploader></ImageUploader>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  uploadScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    // Here you can set a common style for all bottom sheets, or nothing if you
    // want different designs
    backgroundColor: "#17171B",
    borderRadius: 16,
  },
  uploadScreenContainer: {
    height: "100%",
    alignItems: "center",
  },
  uploadScreenHeader: {
    height: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 18,
    paddingBottom: 16,
    paddingLeft: 18,
  },
  button: {
    color: "#8F8F8F",
    fontSize: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    rowGap: 8,
    paddingTop: 25,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 25,
  },
  uploadButton: {
    width: "30%",
    height: 96
  },
  openPicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
