import PropTypes from "prop-types";
import React from "react";
import { TextInput, Text, View } from "react-native";
import styles from "./styles";

const CustomInput = props => {
  const {
    label,
    defaultValue,
    handleChange,
    height,
    touched,
    errors,
    type
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { height: height }]}
        defaultValue={defaultValue}
        placeholderTextColor="white"
        onChangeText={text => handleChange(text)}
        {...props}
      />
      {touched[type] && errors[type] && (
        <Text style={{ fontSize: 13, color: "red" }}>{errors[type]}</Text>
      )}
    </View>
  );
};

CustomInput.propTypes = {
  children: PropTypes.any
};

export default CustomInput;
