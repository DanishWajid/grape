import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: { flexDirection: "column", marginVertical: 5 },
  label: { fontSize: 17, color: "white", fontWeight: "bold" },
  input: {
    backgroundColor: "$lightGray",
    color: "$white",
    fontFamily: "$fontFamily",
    fontSize: 15,
    paddingVertical: 0,
    marginVertical: 0,
    textAlign: "left",
    borderRadius: 5,
    paddingHorizontal: 10
  }
});
