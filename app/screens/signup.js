import React, { Component } from "react";
import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";
import { CustomHeader } from "./../components/common/customHeader";
import { connect } from "react-redux";
import {
  Icon,
  Content,
  Spinner,
  Item,
  Header,
  Input,
  Button,
  View,
  Text
} from "native-base";
import { connectAlert } from "./../components/alert";
import { HfContainer } from "./../components/container";
import { SignupMain } from "./../components/signup";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <HfContainer>
        <Content contentContainerStyle={styles.container}>
          <SignupMain {...this.props} />
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

export default SignupScreen;
