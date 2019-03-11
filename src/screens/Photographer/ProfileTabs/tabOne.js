// @flow
import React, {Component} from "react";
import {Image, ImageBackground,ScrollView, View,TouchableOpacity,FlatList, ListView} from "react-native";

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
import {Grid, Col} from "react-native-easy-grid";

import { inject, observer } from 'mobx-react'
import styles from "./styles";

import ImageComponent from '../../../components/FlateList/imageComponent'





const headerLogo = require("../../../../assets/header-logo.png");
@inject('User')
@observer
class TabOne extends Component {
  
  
  componentDidMount(){
        this.props.User.imageData
      }
  
  render() {
   
   
    return (
      <ScrollView>
        <View style={{flex:1}}>
        <View style={styles.profileInfoContainer}>
            <View style={{alignSelf: "center"}}>
              <Thumbnail
                source={require("../../../../assets/Contacts/user.png")}
                style={styles.profilePic}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileUser}>{this.props.User.userName}</Text>
              <Text note style={styles.profileUserInfo}>
                {this.props.User.aboutUser}
               </Text>
            </View>
           
          </View>
         
            <FlatList
             data={this.props.User.imageData}
             numColumns={2}
             renderItem={(item) => { 
             return<ImageComponent navi={"Profile"} navigation={this.props.navigation}item={item.item}/>
            }}
            
            keyExtractor={(item,index )=>  `${index}`}/>
           </View>
           
           
           </ScrollView>
    
    );
  }
}

export default TabOne

