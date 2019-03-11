import React, { Component } from "react";
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

import Input from "../../components/Input";
import styles from "./styles";

@inject("User")
export default class EditProfile extends Component {

  constructor(props) {
    super(props);

    const { displayName, email, uid } = this.props.navigation.state.params;
    
    this.state = {
      uid: uid,
      displayName: displayName,
      email: email,
      about: "",
      accountType: "photographer"
    };
  }

  async componentDidMount() {
    const user = await this.props.User.getById(this.state.uid);
    if(user) {
      this.setState({
        displayName: user.displayName,
        email: user.email,
        about: user.about,
        accountType: user.accountType
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
        <Content contentContainerStyle={styles.contentContainer}>
          <Form>
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
          <Button onPress={this.onNext} style={{marginTop: 64}} light full>
            <Text> Next </Text>
          </Button>
        </Content>
      </Container>
    );
  }

  onNext = () => {
    this.props.navigation.navigate("ImageUpload", { ...this.state });
  }
}