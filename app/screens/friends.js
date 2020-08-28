import React, { Component } from "react";
import { CustomHeader } from "../components/common/customHeader";
import { HfContainer } from "../components/container";
import { ItemList } from "../components/itemList";
import notification from "../Data/notification";

class Friends extends Component {
  render() {
    return (
      <HfContainer>
        <CustomHeader
          title={"Friends"}
          goback={() => this.props.navigation.goBack()}
          backButton={true}
          right={true}
        />

        <ItemList list={notification} users={true} />
      </HfContainer>
    );
  }
}

export default Friends;
