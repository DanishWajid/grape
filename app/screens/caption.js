import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer, BodyContainer } from "../components/container";
import NoLabelInput from "../components/common/formInput/noLabelInput";
import EStyleSheet from "react-native-extended-stylesheet";
import { View } from "native-base";
import { Image } from "react-native";
import { VideoItem } from "../components/item";
import { Formik } from "formik";
import * as yup from "yup";

class Caption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  handleSubmit = (values, response, image) => {
    this.setState({ loading: true });
    this.props.navigation.navigate("SelectAlbum", { values, response, image });
    this.setState({ loading: false });
  };
  render() {
    const { response, image } = this.props.navigation.state.params;
    const { loading } = this.state;
    return (
      <HfContainer>
        <Formik
          initialValues={{
            caption: ""
          }}
          onSubmit={values => this.handleSubmit(values, response, image)}
          validationSchema={yup.object().shape({
            caption: yup.string()
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
            setFieldValue
          }) => (
            <React.Fragment>
              <CustomHeader
                right={true}
                rightText={true}
                rightContent="Next"
                backButton={true}
                thumbnailPress={handleSubmit}
                goback={() => this.props.navigation.goBack()}
                loading={loading}
              />
              {image ? (
                <Image
                  resizeMode="contain"
                  source={{
                    uri: response.uri
                  }}
                  style={styles.image}
                />
              ) : (
                <VideoItem
                  name={"Danish"}
                  thumbnailURL={""}
                  reactions={12}
                  muted={false}
                  description={"Anything"}
                  video={response.uri}
                  noInfo={true}
                />
              )}

              <View style={styles.input}>
                <NoLabelInput
                  value={values.caption}
                  handleChange={handleChange("caption")}
                  onBlur={() => setFieldTouched("caption")}
                  type="caption"
                  touched={touched}
                  errors={errors}
                  placeholder="Add Caption..."
                />
              </View>
            </React.Fragment>
          )}
        </Formik>
      </HfContainer>
    );
  }
}
const styles = EStyleSheet.create({
  image: { flex: 1, height: "100%", width: "100%" },
  input: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end"
  }
});

export default Caption;
