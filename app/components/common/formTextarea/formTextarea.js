import PropTypes from "prop-types";
import React from "react";
import { View, Item, Text, Label, Textarea } from "native-base";
import styles from "./styles";

const FormInput = ({
  input,
  label,
  rowSpan,
  meta: { touched, error, warning }
}) => {
  let hasError = false;
  if (error !== undefined && error !== "") {
    hasError = true;
  }

  return (
    <Item error={hasError} style={styles.container}>
      <View style={styles.fieldCont}>
        <Label style={styles.inputTextLabel}>{label}</Label>
        <Textarea style={styles.textArea} {...input} rowSpan={rowSpan} />
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
