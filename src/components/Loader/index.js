import React from 'react';
import { View, ActivityIndicator } from 'react-native';

class index extends React.Component {

    render () {
        const { color } = this.props;
        return (
            <View style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color ? color : '#333333cc'
            }}>
                <ActivityIndicator size={'large'} color={'#fff'} />
            </View>
        );
    }
}

export default index;