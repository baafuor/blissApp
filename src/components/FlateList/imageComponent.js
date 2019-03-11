import React,{Component} from 'react'
import {TouchableHighlight,ImageBackground,Text,View,Dimensions,Platform} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
export default class ImageComponent extends Component{
    render(){
        return(
            <TouchableHighlight
            underlayColor={'transparent'}
            
                    onPress={()=>this.props.navigation.navigate("ZoomImage",{url:this.props.item})}
                  >
                    <ImageBackground  transparent style={{
                     
                      height:Dimensions.get("window").height/ 4 + 10,
                      width:Dimensions.get("window").width / 2 + 2,
                    }} source={this.props.item.image}>
                   {this.props.text ?
                   <View transparent style={{backgroundColor:'#33333399',}}><Text transparent
                       style={{fontSize: 12,
                        
                            fontWeight: "900",
                            marginLeft: 100,
                            bottom:10,
                            marginTop: deviceHeight / 4 - 6,
                           
                            color:'white'
                          }}
                    >
                      {this.props.text}
                    </Text></View>:<View/>}
                    
                    </ImageBackground>
                    </TouchableHighlight>
        )
    }
}
