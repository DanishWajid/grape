import React from "react";
import PropTypes from "prop-types";
import { ImageBackground, StatusBar, TouchableOpacity } from "react-native";
import { Heading } from "../common/heading";
import RBSheet from "react-native-raw-bottom-sheet";
import { Content, Thumbnail, Text, Body } from "native-base";
import styles from "./styles";
import Reactions from "../../screens/reactions";
import { myHeight } from "../../utils";

const Item = ({
  name,
  imageURL,
  thumbnailURL,
  reactionThumbnail,
  reactions,
  description
}) => (
  <ImageBackground
    source={{
      uri: imageURL
    }}
    style={styles.background}
  >
    <StatusBar hidden={true} />
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
    </Content>

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
  </ImageBackground>
);

Item.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  thumbnailURL: PropTypes.string,
  others: PropTypes.number,
  reactions: PropTypes.number,
  reactionThumbnail: PropTypes.string,
  description: PropTypes.string
};

export default Item;
