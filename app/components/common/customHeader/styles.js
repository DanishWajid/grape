import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  header: {
    backgroundColor: "$primaryColor"
  },
  leftIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    color: "$white",
    textAlign: "left"
  },
  rightIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    color: "$white",
    textAlign: "right"
  },
  title: { fontWeight: "bold" },
  rightText: {
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "center",
    color: "#fff",
    paddingRight: 10
  }
});
