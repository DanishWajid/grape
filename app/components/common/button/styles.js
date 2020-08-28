import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  btn: {
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    marginVertical: 10,
    height: 30
  },
  spinner: {
    paddingHorizontal: 20,
    alignSelf: "center",
    height: 15,
    fontSize: 15
  },
  txt: { fontWeight: "bold", color: "white" },
  smallBtnText: {
    color: "$secondaryColor",
    fontSize: 15,
    fontWeight: "bold"
  },
  bigBtnText: {
    color: "$primaryColor",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    padding: 20
  }
});
