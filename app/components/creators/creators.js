import React from "react";
import PropTypes from "prop-types";
import { ScrollView, FlatList } from "react-native";
import { View, CardItem, Thumbnail } from "native-base";
import { Heading } from "../common/heading";
import styles from "./styles";

const Creators = ({ list, thumbnailPress }) => (
  <View style={styles.outerView}>
    <Heading text="Creators" />
    <FlatList
      data={list}
      horizontal={true}
      renderItem={({ item }) => (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <CardItem
            button
            onPress={() => thumbnailPress(item)}
            cardBody
            style={styles.cardItem}
          >
            <Thumbnail
              large
              style={styles.thumbnail}
              source={{
                uri: item.thumbnailURL
              }}
            />
          </CardItem>
        </ScrollView>
      )}
      keyExtractor={item => item.key}
    />
  </View>
);

Creators.propTypes = {
  list: PropTypes.array,
  thumbnailPress: PropTypes.func
};

export default Creators;
