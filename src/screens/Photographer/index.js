// @flow
import React, { Component } from "react"
import {
  Container,
  Tabs,
  Tab,
  Text,
  TabHeading
} from "native-base";

import Profile from "./profile"
import TabTwo from "./tabTwo";
import Book from "./book";

import CustomHeader from "../../components/CustomHeader";

class PhotographerTabs extends Component {
  
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <CustomHeader hasTabs navigation={navigation} isBack/>
        <Tabs style={{ backgroundColor: "#fff"}}>
          <Tab heading="Profile">
            <Profile navigation={this.props.navigation}/>
          </Tab>  
          <Tab heading="Availability">
            <TabTwo navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Book ">
            <Book navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default PhotographerTabs;
