import React, { Component } from "react";
import _ from "lodash";
import { CustomTabs } from "../tabs";
import { connectAlert } from "../../components/alert";
import { Spinner } from "../../components/spinner";
import ProfileHeader from "./profileHeader";
import { View } from "native-base";
import {
  getMyDiaries,
  getContributorDiaries
} from "../../services/diaryService";
import styles from "./styles";
import reactotron from "reactotron-react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      myDiaries: [],
      contributorDiaries: [],
      myDiariesLimit: 4,
      myDiariesOffset: 0,
      contributorsDiariesLimit: 4,
      contributorsDiariesOffset: 0,
      loadingMyDiaries: true,
      loadingContributorsDiaries: true
    };
  }
  componentWillMount() {
    this.myDiaries();
    this.contributorDiaries();
  }
  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    const { userId: prevId } = prevProps;

    if (userId !== prevId) {
      this.myDiariesRefresh();
      this.contributorsDiariesRefresh();
    }
  }

  myDiariesRefresh = () => {
    this.setState(
      {
        myDiariesOffset: 0,
        myDiaries: [],
        loadingMyDiaries: true
      },
      () => {
        this.myDiaries();
      }
    );
  };

  contributorsDiariesRefresh = () => {
    this.setState(
      {
        contributorsDiariesOffset: 0,
        contributorDiaries: [],
        loadingContributorsDiaries: true
      },
      () => {
        this.contributorDiaries();
      }
    );
  };

  renderMyDiariesFooter = loading => {
    if (!loading) return null;

    return <Spinner />;
  };

  renderContributorsDiariesFooter = loading => {
    if (!loading) return null;
    return <Spinner />;
  };

  contributorsDiariesLoadMore = () => {
    this.setState(
      {
        contributorsDiariesOffset: this.state.contributorsDiariesOffset + 4,
        loadingContributorsDiaries: true
      },
      () => {
        this.contributorDiaries();
      }
    );
  };

  myDiariesLoadMore = () => {
    this.setState(
      {
        myDiariesOffset: this.state.myDiariesOffset + 4,
        loadingMyDiaries: true
      },
      () => {
        this.myDiaries();
      }
    );
  };

  myDiaries = async () => {
    const { myDiariesLimit, myDiariesOffset, myDiaries } = this.state;
    const { userId } = this.props;

    try {
      const { data } = await getMyDiaries(
        userId,
        myDiariesLimit,
        myDiariesOffset
      );
      let myDiariesArray = [];
      for (let item of data) {
        const { latest_picture = {} } = item;
        if (!_.isEmpty(latest_picture)) myDiariesArray.push(item);
      }
      this.setState({
        myDiaries:
          myDiariesOffset === 0
            ? myDiariesArray
            : [...myDiaries, ...myDiariesArray],
        loadingMyDiaries: false
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

  contributorDiaries = async () => {
    const {
      contributorsDiariesLimit,
      contributorsDiariesOffset,
      contributorDiaries
    } = this.state;
    const { userId } = this.props;
    try {
      const { data } = await getContributorDiaries(
        userId
        // contributorsDiariesLimit,
        // contributorsDiariesOffset
      );
      let contributorDiariesArray = [];
      for (let item of data) {
        const { latest_picture = {} } = item;
        if (!_.isEmpty(latest_picture)) contributorDiariesArray.push(item);
      }

      this.setState({
        contributorDiaries: contributorDiariesArray,
        //   contributorsDiariesOffset === 0
        //     ? contributorDiariesArray
        //     : [...contributorDiaries, ...contributorDiariesArray],
        loadingContributorsDiaries: false
      });
      reactotron.log("Contributor diaries", contributorDiariesArray);
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
    const {
      contributorDiaries,
      myDiaries,
      loadingContributorsDiaries,
      loadingMyDiaries
    } = this.state || {};
    const {
      name,
      imageURL,
      description,
      link,
      head,
      btnTitle,
      itemPress,
      thumbnailPress,
      website,
      disable,
      onSelect,
      noSelect,
      extraData,
      selectedIndex,
      onTabChange,
      loading,
      onPress
    } = this.props || {};

    return (
      <View style={styles.outerView}>
        <ProfileHeader
          name={name}
          imageURL={imageURL}
          description={description}
          link={link}
          onPress={onPress}
          siteURL={website}
          head={head}
          btnTitle={btnTitle}
          loading={loading}
          disabled={false}
        />
        <View style={styles.outerView}>
          <View style={styles.innerView}>
            <CustomTabs
              itemPress={itemPress}
              myDiaries={myDiaries}
              contributorDiaries={contributorDiaries}
              thumbnailPress={thumbnailPress}
              firstLabel="Mine"
              secondLabel="Creator"
              isRefreshing={false}
              noSelect={noSelect}
              myDiariesRefresh={this.myDiariesRefresh}
              contributorsDiariesRefresh={this.contributorsDiariesRefresh}
              myDiariesLoadMore={this.myDiariesLoadMore}
              contributorsDiariesLoadMore={this.contributorsDiariesLoadMore}
              renderMyDiariesFooter={this.renderMyDiariesFooter}
              renderContributorsDiariesFooter={
                this.renderContributorsDiariesFooter
              }
              loadingContributorsDiaries={loadingContributorsDiaries}
              loadingMyDiaries={loadingMyDiaries}
              disable={disable}
              onSelect={onSelect}
              extraData={extraData}
              selectedIndex={selectedIndex}
              onTabChange={onTabChange}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connectAlert(Profile);
