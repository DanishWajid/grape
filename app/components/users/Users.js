import React from "react";
import PropTypes from "prop-types";
import { Content, Thumbnail, Text, Body, Left } from "native-base";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import styles from "./styles";

const Users = ({ name, thumbnailURL, online, thumbnailPress }) => (
  <TouchableOpacity onPress={thumbnailPress}>
    <Content contentContainerStyle={styles.content}>
      <Thumbnail
        large
        source={{
          uri: thumbnailURL
        }}
      />

      <Body style={styles.body}>
        <Text style={styles.txt}>{name}</Text>
      </Body>
      {/* <Left style={styles.left}>
      <Icon
        name="controller-record"
        color={online ? "#0DBCEA" : "#707070"}
        size={20}
      />
    </Left> */}
    </Content>
  </TouchableOpacity>
);

Users.propTypes = {
  name: PropTypes.string,
  thumbnailURL: PropTypes.string,
  online: PropTypes.bool,
  thumbnailPress: PropTypes.string
};

export default Users;
