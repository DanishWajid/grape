import React from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import { Content, CardItem, Thumbnail, Text, Body } from "native-base";
import { Heading } from "../common/heading";
import styles from "./styles";

const FeedCard = ({
  name,
  imageURL,
  thumbnail,
  thumbnailURL,
  description,
  heading,
  others,
  itemPress,
  thumbnailPress,
  disable,
  onSelect,
  noSelect,
  selectedIndex,
  index
}) => (
  <TouchableOpacity disabled={noSelect} onPress={onSelect}>
    <Content
      padder
      contentContainerStyle={[
        styles.content,
        disable ? (selectedIndex === index ? styles.selected : null) : null
      ]}
    >
      <TouchableOpacity
        style={{ flex: 0.45 }}
        disabled={disable}
        onPress={itemPress}
      >
        <Image
          style={styles.image}
          source={{
            uri: thumbnail ? thumbnail : imageURL
          }}
        />
      </TouchableOpacity>
      <Body style={styles.outerBody}>
        <CardItem style={styles.cardItem}>
          <TouchableOpacity disabled={disable} onPress={thumbnailPress}>
            <Thumbnail
              scaleX={0.8}
              scaleY={0.8}
              style={styles.thumbnail}
              source={{
                uri: thumbnailURL
              }}
            />
          </TouchableOpacity>

          <Body style={styles.innerBody}>
            <Text style={styles.upperText}>{name}</Text>
            <Text style={styles.lowerText}>+{others} Others</Text>
          </Body>
        </CardItem>

        <CardItem style={styles.cardItem}>
          <Body>
            <TouchableOpacity disabled={disable} onPress={itemPress}>
              <Heading text={heading} />
              <Text style={styles.description}>{description}</Text>
            </TouchableOpacity>
          </Body>
        </CardItem>
      </Body>
    </Content>
  </TouchableOpacity>
);

FeedCard.propTypes = {
  children: PropTypes.any
};

export default FeedCard;
