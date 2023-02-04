import React, {useEffect} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from './src/screens/MainScreen';
import CustomIcon from './src/component/CustomIcon';
import {UploadScreen} from './src/screens/UploadScreen';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyPageScreen from './src/screens/MyPageScreen';
import 'react-native-gesture-handler';
import {LoginScreen} from './src/screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import SplashScreen from 'react-native-splash-screen';
import PreviewScreen from './src/screens/PreviewScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import PostScreen from './src/screens/PostScreen';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const LOGIN_TOKEN_KEY = 'LOGIN_TOKEN_KEY';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef();

const NavigationContainerTheme = {
  dart: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 255, 255)',
    background: '#17171B',
  },
};

const NavigatorScreenOptions = {
  headerStyle: {
    backgroundColor: '#17171B',
    borderBottomWidth: 0,
  },
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#17171B',
    shadowColor: '#666666',
    shadowRadius: 4,
  },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      EncryptedStorage.clear();
      const token = await EncryptedStorage.getItem(LOGIN_TOKEN_KEY);
      setIsLoggedIn(!!token);
      navigationRef.current?.navigate(token ? '홈' : '로그인');
      console.log(token, !!token);
    };
    getTokenAndRefresh();
    SplashScreen.hide();
  }, []);

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="메인"
        screenOptions={NavigatorScreenOptions}>
        <>
          <Tab.Screen
            name="메인"
            component={MainScreen}
            options={{
              tabBarIcon: ({color}) => (
                <CustomIcon name="iconMain" color={color} size={35} />
              ),
            }}
          />
          <Tab.Screen
            name="새 게시물"
            component={UploadScreen}
            options={{
              tabBarIcon: ({color}) => (
                <CustomIcon name="iconUpload" color={color} size={35} />
              ),
            }}
            listeners={{
              tabPress: e => {
                e.preventDefault();
                setShowBottomSheet(true);
              },
            }}
          />
          <Tab.Screen
            name="마이페이지"
            component={MyPageScreen}
            options={{
              tabBarIcon: ({color}) => (
                <CustomIcon name="iconMyPage" color={color} size={35} />
              ),
            }}
          />
        </>
      </Tab.Navigator>
    );
  };

  const hide = () => {
    setShowBottomSheet(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider style={styles.safeAreaView}>
          <NavigationContainer
            theme={NavigationContainerTheme}
            ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                ...NavigatorScreenOptions,
                headerShown: false,
                headerMode: 'none',
              }}>
              <Stack.Screen name="홈" component={HomeTabs} />
              <Stack.Screen name="로그인" component={LoginScreen} />
              <Stack.Screen name="둘러보기" component={PreviewScreen} />
              <Stack.Screen name="게시글" component={PostScreen} />
            </Stack.Navigator>
          </NavigationContainer>

          <UploadScreen show={showBottomSheet} onOuterClick={hide} />
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#17171B',
  },
  container: {
    flex: 1,
  },
  showButton: {
    marginTop: 48,
    padding: 16,
    backgroundColor: 'mediumspringgreen',
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
  },
  bottomSheetContent: {
    padding: 40,
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 24,
    marginBottom: 80,
  },
  bottomSheetCloseButton: {
    padding: 16,
    backgroundColor: 'deeppink',
    borderRadius: 8,
  },
});
