// @flow
import React, {Component} from "react";
import {Image, ImageBackground, TouchableOpacity, Dimensions,Platform,FlatList} from "react-native";

import {
  Container,
  Content,
  Text,
  View,
  ListItem,
} from "native-base";
import {inject,observer} from 'mobx-react'
import CustomHeader from "../../components/CustomHeader";
import ProfileTab from '../Photographer/ProfileTabs/profile'

import styles from "./styles";


@inject("User")
@observer
class Profile extends Component {
 
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}>
          <CustomHeader hasTabs navigation={navigation} />
          <Content
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: "#fff"}}>
            {!this.props.User.imageData
              ? <View style={styles.linkTabs}>
                  <ListItem
                    style={{
                      backgroundColor: "#fff",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.textNote}>Empty List</Text>
                  </ListItem>
                </View>
              : <View>
                    <ProfileTab navigation={navigation}/>        
                </View>}
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default Profile;
