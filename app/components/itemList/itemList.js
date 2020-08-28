import React from "react";
import PropTypes from "prop-types";
import { ScrollView, FlatList } from "react-native";
import { FeedCard } from "../feedCard";
import { Notification } from "../notification";
import { Users } from "../users";
import styles from "./styles";

const ItemList = ({
  list,
  feedCard,
  notification,
  users,
  diaries,
  itemPress,
  comment,
  thumbnailPress,
  isRefreshing,
  handleRefresh,
  handleLoadMore,
  renderFooter,
  loading,
  disable,
  onSelect,
  noSelect,
  selectedIndex,
  extraData
}) => (
  <FlatList
    data={list}
    style={styles.flatList}
    renderItem={({ item, index }) => (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {feedCard && (
          <FeedCard
            name={item.username}
            imageURL={item.picture.url}
            thumbnail={item.picture.thumbnail}
            heading={item.diary_name}
            noSelect={noSelect}
            description={item.picture.caption}
            others={item.others}
            thumbnailPress={() => thumbnailPress(item)}
            thumbnailURL={item.user_pic}
            itemPress={() => itemPress(item)}
          />
        )}
        {notification && (
          <Notification
            name={item.target_username}
            thumbnailURL={item.target_user_pic}
            comment={comment}
            time={item.time}
            itemPress={() => itemPress(item)}
            description={item.message}
          />
        )}
        {users && (
          <Users
            name={item.name}
            thumbnailURL={item.pic}
            online={item.online}
            thumbnailPress={() => thumbnailPress(item)}
          />
        )}
        {diaries && (
          <FeedCard
            name={item.owner.username}
            imageURL={item.latest_picture.url}
            thumbnail={item.latest_picture.thumbnail}
            heading={item.name}
            description={item.latest_picture.caption}
            others={item.others}
            disable={disable}
            noSelect={noSelect}
            onSelect={() => onSelect(item, index)}
            index={index}
            thumbnailURL={item.owner.pic}
            thumbnailPress={() => thumbnailPress(item)}
            itemPress={() => itemPress(item)}
            selectedIndex={selectedIndex}
          />
        )}
      </ScrollView>
    )}
    refreshing={isRefreshing}
    onRefresh={handleRefresh}
    onMomentumScrollEnd={handleLoadMore}
    onEndThreshold={0}
    ListFooterComponent={renderFooter(loading)}
    keyExtractor={item => item._id}
    extraData={extraData}
  />
);

ItemList.propTypes = {
  children: PropTypes.any
};

export default ItemList;
