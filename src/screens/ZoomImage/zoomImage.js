import React from 'react';
import {
    View,
    Dimensions,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { inject } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';

@inject('User')
export default class ZoomImage extends React.Component {
    
    render () {
        const { url, isMy, displayName } = this.props.navigation.state.params;
        return (
            <ImageBackground
                style={styles.image}
                source={{uri: url}}
                resizeMode={'cover'}>
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{displayName}</Text>
                    </View>
                    {
                        isMy ? 
                            <TouchableOpacity style={{ margin: 8 }} onPress={this.onDelete}>
                                <Icon name={'delete'} size={22} color={'#fff'} />
                            </TouchableOpacity> : 
                            <View />
                    }
                </View>
            </ImageBackground> 
        );
    }

    onDelete = () => {
        
        const { index } = this.props.navigation.state.params;

        Alert.alert(
            'Delete',
            'Are you sure, You want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: async () => {
                        this.props.User.deleteImage(index).then(() => {
                            this.props.navigation.navigate('Profile');
                        });
                    }
                },
            ],
            {cancelable: false},
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width
    },
    content: {
        position: 'absolute',
        bottom: 22,
        backgroundColor:'#00000066',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: { 
        color:'white',
        left: 20
    }
});