if (__DEV__) {
  import("./ReactronConfig");
}
import React, { Component } from "react";
import DropdownAlert from "react-native-dropdownalert";
import EStyleSheet from "react-native-extended-stylesheet";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "react-redux";
import { Root } from "native-base";
import { YellowBox } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";
import MainApp from "./config/routes";
import { AlertProvider } from "./components/alert";
import configureStore from "./config/store";

import SplashScreenPage from "./screens/splash";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);

EStyleSheet.build({
  $primaryColor: "#9F22A2",
  $secondaryColor: "#0DBCEA",
  $darkGray: "#171717",
  $lightGray: "#3E3E3E",
  $primaryCrimson: "#ef3938",
  $primaryDarkSlateGray: "#363c48",
  $white: "#FFFFFF",

  $fontFamily: "Montserrat"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    const { store, persistor } = configureStore();
    this.state = {
      store,
      persistor
    };
  }

  unsubscribe;
  dropDownAlertRef;

  handleNetworkChange = state => {
    if (!this.dropDownAlertRef) return;

    if (!state.isConnected) {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        "Network Disconnected"
      );
    }
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.dropDownAlertRef.alertWithType("error", "Error", "No Network");
      }
    });

    this.unsubscribe = NetInfo.addEventListener(this.handleNetworkChange);
  }

  componentWillUnmount() {
    unsubscribe();
  }

  render() {
    return (
      <Root>
        <Provider store={this.state.store}>
          <PersistGate
            loading={<SplashScreenPage />}
            persistor={this.state.persistor}
          >
            <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
            <AlertProvider>
              <MainApp />
            </AlertProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
