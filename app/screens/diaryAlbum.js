import React, { Component } from "react";
import { HfContainer } from "../components/container";
import { Item } from "../components/item";
import {
  ScrollView,
  FlatList,
  View,
  Image,
  StatusBar,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
import Swiper from "react-native-swiper";
import { getDiary } from "../services/diaryService";
import { getUser } from "../services/userService";
import { connectAlert } from "../components/alert";

import { Spinner } from "../components/spinner";
import { VideoItem } from "../components/item";
import _ from "lodash";

class DiaryAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaderImage: "uplaoderImage",
      data: []
    };
  }
  componentWillMount() {
    const { diary_id } = this.props.navigation.state.params;
    this.getUser();
    this.getDiaryData(diary_id);
  }
  getUser = async () => {
    const {
      latest_picture: { user_id }
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

  getDiaryData = async diary_id => {
    try {
      const { data } = await getDiary(diary_id);

      this.setState({ data });
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
    const { uploaderImage, data } = this.state;
    const { name, pictures } = data;

    return (
      <HfContainer>
        {_.isEmpty(data) ? (
          <Spinner />
        ) : (
          <Swiper
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            loop={false}
          >
            {pictures.map(element => (
              <View key={element._id} style={styles.slide}>
                {element.thumbnail ? (
                  <VideoItem
                    name={name}
                    thumbnailURL={element.user_pic}
                    reactions={12}
                    muted={true}
                    reactionThumbnail={uploaderImage}
                    description={element.caption}
                    video={element.url}
                  />
                ) : (
                  <Item
                    name={name}
                    thumbnailURL={element.user_pic}
                    imageURL={element.url}
                    reactionThumbnail={uploaderImage}
                    reactions={12}
                    description={element.caption}
                  />
                )}
              </View>
            ))}
          </Swiper>
        )}
      </HfContainer>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    backgroundColor: "transparent"
  },
  dot: {
    backgroundColor: "rgba(255,255,255,.3)",
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },

  imgBackground: {
    width,
    height,
    backgroundColor: "transparent",
    position: "absolute"
  },

  image: {
    width,
    height
  }
};

export default connectAlert(DiaryAlbum);
