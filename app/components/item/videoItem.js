import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, StatusBar, View } from "react-native";
import Video from "react-native-video";
import RBSheet from "react-native-raw-bottom-sheet";
import { HfContainer } from "../container";
import { Heading } from "../common/heading";
import { Content, Thumbnail, Text, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Reactions from "../../screens/reactions";
import styles from "./styles";
import { myHeight } from "../../utils";
import { Spinner } from "../spinner";

export default class VideoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: props.muted,
      paused: false,
      loading: false
    };
  }

  pauseControl = () => {
    this.setState({ paused: !this.state.paused });
  };

  onEnd = () => {
    this.setState({ paused: !this.state.paused }, () => {
      this.pauseControl();
    });
    this.pauseControl();
  };
  loading = () => {
    this.setState({ loading: true });
  };
  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { muted, paused, loading } = this.state;
    const {
      reactions,
      video,
      thumbnailURL,
      reactionThumbnail,
      description,
      name,
      noInfo
    } = this.props;
    return (
      <HfContainer>
        {!noInfo && <StatusBar hidden={true} />}

        <Video
          ref={component => (this._video = component)}
          source={{
            uri: video
          }}
          style={styles.video}
          muted={muted}
          resizeMode={"cover"}
          rate={1.0}
          paused={paused}
          repeat={true}
          onLoadStart={this.loading}
          onReadyForDisplay={this.stopLoading}
          onEnd={this.onEnd}
          ignoreSilentSwitch={"obey"}
        />

        {!noInfo && (
          <React.Fragment>
            <Content contentContainerStyle={styles.content}>
              <Thumbnail
                medium
                source={{
                  uri: thumbnailURL
                }}
              />

              <Body style={styles.body}>
                <Heading itemTitle={true} text={name} />
              </Body>
              <Right>
                <Icon
                  name={muted ? "volume-off" : "volume-2"}
                  color="white"
                  size={25}
                  style={styles.icon}
                  onPress={() => {
                    this.setState({ muted: !muted });
                  }}
                />
              </Right>
            </Content>
            {loading && <Spinner />}
            <Content contentContainerStyle={styles.innerConntent}>
              <Thumbnail
                small
                source={{
                  uri: reactionThumbnail
                }}
              />

              <Text style={styles.description}>{description}</Text>
              <TouchableOpacity
                onPress={() => {
                  alert("Functionality not added yet");
                  // this.RBSheet.open();
                }}
              >
                <Text style={styles.reaction}>{reactions} reactions</Text>
              </TouchableOpacity>
            </Content>

            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={myHeight}
              duration={250}
            >
              <Reactions onPress={() => this.RBSheet.close()} />
            </RBSheet>
          </React.Fragment>
        )}
      </HfContainer>
    );
  }
}
