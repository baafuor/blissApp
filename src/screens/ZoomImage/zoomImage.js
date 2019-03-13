import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  ImageBackground
} from 'react-native';
import { inject } from 'mobx-react';

@inject('User')
export default class ZoomImage extends Component{
  render(){
    url= this.props.navigation.getParam('url')
    return(
      <ImageBackground
        style={{
          height: Dimensions.get('window').height, 
          width: Dimensions.get('window').width
        }}
        source={{uri: url}}
        resizeMode={'cover'}>
        <View style={{
          backgroundColor:"#00000066",
          bottom:0,position:'absolute',
          alignItems:'center',
          width:'100%',
          height:70
        }}>
          <Text style={{color:'white', marginTop: 16 }}>{this.props.User.displayName}</Text>
        </View>
      </ImageBackground> 
    )
  }
}