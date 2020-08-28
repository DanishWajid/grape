import React from "react";
import PropTypes from "prop-types";
import { ScrollView, FlatList, Image } from "react-native";
import { Card, View, CardItem } from "native-base";
import styles from "./styles";

const ItemHorizontal = ({ list, itemPress }) => (
  <View style={styles.outerView}>
    <FlatList
      data={list}
      horizontal={true}
      renderItem={({ item }) => (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Card style={styles.card}>
            <CardItem
              button
              onPress={() => itemPress(item)}
              cardBody
              style={styles.cardItem}
            >
              <Image
                style={styles.image}
                source={{
                  uri: item.imageURL
                }}
              />
            </CardItem>
          </Card>
        </ScrollView>
      )}
      keyExtractor={item => item.key}
    />
  </View>
);

ItemHorizontal.propTypes = {
  list: PropTypes.array,
  itemPress: PropTypes.func
};

export default ItemHorizontal;
