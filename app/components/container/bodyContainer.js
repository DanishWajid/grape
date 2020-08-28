import PropTypes from "prop-types";
import React from "react";
import { StatusBar } from "react-native";
import { Container, StyleProvider } from "native-base";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
import getTheme from "./../../../native-base-theme/components";
import commonColor from "./../../../native-base-theme/variables/commonColor";

const BodyContainer = ({ children }) => {
  const containerStyles = [styles.bodyContainer];

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={containerStyles}>
        <StatusBar
          backgroundColor={EStyleSheet.value("$primaryColor")}
          barStyle="light-content"
        />
        {children}
      </Container>
    </StyleProvider>
  );
};

Container.propTypes = {
  children: PropTypes.any
};

export default BodyContainer;
