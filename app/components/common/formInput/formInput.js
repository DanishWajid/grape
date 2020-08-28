import PropTypes from "prop-types";
import React from "react";
import { View, Item, Input, Text, Label } from "native-base";
import styles from "./styles";

const FormInput = ({
  input,
  label,
  secureTextEntry = false,
  meta: { touched, error }
}) => {
  let hasError = false;
  if (error !== undefined && error !== "") {
    hasError = true;
  }

  return (
    <Item error={hasError} style={styles.container}>
      <View style={styles.fieldCont}>
        <Label style={styles.inputTextLabel}>{label}</Label>
        <Input
          style={styles.inputText}
          {...input}
          secureTextEntry={secureTextEntry}
        />
        {touched && hasError ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : (
          <Text />
        )}
      </View>
    </Item>
  );
};

FormInput.propTypes = {
  children: PropTypes.any
};

export default FormInput;
