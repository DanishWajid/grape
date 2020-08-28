import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Container, Content, Form } from "native-base";
import { FormInput } from "../common/formInput";
import { CustomButton } from "../common/button";

const validate = values => {
  const error = {};
  error.email = "";
  error.fullName = "";
  error.password = "";
  error.confirmPassword = "";

  const { email } = values;

  if (email === undefined) {
    error.email = "Email is required";
  }

  if (email && email.length < 2 && email !== "") {
    error.email = "Too short";
  }
  if (email && !email.includes("@") && email !== "") {
    error.email = "Enter Valid Email";
  }

  return error;
};

class StepThreeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const { handleSubmit, disabled, loading } = this.props;
    return (
      <Container>
        <Content padder>
          <Form
            style={{
              marginTop: "30%"
            }}
          >
            <Field
              name="password"
              label="New Password"
              secureTextEntry={true}
              component={FormInput}
            />
            <Field
              name="confirm_password"
              label="Confirm Password"
              secureTextEntry={true}
              component={FormInput}
            />

            <CustomButton
              onPress={handleSubmit}
              disabled={disabled}
              title="Done"
              loading={loading}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: "forgotPass-stepthree-form",
  validate
})(StepThreeForm);
