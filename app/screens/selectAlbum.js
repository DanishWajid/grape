import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer, BodyContainer } from "../components/container";
import { Profile } from "../components/profile";
import { connect } from "react-redux";
import { Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import { connectAlert } from "./../components/alert";
import { uploadToDiary } from "../services/diaryService";

class SelectAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      diary_id: null
    };
  }

  onSelect = (data, index) => {
    const { _id: diary_id } = data;
    this.setState({ selectedIndex: index, diary_id });
  };
  onTabChange = () => {
    this.setState({ selectedIndex: null });
  };

  navigateToHome = () => {
    this.props.navigation.reset(
      [NavigationActions.navigate({ routeName: "Home" })],
      0
    );
  };
  handleSubmit = async () => {
    this.setState({ loading: true });
    const { diary_id } = this.state;
    const { values = {}, response: photo = {}, image } =
      this.props.navigation.state.params || {};

    const formData = new FormData();
    if (photo.uri) {
      formData.append("image", {
        type: image ? "image/jpeg" : "video/mp4",
        name: "file",
        uri:
          Platform.OS === "android"
            ? photo.uri
            : photo.uri.replace("file://", "")
      });
    }

    formData.append("caption", values["caption"]);
    if (diary_id !== null) {
      try {
        await uploadToDiary(diary_id, formData);
        this.navigateToHome();
        this.props.alertWithType(
          "success",
          "Image Uploaded",
          "Image sucessfully uploaded to diary."
        );
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ loading: false });
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
      this.setState({ loading: false });
      this.props.alertWithType(
        "error",
        "No Item Selected",
        "Please select diary before posting picture."
      );
    }
  };

  render() {
    let { _id } = this.props.currentUser.user || {};
    const { loading } = this.state;
    return (
      <HfContainer>
        <CustomHeader
          title={"Select Album"}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
          rightText={true}
          rightContent="Post"
          thumbnailPress={this.handleSubmit}
          loading={loading}
        />
        <BodyContainer>
          <Profile
            userId={_id}
            link={false}
            head={false}
            btnTitle="New"
            disable={true}
            onSelect={this.onSelect}
            selectedIndex={this.state.selectedIndex}
            extraData={this.state}
            onTabChange={this.onTabChange}
          />
        </BodyContainer>
      </HfContainer>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

export default connect(mapStateToProps)(connectAlert(SelectAlbum));
