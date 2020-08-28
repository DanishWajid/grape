import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  content: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  txt: {
    color: "$white",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "flex-start"
  },

  body: {
    paddingLeft: 10
  },
  left: { alignItems: "flex-end" }
});
