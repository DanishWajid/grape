import React from "react";
import PropTypes from "prop-types";
import { CustomButton } from "../common/button";
import { Thumbnail, Text, View } from "native-base";
import { TouchableHighlight, Linking } from "react-native";
import { Heading } from "../common/heading";
import styles from "./styles";

const ProfileHeader = props => {
  const {
    name,
    imageURL,
    description,
    link,
    siteURL,
    head,
    btnTitle,
    loading
  } = props;

  return (
    <View style={styles.profileHeaderContainer}>
      {head && (
        <View style={styles.profileHeaderContainer}>
          <Thumbnail
            large
            style={styles.thumbnail}
            source={{
              uri: imageURL
            }}
          />
          <Heading text={name} />
          <Text style={styles.description}>{description}</Text>
        </View>
      )}

      {link ? (
        <TouchableHighlight
          onPress={() => {
            Linking.openURL(siteURL);
          }}
        >
          <Text style={styles.link}>{siteURL}</Text>
        </TouchableHighlight>
      ) : (
        <CustomButton loading={loading} title={btnTitle} {...props} />
      )}
    </View>
  );
};

ProfileHeader.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  description: PropTypes.string,
  siteURL: PropTypes.string,
  link: PropTypes.bool,
  head: PropTypes.bool,
  btnTitle: PropTypes.string
};

export default ProfileHeader;
