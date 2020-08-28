import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer, BodyContainer } from "../components/container";
import { Profile } from "../components/profile";
import {
  getUser,
  getFollowing,
  follow,
  unFollow
} from "../services/userService";
import { connect } from "react-redux";
import { connectAlert } from "./../components/alert";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      followed: null,
      loading: true,
      userChanged: false,
      link: null
    };
  }

  componentWillMount() {
    const { user_id } = this.props.navigation.state.params;
    const { _id } = this.props.currentUser.user;
    if (user_id === _id) {
      this.props.navigation.navigate("OwnProfile");
    } else {
      this.followingStatus(user_id);
      this.getUser(user_id);
    }
  }

  componentDidUpdate(prevProps) {
    const { _id } = this.props.currentUser.user;
    const { user_id } = this.props.navigation.state.params;
    const { user_id: prevId } = prevProps.navigation.state.params;
    if (user_id === _id) {
      this.props.navigation.navigate("OwnProfile");
    } else if (user_id !== prevId) {
      this.getUser(user_id);
      this.setState({ userChanged: true });
    }
  }
  followingStatus = async user_id => {
    try {
      const { data } = await getFollowing();

      for (let item of data) {
        if (user_id === item["_id"]) {
          this.setState({ followed: true, loading: false });
          break;
        }
        this.setState({ followed: false, loading: false });
      }
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
  onButtonPress = async followee_id => {
    this.setState({ loading: true });
    const { followed } = this.state;

    try {
      followed ? await unFollow(followee_id) : follow(followee_id);
      this.setState({ loading: false, followed: !followed });
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
  };

  itemPress = data => {
    const { _id: diary_id } = data;
    this.props.navigation.navigate("DiaryAlbum", { diary_id });
  };

  thumbnailPress = data => {
    const { user_id } = data;

    this.props.navigation.navigate("UserProfile", {
      user_id
    });
  };

  getUser = async user_id => {
    try {
      const response = await getUser(user_id);
      this.setState({ userData: response.data });
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
  render() {
    const { username, bio, pic } = this.state.userData;
    const { user_id } = this.props.navigation.state.params;
    const { followed, loading, userChanged } = this.state;

    return (
      <HfContainer>
        <CustomHeader
          title={username}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
        />

        <BodyContainer>
          <Profile
            userId={user_id}
            userChanged={userChanged}
            link={false}
            btnTitle={followed ? "Unfollow" : "Follow"}
            name={username}
            loading={loading}
            noSelect={true}
            imageURL={pic}
            thumbnailPress={this.thumbnailPress}
            itemPress={this.itemPress}
            description={bio}
            onPress={() => this.onButtonPress(user_id)}
            head={true}
          />
        </BodyContainer>
      </HfContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

export default connect(mapStateToProps)(connectAlert(UserProfile));
