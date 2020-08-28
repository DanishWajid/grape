import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor="#171717" barStyle="light-content" />
        <Text style={styles.grapeText}>Grape App</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    backgroundColor: "$darkGray",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  grapeText: {
    color: "$primaryColor",
    fontSize: 45,
    fontWeight: "800",
    textAlign: "center"
  }
});

export default Splash;
