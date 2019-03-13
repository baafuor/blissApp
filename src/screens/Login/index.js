import React, { Component } from "react";
import { Image, ImageBackground, StatusBar } from "react-native";
import {
  Container,
  Content,
  View,
} from "native-base";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { inject, observer } from "mobx-react";
import firebase from "react-native-firebase";

import styles from "./styles";

const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

@inject("User")
@observer
class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    GoogleSignin.configure();
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      console.log(firebaseUserCredential.user)
      const { email, displayName, uid, photoURL } = firebaseUserCredential.user;
      this.props.navigation.navigate("EditProfile", { email, displayName, uid, photoURL });
    } catch (error) {
      console.log(error);
    }
  }

 
  
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <GoogleSigninButton
                  style={{ width: "100%", height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.signIn}
                  disabled={this.state.isSigninInProgress} />
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default LoginForm;
