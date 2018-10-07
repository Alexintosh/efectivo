import React from "react";
import { Text, FlatList, View, ScrollView } from "react-native";
import strings from "../strings.js";
import colors from "../colors.js";
import moment from "moment";
import AddressDisplay from "../components/AddressDisplay.js";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200
          }}
        >
          <View>
            <Text>{strings.balance}</Text>
            <Text style={{ fontSize: 48 }}>$13.45</Text>
          </View>
        </View>
        <FlatList
          style={{
            borderTopColor: colors.grey,
            borderTopWidth: 1
          }}
          data={[
            {
              received: true,
              timestamp: 1538803106972,
              amount: 13.45,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            },
            {
              received: false,
              timestamp: 1538803006962,
              amount: 1.54,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            },
            {
              received: true,
              timestamp: 1538803106972,
              amount: 13.45,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            },
            {
              received: false,
              timestamp: 1538803006962,
              amount: 1.54,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            },
            {
              received: true,
              timestamp: 1538803106972,
              amount: 13.45,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            },
            {
              received: false,
              timestamp: 1538803006962,
              amount: 1.54,
              counterparty: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
            }
          ]}
          renderItem={({
            item: { received, timestamp, amount, counterparty },
            index
          }) => (
            <View
              style={{
                borderBottomColor: colors.grey,
                borderBottomWidth: 1,
                padding: 10
              }}
            >
              <View style={{ paddingBottom: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>{received ? strings.received : strings.sent}</Text>
                  <Text>{moment(timestamp).calendar()}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {received ? (
                      <Text
                        style={{
                          color: colors.green,
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        +{" "}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: colors.red,
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        -{" "}
                      </Text>
                    )}
                    ${amount}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 10, width: 50 }}>
                  {received ? strings.from : strings.to}
                </Text>
                {counterparty && <AddressDisplay address={counterparty} />}
              </View>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}
