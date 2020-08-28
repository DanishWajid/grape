import PropTypes from "prop-types";
import React from "react";
import { Formik } from "formik";
import { View, Item, Input, Text, Label } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const NoLabelInput = props => {
  const { btn, handleChange, touched, errors, type } = props;
  return (
    // <Item style={styles.container}>
    <View style={styles.reactionsInnerView}>
      <Input
        style={styles.reactionsInputText}
        placeholderTextColor="#95989A"
        onChangeText={text => handleChange(text)}
        {...props}
      />
      {btn && (
        <MaterialCommunityIcons
          style={{
            color: "#fff",
            alignSelf: "center",
            flexDirection: "row",
            transform: [{ rotate: "90deg" }]
          }}
          size={30}
          name="navigation"
          onPress={onPress}
        />
      )}
      {touched[type] && errors[type] && (
        <Text style={{ fontSize: 13, color: "red" }}>{errors[type]}</Text>
      )}
    </View>
    // </Item>
  );
};

NoLabelInput.propTypes = {
  children: PropTypes.any
};

export default NoLabelInput;
