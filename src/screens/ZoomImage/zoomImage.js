import React,{Component} from 'react'
import {View,Image,Dimensions,Text,ScrollView,ImageBackground} from 'react-native'


export default class ZoomImage extends Component{
render(){
    url= this.props.navigation.getParam('url')
    return(
       
          
           <ImageBackground  style={{height: Dimensions.get('window').height, 
          width: Dimensions.get('window').width}} source={url.image} 
          resizeMode={'cover'}>
          <View style={{backgroundColor:"#00000066",
                        bottom:0,position:'absolute',
                        alignItems:'center',width:'100%',height:70}}>
              <Text style={{color:'white',}}>{url.name}</Text>
          </View>
          </ImageBackground>
          
        
       
    )
}
}