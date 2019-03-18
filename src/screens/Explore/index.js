// @flow
import React, {Component} from 'react';
import {Image, View,FlatList,} from 'react-native';

import {
    Container,
    Left,
    Right,
    Body,
    Header,
    Button,
    Icon
} from 'native-base';
import { inject, observer } from 'mobx-react';

import styles from './styles';
import Loader from '../../components/Loader';
import ImageComponent from '../../components/FlateList/explorComponent';

const headerLogo = require('../../../assets/header-logo.png');

@inject('User')
@observer
class Explore extends Component {

    constructor (props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true
        };
    }

    async componentDidMount () {
        const users = await this.props.User.getPhotographer();
        this.setState({ users, isLoading: false });
    }
  
    render () {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon active name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Image source={headerLogo} style={styles.imageHeader} />
                    </Body>
                    <Right />
                </Header>
                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.users}
                        numColumns={2}
                        renderItem={({item}) => {
                            return (
                                <ImageComponent 
                                    text={item.displayName}
                                    navigation={this.props.navigation}
                                    uri={item.photoURL}
                                    onPress={() => this.props.navigation.navigate('Profile', { user: item })}
                                />
                            );
                        }}  
                        keyExtractor={(item,index)=>  `${index}`}
                    />
                </View>
                {this.state.isLoading ? <Loader color={'transparent'} /> : <View />} 
            </Container>
        );
    }
}

export default Explore;

