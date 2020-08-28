import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1
  },

  fieldsView: {
    flex: 4,
    padding: 25,
    justifyContent: "space-around",
    alignContent: "center"
  },

  nextButton: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 30
  }
});
