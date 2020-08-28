import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { connectAlert } from "./../alert";
import { register } from "./../../services/userService";
import StepOneForm from "./stepOneForm";
import StepTwoForm from "./stepTwoForm";
import { CustomHeader } from "./../common/customHeader";

class SignupMain extends Component {
  state = {
    loading: false,
    step: 1,
    stepTitle: "Sign Up 1/2",
    stepOneData: {},
    photo: {}
  };

  handleFormStepOne = async values => {
    this.setState({ step: 2, stepOneData: values, stepTitle: "Sign Up 2/2" });
  };

  handleImageUpload = photo => {
    this.setState({ photo });
  };

  handleFormStepTwo = async values => {
    const { stepOneData, photo } = this.state;

    this.setState({ loading: true });

    try {
      const {
        fullName: name,
        email,
        password,
        confirmPassword: confirm_password
      } = stepOneData;
      const { username, bio } = values;

      const finalData = {
        name,
        email,
        password,
        confirm_password,
        username,
        bio
      };

      const formData = new FormData();

      if (photo.uri) {
        formData.append("avatar", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android"
              ? photo.uri
              : photo.uri.replace("file://", "")
        });
      }

      Object.keys(finalData).forEach(key => {
        formData.append(key, finalData[key]);
      });

      const { data } = await register(formData);
      this.props.alertWithType(
        "success",
        "User Registered",
        "Please check your email to verify."
      );
      this.props.navigation.navigate("Login");

      this.setState({ loading: false });
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
    const { stepTitle, step, stepOneData, loading } = this.state;

    return (
      <React.Fragment>
        <CustomHeader
          title={stepTitle}
          goback={() =>
            step === 1
              ? this.props.navigation.goBack()
              : this.setState({ step: 1, stepTitle: "Sign Up 1/2" })
          }
          backButton
        />
        {step === 1 && (
          <StepOneForm
            initialValues={stepOneData}
            onSubmit={this.handleFormStepOne}
          />
        )}
        {step === 2 && (
          <StepTwoForm
            onSubmit={this.handleFormStepTwo}
            loading={loading}
            onImageUpload={this.handleImageUpload}
          />
        )}
      </React.Fragment>
    );
  }
}

SignupMain.propTypes = {
  children: PropTypes.any,
  alertWithType: PropTypes.func
};

const mapStateToProps = state => {
  const currentUser = state.login.currentUser;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(connectAlert(SignupMain));
