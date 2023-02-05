import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {requestGetNaverLogin} from '../api/auth';
import NaverLogin from '@react-native-seoul/naver-login';
import EncryptedStorage from 'react-native-encrypted-storage';
import {userState} from '../atom/loginAtoms';
import {useRecoilState} from 'recoil';
import Config from 'react-native-config';
import {ACCESS_TOKEN_KEY} from '../api/core';

export function LoginScreen({navigation}) {
  const [success, setSuccessResponse] = useState();
  const [failure, setFailureResponse] = useState();
  const [profileRes, setProfileRes] = useState();
  const [user, setUser] = useRecoilState(userState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      tabBarStyle: {display: 'none'},
    });
  }, [navigation]);
  const consumerKey = Config.NAVER_APP_KEY;
  const consumerSecret = Config.NAVER_APP_SECRET_KEY;
  const appName = Config.APP_NAME;
  const serviceUrlScheme = Config.SERVICE_URL_SCHEME;

  const login = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    if (successResponse) {
      try {
        const {data} = await requestGetNaverLogin(successResponse.accessToken);
        setSuccessResponse(successResponse);
        await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        navigation.navigate('홈');
      } catch (error) {
        console.error(error);
      }
    } else {
      setFailureResponse(failureResponse);
    }
  };

  const logout = async () => {
    try {
      await NaverLogin.logout();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteToken = async () => {
    try {
      await NaverLogin.deleteToken();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
    } catch (e) {
      console.error(e);
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
