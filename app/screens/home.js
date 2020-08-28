import React, { Component } from "react";
import { CustomHeader } from "./../components/common/customHeader";
import { HfContainer, BodyContainer } from "./../components/container";
import { Spinner } from "../components/spinner";
import { View, Keyboard, Text, Image } from "react-native";
import { ItemList } from "../components/itemList";
import { Camera } from "../components/absoluteIcons";
import EStyleSheet from "react-native-extended-stylesheet";
import { SearchInput } from "../components/common/formInput";
import { getFeed, findFriends } from "../services/userService";
import { connect } from "react-redux";
import { connectAlert } from "./../components/alert";
import _ from "lodash";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingFriends: true,
      data: [],
      friendsData: [],
      limit: 5,
      friendsLimit: 5,
      friendsOffset: 0,
      offset: 0,
      searchText: "",
      search: false
    };
  }
  componentWillMount() {
    this.getHomeFeed();
  }

  getHomeFeed = async () => {
    const { limit, offset, data } = this.state;
    try {
      const {
        data: { docs }
      } = await getFeed(limit, offset);

      this.setState({
        data: offset === 0 ? docs : [...data, ...docs],
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false });
      if (error.response && error.response.status >= 400) {
        const errorMessage =
          error.response.data.error || error.response.data || error.message;
        // this.props.alertWithType("error", "Error", errorMessage);
      } else {
        const errorMessage = error.message || error.response.data;
        this.props.alertWithType("error", "Error", errorMessage);
      }
    }
  };

  itemPress = data => {
    const { diary_id } = data;
    this.props.navigation.navigate("DiaryAlbum", { diary_id });
  };

  headerThumbnailPress = () => {
    this.props.navigation.navigate("OwnProfile");
  };

  handleRefresh = () => {
    if (!this.state.search) {
      this.setState(
        {
          offset: 0,
          data: [],
          loading: true
        },
        () => {
          this.getHomeFeed();
        }
      );
    } else {
      this.setState(
        {
          friendsOffset: 0,
          friendsData: [],
          loading: true
        },
        () => {
          this.search();
        }
      );
    }
  };

  handleLoadMore = () => {
    if (!this.state.search) {
      this.setState(
        {
          offset: this.state.offset + 5,
          loading: true
        },
        () => {
          this.getHomeFeed();
        }
      );
    } else {
      this.setState(
        {
          friendsOffset: this.state.friendsOffset + 5,
          loading: true
        },
        () => {
          this.search();
        }
      );
    }
  };

  thumbnailPress = data => {
    if (!this.state.search) {
      const { user_id } = data;
      this.props.navigation.navigate("UserProfile", { user_id });
    } else {
      const { _id: user_id } = data;
      this.props.navigation.navigate("UserProfile", { user_id });
    }
  };

  searchPress = searchText => {
    this.setState({ searchText }, () => {
      if (_.isEmpty(this.state.searchText) && this.state.searchPressed) {
        this.setState({ search: false, searchPressed: false, friendsData: [] });
        Keyboard.dismiss();
      }
    });
  };
  search = async () => {
    const { friendsLimit, friendsOffset, friendsData, searchText } = this.state;
    try {
      const { data: friends } = await findFriends(
        searchText,
        friendsLimit,
        friendsOffset
      );

      this.setState({
        friendsData:
          friendsOffset === 0 ? friends : [...friendsData, ...friends],
        loading: false,
        search: true,
        searchPressed: true
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
    }
  };

  renderFooter = loading => {
    if (!loading) return null;

    return <Spinner />;
  };
  renderNoFeed = text => {
    return (
      <View style={styles.errorView}>
        <Image
          resizeMode="contain"
          source={require("../assets/noFeed.png")}
          style={styles.errorImage}
        />
        <Text style={styles.errorText}>{text}</Text>
      </View>
    );
  };
  capture = () => {
    this.props.navigation.navigate("Capture");
  };

  render() {
    const { pic } = this.props.currentUser.user;
    const { data, loading, search, friendsData } = this.state;

    return (
      <HfContainer>
        <View style={styles.header}>
          <CustomHeader
            right={true}
            thumbnail={true}
            notifications={true}
            notificationsPress={() =>
              this.props.navigation.navigate("Notification")
            }
            thumbnailPress={this.headerThumbnailPress}
            thumbnailURL={pic}
          />
        </View>

        <BodyContainer>
          {/* <SwipeHiddenHeader
            header={() => ( */}
          <View style={styles.secondContainer}>
            <SearchInput searchPress={this.searchPress} search={this.search} />
          </View>
          {/* )}
          > */}

          <View style={styles.thirdContanier}>
            {search ? (
              <React.Fragment>
                {!loading &&
                  _.isEmpty(friendsData) &&
                  this.renderNoFeed("Oops! No friend suggestion found")}
                <ItemList
                  list={friendsData}
                  itemPress={this.itemPress}
                  thumbnailPress={this.thumbnailPress}
                  users={true}
                  isRefreshing={false}
                  handleRefresh={this.handleRefresh}
                  handleLoadMore={this.handleLoadMore}
                  renderFooter={this.renderFooter}
                  loading={loading}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {!loading &&
                  _.isEmpty(data) &&
                  this.renderNoFeed("Oops! No home feed found")}
                <ItemList
                  list={data}
                  itemPress={this.itemPress}
                  thumbnailPress={this.thumbnailPress}
                  feedCard={true}
                  noSelect={true}
                  isRefreshing={false}
                  handleRefresh={this.handleRefresh}
                  handleLoadMore={this.handleLoadMore}
                  renderFooter={this.renderFooter}
                  loading={loading}
                />
              </React.Fragment>
            )}
          </View>

          {/* </SwipeHiddenHeader> */}
        </BodyContainer>

        <View style={styles.lastContainer}>
          <Camera onPress={() => this.capture()} />
        </View>
      </HfContainer>
    );
  }
}
const styles = EStyleSheet.create({
  header: {
    backgroundColor: "$darkGray",
    zIndex: 1
  },
  secondContainer: {
    flex: 0.5,
    paddingVertical: 20,
    justifyContent: "center",
    backgroundColor: "$darkGray",
    zIndex: 0
  },

  thirdContanier: { flex: 5 },

  lastContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    bottom: 10
  },
  errorText: { color: "white", fontSize: 20, fontWeight: "bold" },
  errorView: { flex: 5, justifyContent: "center", alignItems: "center" },
  errorImage: { width: "100%", height: "40%" }
});

const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

export default connect(mapStateToProps)(connectAlert(Home));
