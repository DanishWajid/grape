import PropTypes from "prop-types";
import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./styles";

const Spinner = ({ children }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItem: "center"
    }}
  >
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

Spinner.propTypes = {
  children: PropTypes.any
};

export default Spinner;
