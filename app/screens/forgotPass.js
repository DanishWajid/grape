import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { HfContainer } from "./../components/container";
import { ForgotPass } from "./../components/forgotPass";
import { Content } from "native-base";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HfContainer>
        <Content contentContainerStyle={styles.container}>
          <ForgotPass {...this.props} />
        </Content>
      </HfContainer>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$darkGray",
    flex: 1
  }
});

export default ForgotPassword;
