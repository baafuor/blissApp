import React from 'react';
import { ScrollView } from 'react-native';
import { 
    Container,
    Button,
    Content,
    Text,
    View
} from 'native-base';
import { inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';

import PickImage from './PickImage';
import styles from './styles';
import { NUM_IMAGES } from '../../mix/constants';

@inject('User')
export default class EditProfile extends React.Component {

    constructor (props) {
        super(props);
        const user = this.props.navigation.state.params;
        this.state = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            about: user.about,
            accountType: user.accountType,
            photoURL: user.photoURL,
            images: user.images instanceof Array ? user.images : [],
            previousData: {
                images: Object.assign([] , user.images instanceof Array ? user.images : []),
                photoURL: user.previousData.photoURL
            }
        };
    }

    render () {
        return (
            <ScrollView>
                <Container style={styles.container}>
                    <Content contentContainerStyle={styles.contentContainer}>
                        <Text style={{fontSize: 26, fontWeight: 'bold', alignSelf: 'center', marginBottom: 16}}>Add Portfolio</Text>
                        <View style={{flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            {
                                Array.apply(0, Array(NUM_IMAGES)).map((x, i) => {
                                    const uri = this.state.images[i] ? this.state.images[i].downloadURL : null;
                                    return (
                                        <PickImage 
                                            uri={uri} 
                                            key={i} 
                                            onFilePick={(path, filename) => {
                                                const _images = this.state.images;
                                                _images[i] = { path, filename };
                                                this.setState({  images: _images });
                                            }} 
                                        />
                                    );
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
        this.props.User.createOrUpdate(this.state, () => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Drawer'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        });
    }
}