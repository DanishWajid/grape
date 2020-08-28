import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const Camera = props => (
  <Icon {...props} name="camera" style={styles.icon} size={40} />
);

export default Camera;
