import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Header,
  Body,
  Title,
  Left,
  Right,
  Icon as NBIcon,
  Thumbnail,
  Spinner
} from "native-base";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const CustomHeader = ({
  backButton,
  bottomButton,
  title,
  notifications,
  rightText,
  right,
  thumbnail,
  settings,
  notificationsPress,
  thumbnailPress,
  thumbnailURL,
  goback,
  rightContent,
  loading
}) => (
  <Header style={styles.header}>
    <Left>
      {backButton && (
        <NBIcon
          style={styles.leftIcon}
          name="ios-arrow-back"
          onPress={goback}
        />
      )}

      {bottomButton && (
        <NBIcon
          style={styles.leftIcon}
          name="ios-arrow-down"
          onPress={goback}
        />
      )}

      {notifications && (
        <MaterialCommunityIcons
          style={styles.leftIcon}
          size={30}
          name="bell"
          onPress={notificationsPress}
        />
      )}
    </Left>

    <Body>
      <Title style={styles.title}>{title}</Title>
    </Body>
    {right && (
      <Right>
        {thumbnail && (
          <TouchableOpacity
            underlayColor="rgba(23, 23, 23,0)"
            onPress={thumbnailPress}
          >
            <Thumbnail
              small
              source={{
                uri: thumbnailURL
              }}
            />
          </TouchableOpacity>
        )}

        {rightText && (
          <TouchableOpacity
            underlayColor="rgba(23, 23, 23,0)"
            onPress={thumbnailPress}
          >
            {!loading ? (
              <Title style={styles.rightText}>{rightContent}</Title>
            ) : (
              <Spinner color="#fff" />
            )}
          </TouchableOpacity>
        )}

        {settings && (
          <MaterialCommunityIcons
            style={styles.rightIcon}
            size={30}
            name="tune-vertical"
            onPress={thumbnailPress}
          />
        )}
      </Right>
    )}
  </Header>
);
CustomHeader.propTypes = {
  backButton: PropTypes.bool,
  notifications: PropTypes.bool,
  rightText: PropTypes.bool,
  bottomButton: PropTypes.bool,
  right: PropTypes.bool,
  rightContent: PropTypes.string,
  thumbnail: PropTypes.bool,
  settings: PropTypes.bool,
  title: PropTypes.string,
  thumbnailURL: PropTypes.string,
  notificationsPress: PropTypes.func,
  thumbnailPress: PropTypes.func,
  goback: PropTypes.func,
  loading: PropTypes.bool
};

export default CustomHeader;
