import React,{Component} from 'react'
import {View,Text,Image,TouchableOpacity}from 'react-native'
import {Icon} from 'native-base'
import ImagePicker from 'react-native-image-picker'

export default class ImagePickerComponent extends Component{
    constructor(){
        super()
            this.state={
                
               isUploadImage :0,
               ImageSource: []
              
            
        }
    }
    imageUpload(id){
        const options = {
            title: 'Select Photo',
            customButtons: [{ name: 'Gellary', title: 'Choose Photo from Gellary' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response.path 
                console.log(this.state.ImageSource)
          this.setState({
              ImageSource:source,
               isUploadImage:1
              })
              this.props.onFilePick(id,response.path, response.fileName ,response.type)
            }
          })
        }  
    render(){
        return(
            <View>
                {this.state.isUploadImage == 1 ?  <View style={{flex:1}}>
           <TouchableOpacity onPress={()=>this.imageUpload(this.props.id)}>
            <Image style={{borderColor:4,borderColor:'grey',margin:4}} source={{uri:"file:///" + this.state.ImageSource}} height={130} width={150}/>
            </TouchableOpacity>
            </View>
           :
                 <TouchableOpacity style={{margin:4,height:130,width:150,alignItems:'center',justifyContent:'center',backgroundColor:'black'}}
                 onPress={()=> this.imageUpload(this.props.id)}>
                 <Icon name="md-person-add" color='black' />
                 </TouchableOpacity>
               }
            </View>
            
        )
    }
}