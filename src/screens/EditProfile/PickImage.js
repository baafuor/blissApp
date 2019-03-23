import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

class PickImage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            avatarSource: null,
            fileName: ''
        };
    }
    render () {
        if (this.state.avatarSource !== null || this.props.uri) {
            return (
                <TouchableOpacity
                    style={styles.container}
                    onPress={this.selectAvatar}
                >
                    <Image
                        source={{ uri: this.state.avatarSource ? this.state.avatarSource : this.props.uri }}
                        style={styles.image}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.container}
                    onPress={this.selectAvatar}
                >
                    <Icon name={'person'} color={'#fff'} size={52} />
                </TouchableOpacity>
            );
        }
    }

  selectAvatar = () => {
      const options = {
          title: 'Select Image',
          mediaType: 'photo',
          takePhotoButtonTitle: 'Take Photo'
      };

      ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
              console.log('User cancelled image picker');
          } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
          } else {
              const source = Platform.OS === 'android' ? 'file///' +  response.path : response.uri;
              console.log(source);
              this.setState({
                  avatarSource: source,
                  fileName: response.fileName
              });
              this.props.onFilePick(source, response.fileName);
          }
      });
  }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        width: '44%',
        height: 128,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        marginHorizontal: 0
    },
    imageContainer: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        width: '44%',
        height: '30%',
        margin: 8,
        marginHorizontal: 0
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 3
    }
});

export default PickImage;
