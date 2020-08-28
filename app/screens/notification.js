import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer, BodyContainer } from "../components/container";
import { Spinner } from "../components/spinner";
import { ItemList } from "../components/itemList";
import { connectAlert } from "./../components/alert";
import { getnotificationFeed } from "../services/userService";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      limit: 8,
      offset: 0,
      loading: true
    };
  }
  componentWillMount() {
    this.notificationFeed();
  }

  itemPress = data => {
    const { notification_type } = data;
    if (notification_type === "USER_FOLLOW") {
      const { follower_id: user_id } = data;
      this.props.navigation.navigate("UserProfile", { user_id });
    } else if (notification_type === "DIARY_CONTRIBUTED") {
      const { diary_id } = data;
      this.props.navigation.navigate("DiaryAlbum", { diary_id });
    }
  };

  renderFooter = loading => {
    if (!loading) return null;

    return <Spinner />;
  };

  handleRefresh = () => {
    this.setState(
      {
        offset: 0,
        data: [],
        loading: true
      },
      () => {
        this.notificationFeed();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        offset: this.state.offset + 8,
        loading: true
      },
      () => {
        this.notificationFeed();
      }
    );
  };

  notificationFeed = async () => {
    const { limit, offset, data } = this.state;

    try {
      const { data: notifications } = await getnotificationFeed(limit, offset);

      this.setState({
        data: offset === 0 ? notifications : [...data, ...notifications],
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
    }
  };
  render() {
    const { data, loading } = this.state;
    return (
      <HfContainer>
        <CustomHeader
          title={"Notifications"}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
        />
        <BodyContainer>
          <ItemList
            list={data}
            itemPress={this.itemPress}
            notification={true}
            isRefreshing={false}
            handleRefresh={this.handleRefresh}
            handleLoadMore={this.handleLoadMore}
            renderFooter={this.renderFooter}
            loading={loading}
          />
        </BodyContainer>
      </HfContainer>
    );
  }
}

export default connectAlert(Notification);
