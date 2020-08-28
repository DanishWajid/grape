import PropTypes from "prop-types";
import React from "react";
import { Item, Input, Text, Label } from "native-base";
import styles from "./styles";

const SearchInput = ({ searchPress, search }) => {
  return (
    <Item style={styles.container}>
      <Input
        style={styles.searchInputText}
        placeholder="find friends"
        placeholderTextColor="#878787"
        onChangeText={text => searchPress(text)}
        onSubmitEditing={() => search()}
      />
    </Item>
  );
};

SearchInput.propTypes = {
  children: PropTypes.any
};

export default SearchInput;
