import React, { Component } from 'react';
import { ScrollView, Picker } from 'react-native';
import {
    Container,
    Button,
    Content,
    Icon,
    Form,
    Text,
    View
} from 'native-base';
import { inject } from 'mobx-react';
import PickImage from './PickImage';

import Loader from '../../components/Loader';
import Input from '../../components/Input';
import styles from './styles';

@inject('User')
export default class EditProfile extends Component {

    constructor (props) {
        super(props);
        const { displayName, email, uid, photoURL } = this.props.User.uid ? this.props.User : this.props.navigation.state.params;
        this.state = {
            uid,
            displayName,
            email,
            about: '',
            photoURL,
            accountType: 'photographer',
            images: [],
            previousData: {
                photoURL
            },
            isLoading: true
        };
    }

    async componentDidMount () {
        const user = await this.props.User.getById(this.state.uid);
        if (user) {
            this.setState({
                displayName: user.displayName,
                email: user.email,
                about: user.about,
                accountType: user.accountType,
                photoURL: user.photoURL,
                images: user.images instanceof Array ? user.images : [],
                previousData: {
                    photoURL: user.photoURL
                }
            });
        }
        this.setState({ isLoading: false });
    }

    onValueChange (value) {
        this.setState({
            accountType: value
        });
    }

    render () {

        const { displayName, email, about } = this.state;

        return (
            <Container style={styles.container}>
                <ScrollView>
                    <Content contentContainerStyle={styles.contentContainer}>
                        <Form>
                            <View style={{alignItems: 'center'}}>
                                <PickImage uri={
                                    this.state.photoURL || this.state.photoURL.path ? 
                                        this.state.photoURL.path ? 'file:///' + this.state.photoURL.path : this.state.photoURL
                                        : null
                                } 
                                onFilePick={
                                    (path, filename) => this.setState({photoURL: { path }})
                                } />
                            </View>
                            <Input label={'Name'} value={displayName} onChangeText={text => this.setState({displayName: text})} />
                            <Input label={'Email'} keyboardType={'email-address'} value={email} editable={false} />
                            <Input label={'About'} numberOfLines={4} value={about} onChangeText={text => this.setState({about: text})} />
                            <Text style={styles.subLabel}>Please Account Type : </Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={() => <Icon name="arrow-down" />}
                                    headerStyle={{ backgroundColor: '#b95dd3' }}
                                    headerBackButtonTextStyle={{ color: '#fff' }}
                                    headerTitleStyle={{ color: '#fff' }}
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
                    {this.state.isLoading ? <Loader /> : <View />} 
                </ScrollView>
            </Container>
        );
    }

  onNext = () => {
      this.props.navigation.navigate('ImageUpload', { ...this.state });
  }
}