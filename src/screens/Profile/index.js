// @flow
import React, {Component} from 'react';
import { ImageBackground } from 'react-native';

import {
    Container,
    View
} from 'native-base';
import {inject,observer} from 'mobx-react';
import CustomHeader from '../../components/CustomHeader';
import ProfileTab from '../Photographer/profile';

import styles from './styles';

@inject('User')
@observer
class Profile extends Component {

    render () {
        const navigation = this.props.navigation;
        return (
            <Container>
                <ImageBackground
                    source={require('../../../assets/bg-transparent.png')}
                    style={styles.container}>
                    <CustomHeader hasTabs navigation={navigation} isBack />
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <ProfileTab navigation={navigation}/>
                    </View>
                </ImageBackground>
            </Container>
        );
    }
}

export default Profile;
