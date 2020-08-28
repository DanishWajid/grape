import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  outerView: { flex: 0.46 },
  scrollView: {
    backgroundColor: "$darkGray"
  },
  flatList: {
    backgroundColor: "$darkGray"
  },
  image: { height: 100, width: 80, flex: 1, borderRadius: 10 },
  card: {
    backgroundColor: "$darkGray",
    borderColor: "$darkGray",
    borderRadius: 10
  },
  cardItem: {
    backgroundColor: "$darkGray",
    borderColor: "$darkGray",
    borderRadius: 10,
    borderWidth: 2
  }
});
