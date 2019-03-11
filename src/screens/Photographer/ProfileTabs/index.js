// @flow
import React, { Component } from "react"
import { Image } from "react-native"

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Tabs,
  Tab,
  Text,
  TabHeading,
  
} from "native-base";

import styles from "./styles";

import TabOne from "./tabOne"
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";

const headerLogo = require('../../../../assets/header-logo.png')

class PhotographerTabs extends Component {
  
  render() {
    
    return (
      <Container>
        
        <Tabs style={{ backgroundColor: "#fff"}}>
        <Tab 
            heading={
              <TabHeading >
                
                <Text>Profile</Text>
              </TabHeading>
            }
          >
            <TabOne navigation={this.props.navigation}/>
            
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
