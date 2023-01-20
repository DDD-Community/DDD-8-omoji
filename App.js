import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "./src/screens/MainScreen";
import CustomIcon from "./src/component/CustomIcon";
import { UploadScreen } from "./src/screens/UploadScreen";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        <NavigationContainer theme={MyTheme} style={styles.navContainer}>
          <Tab.Navigator initialRouteName="Main"
                         screenOptions={{
                           headerStyle: {
                             backgroundColor: "#17171B",
                           },
                           tabBarShowLabel: false,
                           tabBarStyle: {
                             backgroundColor: "#17171B",
                           },
                         }}>
            <Tab.Screen name="Main" component={MainScreen} options={{
              tabBarIcon: ({ color }) => <CustomIcon name="iconMain" color={color} size={35} />,
            }} />
            <Tab.Screen name="upload"
                        component={UploadScreen}
                        options={{
                          tabBarIcon: ({ color }) => <CustomIcon name="iconUpload" color={color} size={35} />,
                        }}
                        listeners={{
                          tabPress: e => {
                            // Prevent default action
                            e.preventDefault();
                            setShowBottomSheet(true);
                          },
                        }} />
            <Tab.Screen name="my" component={MainScreen} options={{
              tabBarIcon: ({ color }) => <CustomIcon name="iconMyPage" color={color} size={35} />,
            }} />
          </Tab.Navigator>
        </NavigationContainer>

        <UploadScreen show={showBottomSheet} height={height} onOuterClick={hide}>
          {/*<View style={styles.bottomSheetContent}>*/}
          {/*  <Text style={styles.bottomSheetText}>Hey boys, hey girls!</Text>*/}
          {/*  <Pressable onPress={hide} style={styles.bottomSheetCloseButton}>*/}
          {/*    <Text style={styles.buttonText}>X Close</Text>*/}
          {/*  </Pressable>*/}
          {/*</View>*/}
        </UploadScreen>
      </SafeAreaProvider>
    </>

    // <NavigationContainer theme={MyTheme} style={styles.navContainer}>
    //   <Tab.Navigator initialRouteName="Main"
    //                  screenOptions={{
    //                    tabBarShowLabel: false,
    //                    tabBarStyle: {
    //                      backgroundColor: "#17171B",
    //                    },
    //                  }}>
    //     <Tab.Screen name="Main" component={MainScreen} options={{
    //       tabBarIcon: ({ color }) => <CustomIcon name="iconMain" color={color} size={35} />,
    //     }} />
    //     <Tab.Screen name="upload" component={UploadScreen} options={{
    //       tabBarIcon: ({ color }) => <CustomIcon name="iconUpload" color={color} size={35} />,
    //     }} />
    //     <Tab.Screen name="my" component={MainScreen} options={{
    //       tabBarIcon: ({ color }) => <CustomIcon name="iconMyPage" color={color} size={35} />,
    //     }} />
    //   </Tab.Navigator>
    // </NavigationContainer>
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

// const styles = StyleSheet.create({
//   navContainer: {
//     backgroundColor: "#17171B",
//   },
// });
