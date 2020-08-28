import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    backgroundColor: "$darkGray",
    flex: 1
  },

  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  nextButton: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 30
  },

  inputTextLabel: {
    color: "$white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
    alignSelf: "flex-start"
  },

  stepTwoText: {
    color: "$white",
    textAlign: "center",
    marginTop: -50,
    marginBottom: 50,
    fontWeight: "900"
  },

  btnLogin: {
    color: "$white",
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "$primaryColor",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 20
  },

  backgroundHeader: {
    backgroundColor: "$primaryColor",
    height: 80
  }
});
