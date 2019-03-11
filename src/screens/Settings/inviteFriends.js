import React,{Component}from 'react'
import {View,Text,Button,TextInput,ScrollView,TouchableOpacity,Dimensions,ImageBackground,Picker} from 'react-native'
import firebase from 'react-native-firebase'
import {inject,observer} from 'mobx-react'
import ImagePicker from 'react-native-image-picker'

import PickerComponent from '../../components/ImagePicker/pickerComponent'



@inject("User")
@observer
export default class InviteFriends extends Component{
    constructor(){
        super()
            this.state={
                aboutUser:'',
               name:'',
               isUploadImage :0,
               ImageSource: [],
               UserType:"Photographer",
               ImagePath:[]
              
            
        }
       this.images=[]
    }
    componentDidMount(){
        this.props.User.userData
        this.setState({name:this.props.User.userData.displayName})
    }
    
    async load(){
        const userData=this.props.User.userData
        console.log(userData.displayName,userData.email,userData.uid)
        const data = firebase.firestore().collection('Users')
        console.log(data,">>>>>")
       const doc = await data.doc().get()
       if(doc.exists){
           console.log(doc.data(),"ifff")
       } else {
           const defaultDoc ={
            Email:userData.email,
            Name:this.state.name,
            About:this.state.aboutUser,
            UserType:this.state.UserType,
            Images :this.images   
           }
           await data.doc().set(defaultDoc)
           console.log(doc,"else")
       }
    }
    imagespush(id, path, filename, mediaType){
     
   const Imageid = id
   console.log(this.images)
   this.images.forEach((x) => {if(x.id===Imageid){
    let Item ={
      id: x.id,path: path, filename:filename,type: mediaType
      }
    this.images.push(Item)
   } else{let Item ={
    id: id,path: path, filename:filename,type: mediaType
    }
    this.images.push(Item)
  }})
   
   
     
    }
    imageUpload(){
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
              const source = this.state.ImageSource.push({image:response.path}) 
                console.log(source,this.state.ImageSource)
          this.setState({
               isUploadImage:1
              });
            }
          });
        }
    render(){
     
        return(
        <ImageBackground 
              style={{flex: 1,
                width: "100%",
                height: Dimensions.get("window").height,
              }}
              source={require("../../../assets/bg.png")}>
                <ScrollView>
              <View style={{margin:4}}>
              <View style={{flexDirection:'row',paddingLeft:5,marginBottom:15,marginTop:15,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontWeight:"bold",color:'white',fontSize:30,}}>Hello , </Text>
             <Text style={{fontWeight:"300",color:'white',fontSize:20,}}>{ this.props.User.userData.displayName}</Text>
              </View>
              
             <Text style={{fontWeight:"normal",color:'white',fontSize:15,paddingLeft:5}}>{this.props.User.userData.email}</Text>
                <TextInput 
                style={{color:'white',paddingLeft:15,borderWidth:2,borderRadius:15,borderColor:'white'}}
                
                placeholder ={"your name"}  defaultValue={`${
                              this.props.User.userData.displayName
                            }`}
                            onChangeText={text =>
                              this.setState({
                                name: text
                              })
                            }/>
                            <Text style={{fontWeight:"normal",marginTop:5,color:'white',fontSize:15,paddingLeft:5,paddingBottom:5}}>Place Account Type :</Text>
                     <View style={{borderColor:'white',borderRadius:15,borderWidth:2 }}>
                        <Picker
                            selectedValue={this.state.UserType}
                            onValueChange={(itemValue, itemIndex) => {
                              this.setState({ UserType: itemValue })}}
                            
                          >
                            <Picker.Item label="Photographer" value="Photographer" />
                            <Picker.Item label="Client" value="Client" />
                          </Picker>
                    </View>
                <TextInput style={{color:'white',paddingLeft:15,marginTop:5,borderWidth:2,borderRadius:15,borderColor:'white'}} placeholder={'About yourself'} onChangeText={(text) => this.setState({aboutUser : text})}/>
               <TouchableOpacity style={{backgroundColor:'white',padding:12,justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:5}} onPress={() => this.load()}>
               <Text style={{fontSize:15,color:'green',fontWeight:'bold'}}>Add Data</Text>
               </TouchableOpacity>
               
              </View>
               
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent  onFilePick={(path, filename, mediaType) => this.images.push({ path, filename, mediaType })}/>
                  </View>
                   
                  <View style={{flex:0.5}}>
                      <PickerComponent  onFilePick={(path, filename, mediaType) => this.images.push({ path, filename, mediaType })}/>
                 </View>
               </View>
               <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent  onFilePick={(path, filename, mediaType) => this.images.push({ path, filename, mediaType })}/>
                  </View>
                  <View style={{flex:0.5}}>
                  <PickerComponent  onFilePick={(path, filename, mediaType) => this.images.push({ path, filename, mediaType })}/>
                  </View>
               </View>
               <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={5} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
                  <View style={{flex:0.5}}>
                  <PickerComponent  onFilePick={(path, filename, mediaType) => this.images.push({ path, filename, mediaType })}/>
                  </View>
               </View>
               </ScrollView>
               </ImageBackground>
             
           
        )
    }
} 

     
 