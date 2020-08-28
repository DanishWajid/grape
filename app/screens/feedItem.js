import React, { Component } from "react";
import { HfContainer } from "../components/container";
import { Item } from "../components/item";
import { getUser } from "../services/userService";
import { connectAlert } from "../components/alert";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaderImage: "uplaoderImage"
    };
  }
  componentWillMount() {
    this.getUser();
  }
  getUser = async () => {
    const {
      picture: { user_id }
    } = this.props.navigation.state.params;
    try {
      const response = await getUser(user_id);
      this.setState({ uploaderImage: response.data.pic });
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
    const { uploaderImage } = this.state;

    let {
      diary_name,
      user_pic,
      picture: { url, caption }
    } = this.props.navigation.state.params;

    return (
      <HfContainer>
        <Item
          name={diary_name}
          thumbnailURL={user_pic}
          imageURL={url}
          reactionThumbnail={uploaderImage}
          reactions={12}
          description={caption}
        />
      </HfContainer>
    );
  }
}

export default connectAlert(FeedItem);
