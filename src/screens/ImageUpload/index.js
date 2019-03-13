import React, { Component } from "react";
import { ScrollView } from "react-native";
import { 
  Container,
  Button,
  Content,
  Text,
  View
} from "native-base";
import { inject } from "mobx-react";
import { NavigationActions } from "react-navigation";

import PickImage from "./PickImage"
import styles from "./styles";

@inject("User")
export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  async componentDidMount() {
    const user = await this.props.User.getById(this.props.navigation.state.params.uid);
    if(user) {
      this.setState({ images: user.images });
    }
  }

  render() {

    return (
      <ScrollView>
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.contentContainer}>
            <Text style={{fontSize: 26, fontWeight: "bold", alignSelf: "center", marginBottom: 16}}>Add Portfolio</Text>
            <View style={{flexGrow: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
              {
                Array.apply(0, Array(6)).map((x, i) => {
                  const uri = this.state.images[i] ? this.state.images[i].downloadURL : null
                  return <PickImage uri={uri} onFilePick={(path, filename) => this.state.images[i] = { path, filename }} key={i} />
                })
              }
            </View>
            <Button onPress={this.onNext} style={{marginTop: 16}} light full>
              <Text> Done </Text>
            </Button>
          </Content>
        </Container>
      </ScrollView>
    );
  }

  onNext = () => {
    this.props.User.createOrUpdate(this.props.navigation.state.params, this.state.images, () => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "Drawer"})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    })
  }
}