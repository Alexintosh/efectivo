import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ReceiveScreen from "../screens/ReceiveScreen";
import SendScreen from "../screens/SendScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home"
};

const ReceiveStack = createStackNavigator({
  Receive: ReceiveScreen
});

ReceiveStack.navigationOptions = {
  tabBarLabel: "Receive"
};

const SendStack = createStackNavigator({
  Send: SendScreen
});

SendStack.navigationOptions = {
  tabBarLabel: "Send"
};

export default createMaterialTopTabNavigator(
  {
    ReceiveStack,
    HomeStack,
    SendStack
  },
  {
    initialRouteName: "HomeStack"
  }
);
