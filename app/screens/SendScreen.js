import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput
} from "react-native";
import { Icon, BarCodeScanner, Permissions } from "expo";

export default class SendScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text>Send to Address:</Text>
          <TextInput
            style={{ fontSize: 20, height: 40 }}
            placeholder="Type or paste address here"
            // onChangeText={text => this.setState({ text })}
            // value={this.state.text}
          />
        </View>
        <View>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{ height: 300 }}
          />
          <View
            style={{
              position: "absolute",
              height: 301,
              width: "100%",
              top: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon.Ionicons
              style={{ position: "absolute" }}
              name={"ios-qr-scanner"}
              size={260}
              color={"#fff"}
            />
            <Text style={{ color: "#fff" }}>or scan QR code</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
