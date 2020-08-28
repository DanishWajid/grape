import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { KeyboardAvoidingView } from "react-native";
import { CustomButton } from "../common/button";
import { Container, Content, Form } from "native-base";
import { FormInput } from "../common/formInput";

const validate = values => {
  const error = {};
  error.email = "";
  error.fullName = "";
  error.password = "";
  error.confirmPassword = "";

  const { email, fullName, password, confirmPassword } = values;

  if (email === undefined) {
    error.email = "Email is required";
  }

  if (fullName === undefined) {
    error.fullName = "Full Name is required";
  }

  if (password === undefined) {
    error.password = "Password is required";
  }

  if (confirmPassword === undefined) {
    error.confirmPassword = "Confirm Password is required";
  }

  if (email && email.length < 2 && email !== "") {
    error.email = "Too short";
  }
  if (email && !email.includes("@") && email !== "") {
    error.email = "Enter Valid Email";
  }

  if (error.confirmPassword === "" && password !== confirmPassword) {
    error.confirmPassword = "Both passwords should match";
  }

  return error;
};

class StepOneForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, invalid, loading } = this.props;
    return (
      <Container>
        <Content padder>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Form>
              <Field name="email" label="Email" component={FormInput} />
              <Field name="fullName" label="Full Name" component={FormInput} />
              <Field
                name="password"
                label="Password"
                secureTextEntry={true}
                component={FormInput}
              />
              <Field
                name="confirmPassword"
                label="Confirm Password"
                secureTextEntry={true}
                component={FormInput}
              />
              <CustomButton
                onPress={handleSubmit}
                disabled={invalid}
                title="Next"
                loading={loading}
              />
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: "singup-stepone-form",
  validate
})(StepOneForm);
