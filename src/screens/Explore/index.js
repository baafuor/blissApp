// @flow
import React, {Component} from "react";
import {Image, View,FlatList,} from "react-native";

import {
  Container,
  Content,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  
 Header,
  List,
  ListItem,
  Button,
  Icon
} from "native-base";
import { inject, observer } from 'mobx-react'


import styles from "./styles";

import ImageComponent from '../../components/FlateList/explorComponent'
const headerLogo = require("../../../assets/header-logo.png");
@inject('User')
@observer
class Explore extends Component {
  
  
  componentDidMount(){
        this.props.User.imageData
       
      }
  
  render() {
   
   
    return (
      <Container>
         <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right /> 
         
        </Header>
          <View style={{flex:1,}}>
            <FlatList
              data={this.props.User.imageData}
              numColumns={2}
              renderItem={(item) => { 
              return<ImageComponent navi={"Profile"} text={item.item.name} navigation={this.props.navigation}item={item.item}/>
              }}  
              keyExtractor={(item,index )=>  `${index}`}/>
        </View>
      </Container>
    );
  }
}

export default Explore

