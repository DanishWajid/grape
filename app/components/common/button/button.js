import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "native-base";
import { Text } from "react-native";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

const CustomButton = props => {
  const { loading, title } = props;

  return (
    <Button style={styles.btn} rounded primary {...props}>
      {loading ? (
        <Spinner
          size="small"
          style={styles.spinner}
          color={EStyleSheet.value("$white")}
        />
      ) : (
        <Text style={styles.txt}>{title}</Text>
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool
};

export default CustomButton;
