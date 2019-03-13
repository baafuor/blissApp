import React, { Component } from "react";
import { ScrollView } from 'react-native';
import {
  Container,
  Button,
  Content,
  Icon,
  Picker,
  Form,
  Text,
  View
} from "native-base";
import { inject } from "mobx-react";
import PickImage from "./PickImage";

import Input from "../../components/Input";
import styles from "./styles";

@inject("User")
export default class EditProfile extends Component {

  constructor(props) {
    super(props);

    const { displayName, email, uid, photoURL } = this.props.navigation.state.params;
    
    this.state = {
      uid: uid,
      displayName: displayName,
      email: email,
      about: "",
      photoURL: photoURL,
      accountType: "photographer"
    };

    // this.state = {
    //   uid: "123456",
    //   displayName: "Bhavik Charola",
    //   email: "bhavikcharola@gmail.com",
    //   about: "Hello World",
    //   profilePic: null,
    //   accountType: "photographer"
    // };

  }

  async componentDidMount() {
    const user = await this.props.User.getById(this.state.uid);
    if(user) {
      this.setState({
        displayName: user.displayName,
        email: user.email,
        about: user.about,
        accountType: user.accountType,
        photoURL: user.photoURL
      });
    }
  }

  onValueChange(value) {
    this.setState({
      accountType: value
    });
  }

  render() {

    const { displayName, email, about } = this.state;

    return (
        <Container style={styles.container}>
         <ScrollView>
            <Content contentContainerStyle={styles.contentContainer}>
              <Form>
                <View style={{alignItems: 'center'}}>
                  <PickImage uri={
                    this.state.photoURL || this.state.photoURL.path ? 
                    this.state.photoURL.path ? "file:///" + this.state.photoURL.path : this.state.photoURL
                    : null
                  } 
                  onFilePick={
                    (path, filename) => this.setState({photoURL: { path }})
                  } />
                </View>
                <Input label={"Name"} value={displayName} onChangeText={text => this.setState({displayName: text})} />
                <Input label={"Email"} keyboardType={"email-address"} value={email} editable={false} />
                <Input label={"About"} numberOfLines={4} value={about} onChangeText={text => this.setState({about: text})} />
                <Text style={styles.subLabel}>Please Account Type : </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    mode="dropdown"
                    iosIcon={() => <Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#b95dd3" }}
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    selectedValue={this.state.accountType}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Photographer" value="photographer" />
                    <Picker.Item label="Client" value="client" />
                  </Picker>
                </View>
              </Form>
              <Button onPress={this.onNext} style={{marginTop: 16}} light full>
                <Text> Next </Text>
              </Button>
            </Content>
          </ScrollView>
        </Container>
    );
  }

  onNext = () => {
    this.props.navigation.navigate("ImageUpload", { ...this.state });
  }
}