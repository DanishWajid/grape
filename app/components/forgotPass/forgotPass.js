import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { connectAlert } from "./../alert";
import StepOneForm from "./stepOneForm";
import StepTwoForm from "./stepTwoForm";
import StepThreeForm from "./stepThreeForm";
import {
  resetPasswordInitiate,
  resetPasswordVerifyCode,
  resetPassword
} from "./../../services/userService";
import { CustomHeader } from "./../common/customHeader";

class ForgotPassMain extends Component {
  state = {
    loading: false,
    step: 1,
    stepTitle: "Forgot Password 1/3",
    token: "",
    email: ""
  };

  handleEmailSubmit = async values => {
    this.setState({ loading: true });

    try {
      const { data } = await resetPasswordInitiate(values);
      const { token } = data;

      this.props.alertWithType(
        "info",
        "Email Sent",
        "Check your email for code"
      );

      this.setState({
        step: 2,
        token: token,
        stepTitle: "Forgot Password 2/3",
        loading: false
      });
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

  handleCodeSubmit = async values => {
    this.setState({ loading: true });

    let { code } = values;
    code = parseInt(code);
    finalData = { code };

    try {
      await resetPasswordVerifyCode(finalData, this.state.token);

      this.props.alertWithType(
        "info",
        "Code Verified",
        "Kindly, enter new password"
      );

      this.setState({
        step: 3,
        stepTitle: "Forgot Password 3/3",
        loading: false
      });
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

  handleResetPassword = async values => {
    this.setState({ loading: true });

    try {
      await resetPassword(values, this.state.token);

      this.props.alertWithType("success", "Password Updated Sucessfully", "");

      this.setState({
        step: 1,
        stepTitle: "Forgot Password 1/3",
        loading: false
      });
      this.props.navigation.navigate("Login");
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
    const {
      stepTitle,
      step,
      stepOneData,
      stepTwoData,
      stepThreeData,
      loading
    } = this.state;

    return (
      <React.Fragment>
        <CustomHeader
          title={stepTitle}
          goback={() =>
            step === 1
              ? this.props.navigation.goBack()
              : this.setState({ step: 1, stepTitle: "Forgot Password 1/3" })
          }
          backButton
        />
        {step === 1 && (
          <StepOneForm
            initialValues={stepOneData}
            onSubmit={this.handleEmailSubmit}
            loading={loading}
            disabled={loading}
          />
        )}
        {step === 2 && (
          <StepTwoForm
            initialValues={stepTwoData}
            onSubmit={this.handleCodeSubmit}
            loading={loading}
            disabled={loading}
          />
        )}
        {step === 3 && (
          <StepThreeForm
            initialValues={stepThreeData}
            onSubmit={this.handleResetPassword}
            loading={loading}
            disabled={loading}
          />
        )}
      </React.Fragment>
    );
  }
}

ForgotPassMain.propTypes = {
  children: PropTypes.any,
  alertWithType: PropTypes.func
};

const mapStateToProps = state => {
  const currentUser = state.login.currentUser;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(connectAlert(ForgotPassMain));
