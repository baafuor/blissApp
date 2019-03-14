// @flow
import React, {Component} from "react";
import {
  ScrollView, 
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  Text,
  Thumbnail
} from "native-base";
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImageComponent from '../../components/FlateList/imageComponent';
const primary = require("../../theme/variables/commonColor").brandPrimary;

@inject('User')
@observer
class Profile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', this.props.User),
      isMy: false
    }
  }

  componentWillMount() {
    if(this.props.User.uid === this.state.user.key) {
      this.setState({ isMy: true })
    }
  }

  render() {
    const { photoURL, displayName, about, images } = this.state.user;
    return (
      <ScrollView>
        <View style={styles.header} >
          {
            this.state.isMy ? 
            <TouchableOpacity style={{position: 'absolute', right: 20, top: 10}}>
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
          <FlatList 
            data={images}
            renderItem={({item}) => 
              <ImageComponent 
                uri={item.downloadURL}
                navigation={this.props.navigation}
                onPress={() => this.props.navigation.navigate("ZoomImage", { url: item.downloadURL })} 
              />
            }
            keyExtractor={(item, index) => `${index}`}
            numColumns={2}
          />
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
  }
});

export default Profile;

