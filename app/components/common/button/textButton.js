import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const TextButton = props => {
  const { title, small } = props;
  const textStyles = [styles.bigBtnText];

  if (small === true) {
    textStyles.push(styles.smallBtnText);
  }

  return (
    <TouchableOpacity transparent {...props}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

TextButton.propTypes = {
  title: PropTypes.string,
  small: PropTypes.bool
};

export default TextButton;
