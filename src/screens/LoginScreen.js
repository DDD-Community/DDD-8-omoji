import { Alert, Button, Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import CustomIcon from "../component/CustomIcon";
import { requestGetNaverLogin } from "../api/auth";
import { WebView } from "react-native-webview";
import InAppBrowser from "react-native-inappbrowser-reborn";

export function LoginScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);
  const [showWebView, setShowWebView] = useState();
  const [naverLoginView, setNaverLoginView] = useState(false);

  const onLogin = async () => {
    // console.log(res);
    try {
      const res = await requestGetNaverLogin();
      console.log("response", res.request.responseURL);
      const url = res.request.responseURL;
      // setNaverLoginView(() => res.data);
      // setShowWebView(() => true);
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
        // await this.sleep(800);
        Alert.alert(JSON.stringify(result))
      } else {
        Linking.openURL(url);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const renderWebView = () => {
    return (<WebView
      originWhitelist={["*"]}
      source={{ html: naverLoginView }}
    />);
  };

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>둘러보기</Text>
      </Pressable>
      <Pressable style={styles.loginContainer}>
        <Text style={styles.text} onPress={onLogin}>네이버로 시작하기</Text>
      </Pressable>
      {showWebView && renderWebView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 31,
  },
  loginContainer: {
    flexDirection: "row",
    backgroundColor: "#03C75A",
    height: 56,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  text: {
    flex: 1,
    color: "#FFFFFF",
    textAlign: "center",
    alignSelf: "center",
  },
});
