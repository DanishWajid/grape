import React, { Component } from "react";
import { HfContainer } from "../components/container";
import { VideoItem } from "../components/item";
import { View, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import Swiper from "react-native-swiper";
import { connectAlert } from "../components/alert";
import { Spinner } from "../components/spinner";
import _ from "lodash";
import profile from "../Data/profile";

class DiaryAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false
    };
  }
  render() {
    const { paused } = this.state;
    return (
      <HfContainer>
        {_.isEmpty(profile) ? (
          <Spinner />
        ) : (
          <Swiper
            onMomentumScrollEnd={() => {
              this.setState({ paused: !paused });
            }}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            loop={false}
          >
            {profile.map(element => (
              <View key={element._id} style={styles.slide}>
                <VideoItem
                  name={element.name}
                  thumbnailURL={element.thumbnailURL}
                  reactions={12}
                  description={element.description}
                  video={element.video}
                  paused={paused}
                />
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
