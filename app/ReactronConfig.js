import Reactotron from "reactotron-react-native";

Reactotron.configure({ host: "192.168.0.112" })
  // Reactotron.configure({ host: "192.168.18.28" })
  .useReactNative()
  .connect();
