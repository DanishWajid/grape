import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  content: {
    flexDirection: "row",
    height: 168,
    paddingHorizontal: 0,
    backgroundColor: "$darkGray"
  },
  upperText: {
    color: "$white",
    fontWeight: "700",
    fontSize: 15
  },
  lowerText: {
    color: "$white",
    fontSize: 11
  },
  selected: { borderColor: "$secondaryColor", borderRadius: 4, borderWidth: 1 },

  description: {
    color: "$white",
    fontSize: 13
  },

  cardItem: {
    backgroundColor: "$darkGray",
    paddingTop: 0,
    marginTop: 0
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 10
  },
  thumbnail: {
    height: 45,
    width: 45
  },
  outerBody: { alignSelf: "flex-start" },
  innerBody: {
    alignSelf: "center"
  }
});
