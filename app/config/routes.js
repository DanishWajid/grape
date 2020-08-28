import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import NetInfo from "@react-native-community/netinfo";
import { connectAlert } from "./../components/alert";
import Login from "./../screens/login";
import Home from "./../screens/home";
import Signup from "./../screens/signup";
import ForgotPassword from "./../screens/forgotPass";
import UserProfile from "../screens/userProfile";
import OwnProfile from "../screens/ownProfile";
import SelectAlbum from "../screens/selectAlbum";
import Reactions from "../screens/reactions";
import Notification from "../screens/notification";
import FeedItem from "../screens/feedItem";
import Settings from "../screens/settings";
import Test from "../screens/test";
import Capture from "../screens/capture";
import Caption from "../screens/caption";
import DiaryAlbum from "../screens/diaryAlbum";
import DiaryItem from "../screens/diaryItem";
import NewAlbum from "../screens/newAlbum";
import { changeNetworkStatus } from "../actions/network";
import Friends from "../screens/friends";
import http from "../services/httpService";

const SignedOutApp = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },

    Signup: { screen: Signup }
  },

  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      header: false,
      swipeEnabled: false,
      drawerLockMode: "locked-closed",
      gesturesEnabled: false
    }
  }
);

const SignedInApp = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    UserProfile: {
      screen: UserProfile
    },
    OwnProfile: {
      screen: OwnProfile
    },
    Settings: { screen: Settings },
    Caption: { screen: Caption },
    Notification: {
      screen: Notification
    },
    Friends: {
      screen: Friends
    },
    Reactions: {
      screen: Reactions
    },
    SelectAlbum: {
      screen: SelectAlbum
    },
    NewAlbum: {
      screen: NewAlbum
    },
    FeedItem: {
      screen: FeedItem
    },
    DiaryItem: {
      screen: DiaryItem
    },
    DiaryAlbum: {
      screen: DiaryAlbum
    },
    Capture: {
      screen: Capture
    }
  },

  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      header: false,
      swipeEnabled: false,
      drawerLockMode: "locked-closed",
      gesturesEnabled: false
    }
  }
);

const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedInApp
      },

      SignedOut: {
        screen: SignedOutApp
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

class AppRoot extends Component {
  static propTypes = {};

  handleNetworkChange = info => {
    this.props.dispatch(changeNetworkStatus(info));
  };

  constructor(props) {
    super(props);
  }

  netInfoUnsubscribe;
  componentDidMount() {
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      this.handleNetworkChange(state.type);
    });
  }

  componentWillUnmount() {
    this.netInfoUnsubscribe();
  }

  render() {
    const userLoggedIn = this.props.userLoginData.userLoggedIn;
    const { currentUser } = this.props;

    if (userLoggedIn) {
      http.setJwt(currentUser.token);
    }
    const Layout = createRootNavigator(userLoggedIn);
    return <Layout />;
  }
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser,
  userLoginData: state.login.userLoginData
});

export default connect(mapStateToProps)(connectAlert(AppRoot));
