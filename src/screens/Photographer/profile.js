// @flow
import React, {Component} from 'react';
import {
    ScrollView, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Thumbnail
} from 'native-base';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImageComponent from '../../components/FlateList/explorComponent';
import Loader from '../../components/Loader';

const primary = require('../../theme/variables/commonColor').brandPrimary;

@inject('User')
@observer
class Profile extends Component {
  
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam('user', this.props.User),
            isMy: false
        };
    }

    componentWillMount () {
        if (this.props.User.uid === this.state.user.uid || !this.state.user.uid) {
            this.setState({ isMy: true });
        }
    }

    render () {
        const { photoURL, displayName, about, images } = this.state.user;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.header} >
                    {
                        this.state.isMy ? 
                            <TouchableOpacity 
                                style={{position: 'absolute', right: 20, top: 10}}
                                onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Icon name={'edit'} color={'#fff'} size={20} />
                            </TouchableOpacity> : 
                            <View />
                    }
                    <Thumbnail
                        source={{uri: photoURL}}
                    />
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.txtName}>{displayName}</Text>
                        <Text style={styles.txtAbout}>{about}</Text>
                    </View>
                </View>
                <View>
                    {
                        images.length > 0 ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    images.map((image, index) => {
                                        return (
                                            <ImageComponent
                                                key={index}
                                                uri={image.downloadURL}
                                                navigation={this.props.navigation}
                                                onPress={() => this.props.navigation.navigate('ZoomImage', { url: image.downloadURL, index, isMy: this.state.isMy, displayName })} 
                                            />
                                        );
                                    })
                                }
                            </View> : 
                            this.state.isMy ?
                                <TouchableOpacity style={styles.addContainer} onPress={() => this.props.navigation.navigate('ImageUpload', { ...this.state.user })}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name={'add'} size={20} style={{ marginRight: 8 }} color={'#fff'} />
                                        <Text style={{color : '#fff'}}>Add Images</Text>
                                    </View>
                                </TouchableOpacity> : 
                                <View />
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        backgroundColor: primary
    },
    txtName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 8
    },
    txtAbout: {
        color: '#fff',
        marginTop: 4
    },
    addContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 8,
        borderColor: '#fff',
        backgroundColor: '#01cca1'
    }
});

export default Profile;