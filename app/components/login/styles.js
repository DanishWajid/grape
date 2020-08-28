import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1
  },

  topView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  fieldsView: {
    flex: 4,
    padding: 25,
    justifyContent: "space-around",
    alignContent: "center"
  },

  appName: {
    color: "$primaryColor",
    fontSize: 45,
    fontWeight: "bold"
  },

  inputTextLabel: {
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5
  },

  inputText: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 15,
    height: 40
  },

  lastView: { position: "absolute", bottom: 20, left: 25 }
});
