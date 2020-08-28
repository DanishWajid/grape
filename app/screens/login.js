import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Content, View } from "native-base";
import { HfContainer } from "./../components/container";
import { Login } from "./../components/login";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <HfContainer>
        <Content contentContainerStyle={styles.container}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <Login {...this.props} />
          </View>
        </Content>
      </HfContainer>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#171717",
    flex: 1
  }
});

export default LoginScreen;
