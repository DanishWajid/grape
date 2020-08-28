import React, { Component } from "react";
import PropTypes from "prop-types";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { View, Button, Text } from "native-base";
import styles from "./styles";
import LoginForm from "./loginForm";
import { loginUser } from "../../actions/login";
import { connect } from "react-redux";
import { connectAlert } from "./../alert";
import { TextButton } from "../common/button";
import { login } from "./../../services/authService";

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.any
  };

  state = {
    loading: false
  };

  handleFormSubmission = async values => {
    this.setState({ loading: true });
    try {
      const { email, password } = values;
      const { data } = await login(email, password);
      this.props.dispatch(loginUser(data));
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        const errorMessage =
          error.response.data.error || error.response.data || error.message;
        this.props.alertWithType("error", "Error", errorMessage);
      } else {
        const errorMessage = error.message || error.response.data;
        this.props.alertWithType("error", "Error", errorMessage);
      }

      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.appName}>Grape</Text>
        </View>

        <View style={styles.fieldsView}>
          <LoginForm
            {...this.props}
            onSubmit={this.handleFormSubmission}
            loading={loading}
          />
        </View>
        <HideWithKeyboard>
          <TextButton
            onPress={() => this.props.navigation.navigate("Signup")}
            title="Sign Up"
          />
        </HideWithKeyboard>
      </View>
    );
  }
}

Login.propTypes = {
  children: PropTypes.any,
  alertWithType: PropTypes.func
};

const mapStateToProps = state => {
  const currentUser = state.login.currentUser;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(connectAlert(Login));
