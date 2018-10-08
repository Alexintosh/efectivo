import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import web3 from "web3";
class KeyLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userKey = await AsyncStorage.getItem("userKey");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userKey ? "Main" : "Key");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <Text>Key loading screeen</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class KeyMakingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = async () => {
  //   const userKey = await AsyncStorage.getItem("userKey");

  //   // This will switch to the App screen or Auth screen and this loading
  //   // screen will be unmounted and thrown away.
  //   this.props.navigation.navigate(userKey ? "Main" : "Key");
  // };

  componentDidMount() {
    alert(web3.eth.accounts.create().address());
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <Text>Key making screeen</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    KeyLoading: KeyLoadingScreen,
    Main: MainTabNavigator,
    Key: KeyMakingScreen
  },
  {
    initialRouteName: "KeyLoading"
  }
);
