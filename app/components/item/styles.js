import EStyleSheet from "react-native-extended-stylesheet";
import { myHeight } from "../../utils";

export default EStyleSheet.create({
  background: {
    width: "100%",
    height: "100%"
  },
  video: {
    // flex: 1
    height: myHeight,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  icon: {
    width: "100%",
    textAlign: "right"
  },
  reload: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  innerConntent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 40,
    flex: 1,
    justifyContent: "flex-end"
  },

  body: {
    paddingLeft: 10
  },
  description: {
    color: "$white"
  },
  reaction: {
    marginTop: 10,
    fontWeight: "900",
    color: "$white"
  }
});
