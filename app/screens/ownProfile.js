import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer, BodyContainer } from "../components/container";
import { Profile } from "../components/profile";
import { connect } from "react-redux";

class OwnProfile extends Component {
  itemPress = data => {
    const { _id: diary_id } = data;
    this.props.navigation.navigate("DiaryAlbum", { diary_id });
  };

  thumbnailPress = data => {
    const { user_id } = data;
    let { _id } = this.props.currentUser.user || {};
    if (_id !== user_id) {
      this.props.navigation.navigate("UserProfile", {
        user_id
      });
    }
  };

  render() {
    let { username, bio, pic, _id, website = "" } =
      this.props.currentUser.user || {};

    return (
      <HfContainer>
        <CustomHeader
          title={username}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
          thumbnailPress={() => this.props.navigation.navigate("Settings")}
          settings={true}
        />
        <BodyContainer>
          <Profile
            userId={_id}
            website={website}
            link={true}
            itemPress={this.itemPress}
            thumbnailPress={this.thumbnailPress}
            name={username}
            imageURL={pic}
            description={bio}
            btnTitle="Follow"
            head={true}
            noSelect={true}
          />
        </BodyContainer>
      </HfContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

export default connect(mapStateToProps)(OwnProfile);
