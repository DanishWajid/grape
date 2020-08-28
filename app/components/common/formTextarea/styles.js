import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    borderColor: "transparent",
    padding: 0,
    marginLeft: 0
  },

  fieldCont: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 0
  },
  inputTextLabel: {
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5
  },
  textArea: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    borderRadius: 5
  }
});
