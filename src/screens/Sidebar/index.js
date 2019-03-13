// @flow
import React, {Component} from "react";
import {ImageBackground, TouchableOpacity} from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

import{ inject,observer }from "mobx-react";
import { Grid, Col } from "react-native-easy-grid";
import { remove } from "../../utils/db";

import styles from "./style";

@inject("User")
class SideBar extends Component {
  
  logout() {
    remove(err => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
          <ListItem
              button
              onPress={() => {
                navigation.navigate("Explore");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="explore" size={26} color={"#fff"} />
              <Text style={styles.linkText}> EXPLORE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("ProfileTabs");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="person" size={26} color={"#fff"} />
              <Text style={styles.linkText}> PROFILE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="settings" size={26} color={"#fff"} />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem>
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.logout()}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>
                     Logout
                    </Text>
                    <Text note style={{color: "#fff"}}>
                    {this.props.User.displayName}
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{alignSelf: "flex-end"}}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={{uri: this.props.User.photoURL}}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
