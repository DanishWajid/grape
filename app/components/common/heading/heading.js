import React from "react";
import PropTypes from "prop-types";
import { Text } from "native-base";
import styles from "./styles";

const Heading = ({ text, itemTitle }) => {
  const headingStyles = [styles.heading];

  if (itemTitle === true) {
    headingStyles.push(styles.itemTitle);
  }

  return <Text style={headingStyles}>{text}</Text>;
};

Heading.propTypes = {
  text: PropTypes.string,
  itemTitle: PropTypes.bool
};

export default Heading;
