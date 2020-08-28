import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  content: {
    flexDirection: "row",

    paddingVertical: 15
  },
  upperText: {
    color: "$white",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "flex-start"
  },

  description: {
    color: "$white",
    fontSize: 13,
    alignSelf: "flex-start"
  },

  body: {
    paddingLeft: 10
  },
  comment: {
    color: "#fff",
    paddingLeft: 10,
    fontSize: 15,
    alignSelf: "center"
  },
  view: { flexDirection: "row", alignSelf: "flex-start" }
});
