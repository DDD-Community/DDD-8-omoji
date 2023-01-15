import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "./src/screens/mainScreen";
import CustomIcon from "./src/component/CustomIcon";

const Tab = createBottomTabNavigator();
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 255, 255)",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator initialRouteName="Main"
                     screenOptions={{
                       headerShown: false,
                       tabBarShowLabel: false,
                     }}>
        <Tab.Screen name="Main" component={MainScreen} options={{
          tabBarIcon: ({ color }) => <CustomIcon name="iconMain" color={color} size={35} />,
        }} />
        <Tab.Screen name="upload" component={MainScreen} options={{
          tabBarIcon: ({ color }) => <CustomIcon name="iconUpload" color={color} size={35} />,
        }} />
        <Tab.Screen name="my" component={MainScreen} options={{
          tabBarIcon: ({ color }) => <CustomIcon name="iconMyPage" color={color} size={35} />,
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
