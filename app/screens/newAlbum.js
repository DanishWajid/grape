import React, { Component } from "react";
import { CustomHeader } from "./../components/common/customHeader";
import { HfContainer, BodyContainer } from "./../components/container";
import FormInput from "../components/common/formInput/formInput";
import { Field, reduxForm } from "redux-form";
import profile from "../Data/profile";
import { Creators } from "../components/creators";
import { TextButton } from "../components/common/button";
import { Content, View } from "native-base";

// import EStyleSheet from "react-native-extended-stylesheet";

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var ps = values.password;

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

class NewAlbum extends Component {
  thumbnailPress = data => {
    this.props.navigation.navigate("UserProfile", { ...data });
  };

  itemPress = data => {
    this.props.navigation.navigate("FeedItem", { ...data });
  };

  render() {
    return (
      <HfContainer>
        <CustomHeader
          title={"New Album"}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
          rightText={true}
          rightContent="Post"
        />

        <BodyContainer>
          <Content
            contentContainerStyle={{
              alignContent: "center",
              paddingTop: 10,
              alignItems: "center"
            }}
          >
            <Field name="name" label="Name" component={FormInput} />
            <Creators list={profile} thumbnailPress={this.thumbnailPress} />
            <View
              style={{
                marginTop: 15,
                alignSelf: "flex-start"
              }}
            >
              <TextButton
                small
                onPress={() => this.props.navigation.navigate("Friends")}
                title="ADD FRIENDS"
              />
            </View>
          </Content>
          <View style={{ marginBottom: 20 }}>
            <TextButton
              onPress={() => this.props.navigation.navigate("SelectAlbum")}
              title="DELETE ALBUM"
            />
          </View>
        </BodyContainer>
      </HfContainer>
    );
  }
}
// const styles = EStyleSheet.create({});

export default reduxForm({
  form: "new-Album",
  validate
})(NewAlbum);
