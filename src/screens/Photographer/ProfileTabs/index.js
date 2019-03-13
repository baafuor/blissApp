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
import TabThree from "./tabThree";

class PhotographerTabs extends Component {
  
  render() {  
    return (
      <Container>
        <Tabs style={{ backgroundColor: "#fff"}}>
          <Tab heading="Profile">
            <Profile navigation={this.props.navigation}/>
          </Tab>  
          <Tab heading="Availability">
            <TabTwo navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Book ">
            <TabThree navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default PhotographerTabs;
