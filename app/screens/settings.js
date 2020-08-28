import * as yup from "yup";
import { Formik } from "formik";
import { CustomInput } from "../components/common/input";
import React, { Component, Fragment } from "react";
import {
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Switch,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { CustomHeader } from "./../components/common/customHeader";
import { Thumbnail } from "native-base";
import { HfContainer, BodyContainer } from "./../components/container";
import ImagePicker from "react-native-image-picker";
import { logoutUser, updateUser } from "../actions/login";
import { connect } from "react-redux";
import { connectAlert } from "./../components/alert";
import { logout } from "../services/authService";
import { updateUserData, uploadUserImage } from "../services/userService";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      updating: false,
      photo: null
    };
  }

  logOut = async () => {
    this.setState({ loading: true });
    try {
      await logout();
      this.props.dispatch(logoutUser());
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        const errorMessage =
          error.response.data.error || error.response.data || error.message;
        this.props.alertWithType("error", "Error", errorMessage);
      } else {
        const errorMessage = error.message || error.response.data;
        this.props.alertWithType("error", "Error", errorMessage);
      }
    }
  };

  uploadImage = async values => {
    const { photo } = this.state;
    this.setState({ updating: true });
    if (photo) {
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

      try {
        await uploadUserImage(formData);
        this.settings(values);
      } catch (error) {
        this.setState({ updating: false });
        if (error.response && error.response.status >= 400) {
          const errorMessage =
            error.response.data.error || error.response.data || error.message;
          this.props.alertWithType("error", "Error", errorMessage);
        } else {
          const errorMessage = error.message || error.response.data;
          this.props.alertWithType("error", "Error", errorMessage);
        }
      }
    } else {
      this.settings(values);
    }
  };

  settings = async values => {
    try {
      const { data: user } = await updateUserData(values);
      this.props.dispatch(updateUser({ user }));
      this.setState({ updating: false });
    } catch (error) {
      this.setState({ updating: false });
      if (error.response && error.response.status >= 400) {
        const errorMessage =
          error.response.data.error || error.response.data || error.message;
        this.props.alertWithType("error", "Error", errorMessage);
      } else {
        const errorMessage = error.message || error.response.data;
        this.props.alertWithType("error", "Error", errorMessage);
      }
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { user } = this.props.currentUser;
    let {
      name = "",
      bio = "",
      pic = "",
      website = "",
      gender = "",
      contact_no = ""
    } = user || {};
    const { loading, photo, updating } = this.state;

    return (
      <HfContainer>
        {loading ? (
          <View style={styles.activityIndicatorView}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.activityIndicatorText}>Logging Off</Text>
          </View>
        ) : (
          <Formik
            initialValues={{
              name: name,
              bio: bio,
              website: website,
              contact_no: contact_no,
              gender: gender,
              password: "",
              confirmPassword: "",
              private: user["private"]
            }}
            onSubmit={values => this.uploadImage(values)}
            validationSchema={yup.object().shape({
              name: yup.string().required("Name is required"),
              bio: yup.string().required("Bio is required"),
              website: yup.string().required("Website URL is required"),
              contact_no: yup.string().required("Contact number is required"),
              gender: yup.string().required("Gender is required"),
              password: yup.string(),
              confirmPassword: yup
                .string()
                .test("passwords-match", "Passwords must match", function(
                  value
                ) {
                  return this.parent.password === value;
                })
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              setFieldValue
            }) => (
              <Fragment>
                <CustomHeader
                  right={true}
                  rightText={true}
                  rightContent="Save"
                  backButton={true}
                  title="Profile Settings"
                  thumbnailPress={handleSubmit}
                  goback={() => this.props.navigation.goBack()}
                  loading={updating}
                />
                <BodyContainer>
                  <ScrollView>
                    <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                      <Thumbnail
                        style={{ alignSelf: "center", marginTop: 10 }}
                        large
                        source={{
                          uri: !photo ? pic : photo.uri
                        }}
                      />
                    </TouchableOpacity>

                    <CustomInput
                      label="Full Name"
                      value={values.name}
                      handleChange={handleChange("name")}
                      onBlur={() => setFieldTouched("name")}
                      height={40}
                      type="name"
                      touched={touched}
                      errors={errors}
                    />

                    <CustomInput
                      label="Bio"
                      value={values.bio}
                      handleChange={handleChange("bio")}
                      onBlur={() => setFieldTouched("bio")}
                      multiline={true}
                      numberOfLines={4}
                      height={100}
                      type="bio"
                      touched={touched}
                      errors={errors}
                    />
                    <View style={styles.container}>
                      <Text style={styles.toggleLabel}>Private Profile</Text>
                      <Switch
                        trackColor={{ false: "white" }}
                        onValueChange={value => setFieldValue("private", value)}
                        value={values["private"]}
                      />
                    </View>
                    <CustomInput
                      label="Website"
                      value={values.website}
                      handleChange={handleChange("website")}
                      onBlur={() => setFieldTouched("website")}
                      height={40}
                      type="website"
                      touched={touched}
                      errors={errors}
                    />
                    <CustomInput
                      label="Phone"
                      value={values.contact_no}
                      handleChange={handleChange("contact_no")}
                      onBlur={() => setFieldTouched("contact_no")}
                      height={40}
                      type="contact_no"
                      touched={touched}
                      errors={errors}
                    />

                    <CustomInput
                      label="Gender"
                      value={values.gender}
                      handleChange={handleChange("gender")}
                      onBlur={() => setFieldTouched("gender")}
                      height={40}
                      type="gender"
                      touched={touched}
                      errors={errors}
                    />
                    <CustomInput
                      label="Password"
                      value={values.password}
                      handleChange={handleChange("password")}
                      onBlur={() => setFieldTouched("password")}
                      height={40}
                      secureTextEntry
                      type="password"
                      touched={touched}
                      errors={errors}
                    />
                    <CustomInput
                      label="Confirm Password"
                      value={values.confirmPassword}
                      handleChange={handleChange("confirmPassword")}
                      onBlur={() => setFieldTouched("confirmPassword")}
                      height={40}
                      secureTextEntry
                      type="confirmPassword"
                      touched={touched}
                      errors={errors}
                    />

                    <TouchableOpacity
                      style={styles.logout}
                      onPress={() => this.logOut()}
                    >
                      <Text style={styles.logoutText}>Log Off</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </BodyContainer>
              </Fragment>
            )}
          </Formik>
        )}
      </HfContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

export default connect(mapStateToProps)(connectAlert(Settings));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  toggleLabel: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold"
  },
  logout: { alignSelf: "flex-start" },
  logoutText: {
    color: "#0DBCEA",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  activityIndicatorText: { color: "white", fontSize: 20, fontWeight: "bold" },
  activityIndicatorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
