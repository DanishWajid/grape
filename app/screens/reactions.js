import React, { Component } from "react";
import { CustomHeader } from "./../components/common/customHeader";
import { HfContainer, BodyContainer } from "./../components/container";
import profile from "../Data/profile";
import notification from "../Data/notification";
import { Creators } from "../components/creators";
import { Field, reduxForm } from "redux-form";
import { ItemHorizontal, ItemList } from "../components/itemList";
import { View } from "native-base";
import NoLabelInput from "../components/common/formInput/noLabelInput";
import EStyleSheet from "react-native-extended-stylesheet";

class Reactions extends Component {
  thumbnailPress = data => {
    this.props.navigation.navigate("UserProfile", { ...data });
  };

  itemPress = data => {
    this.props.navigation.navigate("FeedItem", { ...data });
  };

  reaction = data => {
    alert("I'm Pressed");
  };
  renderFooter = loading => {
    return null;
  };

  render() {
    return (
      <HfContainer>
        <CustomHeader
          title={"My Summer Adventure"}
          goback={this.props.onPress}
          bottomButton={true}
          right={true}
          settings={true}
        />

        <View style={styles.creatorsView}>
          <Creators list={profile} thumbnailPress={this.thumbnailPress} />
        </View>

        <ItemHorizontal list={profile} itemPress={this.itemPress} />
        <BodyContainer>
          <ItemList
            list={notification}
            comment={true}
            notification={true}
            renderFooter={this.renderFooter}
          />
        </BodyContainer>

        {/* <Field name="name" component={ReactionInput} onPress={this.reaction} /> */}
        <NoLabelInput btn={true} placeholder="Enter reaction..." />
      </HfContainer>
    );
  }
}
const styles = EStyleSheet.create({
  creatorsView: { flex: 0.5, paddingHorizontal: 15, paddingTop: 10 }
});

export default Reactions;
