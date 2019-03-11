
// @flow
import React, {Component} from "react";
import {Image, ImageBackground,Dimensions,Platform, View,TouchableOpacity,FlatList, ListView} from "react-native";

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

@inject('User')
@observer
class TabThree extends Component {
  
  
  componentDidMount(){
        this.props.User.imageData
      }
  render() {
    
    const navigation = this.props.navigation;
    return (
       <View style={{flex:1}}>
          <FlatList 
               data={this.props.User.imageData}
                numColumns={2}
                renderItem={(item) => {
                  return<TouchableOpacity
                    onPress={()=>navigation.navigate('Channel')}
                  >
                    <ImageBackground style={{margin:1,
                      height:Dimensions.get("window").height/ 4 + 10,
                      width:Dimensions.get("window").width / 2 + 2,
                    }} source={item.item.image}>
                    
                    {/* <Text
                      style={
                        Platform.OS === "android"
                          ? styles.achannelImgText
                          : styles.ioschannelImgText
                      }
                    >
                     {item.item.name}
                    </Text> */}
                    </ImageBackground></TouchableOpacity>
             }}
                keyExtractor={(item,index )=>  `${index}`}/>
               
        </View>
      
    );
  }
}

export default TabThree


