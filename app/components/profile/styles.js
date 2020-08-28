import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  profileHeaderContainer: { alignItems: "center" },
  thumbnail: { marginVertical: 10 },
  description: {
    color: "$white",
    alignSelf: "center",
    textAlign: "center"
  },
  link: {
    color: "$secondaryColor"
  },
  outerView: {
    flex: 1
  },
  innerView: {
    flex: 1,
    paddingTop: "3%"
  }
});
