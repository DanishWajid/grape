import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  tabBarUnderlineStyle: {
    borderBottomColor: "$darkGray",
    borderBottomWidth: 5
  },
  tabStyle: { backgroundColor: "$darkGray" },
  activeTabStyle: { backgroundColor: "$darkGray" },
  textStyle: { color: "$lightGray", fontWeight: "bold" }
});
