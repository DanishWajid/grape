import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { View, Container, Content, Button, Text } from "native-base";
import { CustomButton, TextButton } from "../common/button";
import FormInput from "../common/formInput/formInput";

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var ps = values.password;

  if (values.email === undefined) {
    error.email = "Email or Username is required";
  }
  if (values.password === undefined) {
    error.password = "Password is required";
  }
  if (ema && ema.length < 2 && ema !== "") {
    error.email = "Too short";
  }

  return error;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const { handleSubmit, reset, invalid, loading } = this.props;

    return (
      <Container>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content
            contentContainerStyle={{
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Field
              name="email"
              label="Username or Email"
              component={FormInput}
            />
            <Field
              name="password"
              label="Password"
              secureTextEntry={true}
              component={FormInput}
            />
            <CustomButton
              onPress={handleSubmit}
              disabled={invalid}
              title="Login"
              loading={loading}
            />

            <View style={{ marginTop: 20 }}>
              <TextButton
                small
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
                title="Forgot Password"
              />
            </View>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default reduxForm({
  form: "login-form",
  validate
})(LoginForm);
