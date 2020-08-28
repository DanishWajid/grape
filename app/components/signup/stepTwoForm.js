import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import { Field, reduxForm } from "redux-form";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { CustomButton } from "../common/button";
import { View, Container, Content, Thumbnail, Form } from "native-base";
import { FormInput } from "../common/formInput";
import { FormTextarea } from "../common/formTextarea";

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;

  if (values.email === undefined) {
    error.email = "Required is required";
  }
  if (values.password === undefined) {
    error.password = "Password is required";
  }
  if (ema && ema.length < 2 && ema !== "") {
    error.email = "Too short";
  }
  if (ema && !ema.includes("@") && ema !== "") {
    error.email = "Enter Valid Email";
  }

  return error;
};

class StepTwoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      photo: null
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
        this.props.onImageUpload(response);
      }
    });
  };

  render() {
    const { handleSubmit, invalid, loading } = this.props;
    const { photo } = this.state;

    return (
      <Container>
        <Content padder>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
              padding: 10
            }}
          >
            <TouchableOpacity onPress={this.handleChoosePhoto}>
              {!photo && (
                <Thumbnail
                  large
                  source={require("./../../assets/contactIcon.png")}
                />
              )}
              {photo && <Thumbnail large source={{ uri: photo.uri }} />}
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Form>
              <Field name="username" label="Username" component={FormInput} />
              <Field
                name="bio"
                label="Bio"
                component={FormTextarea}
                rowSpan={5}
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
  form: "singup-steptwo-form",
  validate
})(StepTwoForm);
