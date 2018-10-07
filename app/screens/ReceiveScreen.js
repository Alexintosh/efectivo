import React from "react";
import { View, Text, ScrollView } from "react-native";
import QRCode from "react-native-qrcode";
import AddressDisplay from "../components/AddressDisplay";
import { Icon } from "expo";

export default class ReceiveScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, margin: 20 }}>My Address</Text>
        <QRCode
          value="0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
          size={250}
          bgColor="black"
          fgColor="white"
          style={{
            margin: 10
          }}
        />
        <View style={{ margin: 20 }}>
          <AddressDisplay address="0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 200
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon.Ionicons
              name="md-copy"
              size={26}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 20 }}>Copy</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon.Ionicons
              name="md-share"
              size={26}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 20 }}>Share</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
