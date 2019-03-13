// @flow
import React, {Component} from "react";
import {
  ScrollView, 
  View,
  StyleSheet,
  FlatList
} from "react-native";
import {
  Text,
  Thumbnail
} from "native-base";
import { inject, observer } from 'mobx-react';

import ImageComponent from '../../../components/FlateList/imageComponent';
const primary = require("../../../theme/variables/commonColor").brandPrimary;

@inject('User')
@observer
class Profile extends Component {
  
  render() {
    return (
      <ScrollView>
        <View style={styles.header} >
          <View>
            <Text style={styles.txtName}>{this.props.User.displayName}</Text>
            <Text style={styles.txtAbout}>{this.props.User.about}</Text>
          </View>
          <Thumbnail
            source={{uri: this.props.User.photoURL}}
            style={styles.profilePic}
          />
        </View>
        <View>
          <FlatList 
            data={this.props.User.images}
            renderItem={({item}) => 
              <ImageComponent 
                uri={item.downloadURL}
                navigation={this.props.navigation}
                onPress={() => this.props.navigation.navigate("ZoomImage", {url:this.props.uri})} 
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: primary
  },
  txtName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  txtAbout: {
    color: '#fff',
    marginTop: 8
  }
});

export default Profile;

