import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { Tab, Tabs } from "native-base";
import { ItemList } from "../itemList";

const CustomTabs = ({
  firstLabel,
  secondLabel,
  itemPress,
  thumbnailPress,
  myDiaries,
  contributorDiaries,
  myDiariesRefresh,
  myDiariesLoadMore,
  renderMyDiariesFooter,
  loadingMyDiaries,
  contributorsDiariesRefresh,
  contributorsDiariesLoadMore,
  renderContributorsDiariesFooter,
  loadingContributorsDiaries,
  isRefreshing,
  disable,
  onSelect,
  noSelect,
  extraData,
  selectedIndex,
  onTabChange
}) => (
  <Tabs
    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
    onChangeTab={onTabChange}
    initialPage={0}
  >
    <Tab
      tabStyle={styles.tabStyle}
      activeTabStyle={styles.activeTabStyle}
      textStyle={styles.textStyle}
      heading={firstLabel}
    >
      <ItemList
        itemPress={itemPress}
        onSelect={onSelect}
        thumbnailPress={thumbnailPress}
        list={myDiaries}
        diaries={true}
        disable={disable}
        noSelect={noSelect}
        selectedIndex={selectedIndex}
        isRefreshing={isRefreshing}
        handleRefresh={myDiariesRefresh}
        handleLoadMore={myDiariesLoadMore}
        renderFooter={renderMyDiariesFooter}
        loading={loadingMyDiaries}
        extraData={extraData}
      />
    </Tab>
    <Tab
      tabStyle={styles.tabStyle}
      activeTabStyle={styles.activeTabStyle}
      textStyle={styles.textStyle}
      heading={secondLabel}
    >
      <ItemList
        itemPress={itemPress}
        thumbnailPress={thumbnailPress}
        list={contributorDiaries}
        onSelect={onSelect}
        noSelect={noSelect}
        diaries={true}
        disable={disable}
        selectedIndex={selectedIndex}
        isRefreshing={isRefreshing}
        handleRefresh={contributorsDiariesRefresh}
        handleLoadMore={contributorsDiariesLoadMore}
        renderFooter={renderContributorsDiariesFooter}
        loading={loadingContributorsDiaries}
        extraData={extraData}
      />
    </Tab>
  </Tabs>
);

CustomTabs.propTypes = {
  children: PropTypes.any
};

export default CustomTabs;
