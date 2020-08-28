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
  inputText: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 15,
    height: 40,
    paddingVertical: 0,
    marginVertical: 0,
    borderRadius: 5
  },
  searchInputText: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 15,
    height: 40,
    paddingVertical: 0,
    marginVertical: 0,
    textAlign: "center",
    borderRadius: 20
  },
  reactionsInputText: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 15,
    height: 60,
    paddingVertical: 0,
    marginVertical: 0
  },
  reactionsInnerView: {
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: "$lightGray"
  }
});
