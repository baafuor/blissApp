import React, { Component } from 'react';
import { Dimensions, ImageBackground} from 'react-native';
import { inject, observer } from 'mobx-react';

import { load } from  '../../utils/db';

@inject('User')
@observer
export default class Splash extends Component {
    
    componentDidMount () {
        load(async (err, result) => {
            if (result) {
                console.log(JSON.parse(result));
                const user = await this.props.User.getById(JSON.parse(result).uid);
                if (user) {
                    this.props.User.set(JSON.parse(result));
                    this.props.navigation.replace('Drawer');
                } else {
                    this.props.navigation.replace('Login');    
                }
            } else {
                this.props.navigation.replace('Login');
            }
        });
    }

    render () {
        return (
            <ImageBackground 
                style={{height:Dimensions.get('window').height,
                    width:Dimensions.get('window').width}}
                source={require('../../../assets/launch-screen.png')} />
        );
    }
}