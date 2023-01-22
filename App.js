import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "./src/screens/MainScreen";
import CustomIcon from "./src/component/CustomIcon";
import { UploadScreen } from "./src/screens/UploadScreen";
import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MyPage } from "./src/screens/MyPage";
import "react-native-gesture-handler";


const Tab = createBottomTabNavigator();
const MyTheme = {
  dart: true,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 255, 255)",
    background: "#17171B",
  },
};
const { width, height } = Dimensions.get("window");

export default function App() {
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

  const hide = () => {
    setShowBottomSheet(false);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider style={styles.safeAreaView}>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator initialRouteName="메인"
                         screenOptions={{
                           headerStyle: {
                             backgroundColor: "#17171B",
                             elevation: 0,
                             shadowOpacity: 0,
                             borderBottomWidth: 0,
                           },
                           tabBarShowLabel: false,
                           tabBarStyle: {
                             backgroundColor: "#17171B",
                             shadowOffset: { width: 0, height: 0 },
                             shadowColor: "#666666",
                             shadowOpacity: 0.5,
                             shadowRadius: 4
                           },
                         }}>
            <Tab.Screen name="로고" component={MainScreen} options={{
              tabBarIcon: ({ color }) => <CustomIcon name="iconMain" color={color} size={35} />,
            }} />
            <Tab.Screen name="새 게시물"
                        component={UploadScreen}
                        options={{
                          tabBarIcon: ({ color }) => <CustomIcon name="iconUpload" color={color} size={35} />,
                        }}
                        listeners={{
                          tabPress: e => {
                            e.preventDefault();
                            setShowBottomSheet(true);
                          },
                        }} />
            <Tab.Screen name="마이페이지" component={MyPage} options={{
              tabBarIcon: ({ color }) => <CustomIcon name="iconMyPage" color={color} size={35} />,
            }} />
          </Tab.Navigator>
        </NavigationContainer>

        <UploadScreen show={showBottomSheet} height={height} onOuterClick={hide}></UploadScreen>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#17171B",
  },
  container: {
    flex: 1,
  },
  showButton: {
    marginTop: 48,
    padding: 16,
    backgroundColor: "mediumspringgreen",
    alignSelf: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
  },
  bottomSheetContent: {
    padding: 40,
    alignItems: "center",
  },
  bottomSheetText: {
    fontSize: 24,
    marginBottom: 80,
  },
  bottomSheetCloseButton: {
    padding: 16,
    backgroundColor: "deeppink",
    borderRadius: 8,
  },
});
