import React from "react";
import PropTypes from "prop-types";
import { Content, Thumbnail, Text, Body, View } from "native-base";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const Notification = ({
  name,
  thumbnailURL,
  description,
  time,
  comment,
  itemPress
}) => (
  <TouchableOpacity onPress={itemPress}>
    <Content contentContainerStyle={styles.content}>
      <Thumbnail
        large
        source={{
          uri: thumbnailURL
        }}
      />

      <Body style={styles.body}>
        <View style={styles.view}>
          <Text style={styles.upperText}>{name}</Text>
          {comment && <Text style={styles.comment}>{time} ago</Text>}
        </View>
        <Text style={styles.description}>{description}</Text>
      </Body>
    </Content>
  </TouchableOpacity>
);

Notification.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.bool,
  thumbnailURL: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  itemPress: PropTypes.func
};

export default Notification;
