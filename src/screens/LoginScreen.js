import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useLayoutEffect} from 'react';
import {requestGetNaverLogin} from '../api/auth';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import NaverLogin from '@react-native-seoul/naver-login';

export function LoginScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      tabBarStyle: {display: 'none'},
    });
  }, [navigation]);
  const consumerKey = 'PLY4vjldHD_7JiBLOTRk';
  const consumerSecret = 'fhdrFDOJGZ';
  const appName = 'omoji';
  const serviceUrlScheme = 'omoji';

  const login = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    console.log(failureResponse, successResponse);
    // setSuccessResponse(successResponse);
    // setFailureResponse(failureResponse);
  };

  const logout = async () => {
    try {
      await NaverLogin.logout();
      // setSuccessResponse(undefined);
      // setFailureResponse(undefined);
      // setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteToken = async () => {
    try {
      await NaverLogin.deleteToken();
      // setSuccessResponse(undefined);
      // setFailureResponse(undefined);
      // setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const onLogin = async () => {
    try {
      const res = await requestGetNaverLogin();
      console.log('response', res.responseURL);
      const url = res.request.responseURL;
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
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // await this.sleep(800);
        Alert.alert(JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          style={styles.toMainText}
          onPress={() => navigation.navigate('둘러보기')}>
          둘러보기
        </Text>
      </Pressable>
      <View>
        <Text style={styles.text}>오늘 모입지?</Text>
        <Text style={styles.text}>오모지 입니다.</Text>
        <Image
          style={styles.image}
          source={require('../../assets/loginImage.png')}
        />
      </View>
      <View>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText} onPress={deleteToken}>
            토근 제거
          </Text>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText} onPress={logout}>
            로그아웃
          </Text>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText} onPress={login}>
            네이버로 시작하기
          </Text>
        </Pressable>
        <Pressable>
          <Text style={styles.signUpText}>네이버로 회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 31,
  },
  toMainText: {
    color: '#FFFFFF',
    padding: 16,
    alignSelf: 'flex-end',
  },
  loginContainer: {
    flexDirection: 'row',
    backgroundColor: '#03C75A',
    height: 56,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  image: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    marginTop: 76,
  },
  loginText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  signUpText: {
    opacity: 0,
    color: '#03C75A',
    margin: 16,
    alignSelf: 'flex-end',
  },
});
