import React, { Component } from 'react';
import {
    TouchableHighlight,
    ImageBackground,
    Text,
    View,
    Dimensions
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

export default class ImageComponent extends Component {

    render () {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.props.onPress()}>
                <ImageBackground  transparent style={{
                    height:Dimensions.get('window').height / 4 + 10,
                    width:Dimensions.get('window').width / 2,
                }} 
                source={{uri: this.props.uri}}>
                    {this.props.text ?
                        <View 
                            transparent 
                            style={{ backgroundColor:'#33333399', alignItems: 'flex-end' }}>
                            <Text 
                                transparent
                                style={{
                                    fontSize: 12,
                                    fontWeight: '900',
                                    bottom:10,
                                    marginTop: deviceHeight / 4 - 6,    
                                    color:'white',
                                    marginRight: 8
                                }} >
                                {this.props.text}
                            </Text>
                        </View> : 
                        <View/>
                    }
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}
