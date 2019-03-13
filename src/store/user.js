/*eslint-disable */
import { observable, action, set } from "mobx";
import { save } from "../utils/db";
import firebase from "react-native-firebase";
import Utils from "../utils/str";

const COLL_USER = "Users";
const REF_IMAGES = "/images/";
const REF_PROFILE = "/profile/"

class User {
  @observable
  uid = "";
  @observable
  displayName = "";
  @observable
  email = "";
  @observable
  accountType = "";
  @observable
  about = "";
  @observable
  photoURL = "";

  images = [];

  @observable
  userData =[]
  @observable
  userName='Username'
  @observable
  aboutUser ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  @observable
  imageData=[{id:1,image:require('../../assets/NewsIcons/9.jpg'),name:'Fashion'},
  {id:2,image:require("../../assets/NewsIcons/2.jpg"),name:'SCIENCE'},
  {id:3,image:require("../../assets/NewsIcons/8.jpg"),name:'FASHION'},
  {id:4,image:require("../../assets/NewsIcons/7.jpg"),name:'SCIENCE'},
  {id:5,image:require("../../assets/NewsIcons/6.jpg"),name:'FASHION'},
  {id:6,image:require("../../assets/NewsIcons/1.jpg"),name:'SCIENCE'},
  {id:7,image:require("../../assets/NewsIcons/11.jpg"),name:'FASHION'},
  {id:8,image:require("../../assets/NewsIcons/12.jpg"),name:'SCIENCE'},
  {id:9,image:require("../../assets/NewsIcons/8.jpg"),name:'FASHION'},
  {id:10,image:require("../../assets/NewsIcons/9.jpg"),name:'SCIENCE'}
]

  constructor() {
    this.firestore = firebase.firestore()
    this.userCollection = this.firestore.collection(COLL_USER);
  }

  @action
  createOrUpdate(data, images, callback) {
    
    this.uid = data.uid;
    this.displayName = data.displayName;
    this.email = data.email;
    this.accountType = data.accountType;
    this.about = data.about;
    this.photoURL = data.photoURL.path ? data.photoURL.path : data.photoURL

    Promise.all(this.fileupload(REF_IMAGES, images)).then(async result => {
      Promise.all(this.fileupload(REF_PROFILE, [data.photoURL])).then(async _result => {
        const _data = {
          displayName: this.displayName,
          email: this.email,
          accountType: this.accountType,
          about: this.about,
          photoURL: _result[0].downloadURL,
          images: result
        }
        await this.userCollection.doc(data.uid).set(_data);
        this.images = images;
        save(_data).then(() => callback()).catch(err => console.log(err));
      })
    }).catch(err => console.log(err));
  }

  @action
  async getById(uid) {
    const doc = await this.userCollection.doc(uid).get();
    if(doc.exists)
      return doc.data();
    else
      return false;
  }

  @action
  async getPhotographer(){
    const users = []
    const doc = await this.userCollection.where("accountType", "==", "photographer").get();
    doc.forEach(user => {
      users.push(user.data());
    });
    return users;
  }

  @action
  set(value) {
    console.log(value)
    this.uid = value.uid;
    this.displayName = value.displayName;
    this.email = value.email;
    this.about = value.about;
    this.accountType = value.accountType;
    this.photoURL = value.photoURL;
    this.images = value.images;
  }

  fileupload(refPath, images) {
    let promises = []
    const _images = images.filter(x => x != null && x != undefined);
    _images.forEach(image => {
      promises.push(
        new Promise((resolve, reject) => {
          if(image.path){
            firebase
            .storage()
            .ref(refPath + Utils.getFileName())
            .putFile(image.path)
            .then(rImage => {
              resolve({
                downloadURL: rImage.downloadURL,
                name: rImage.metadata.name
              })
            })
            .catch(err => {
              console.log(err)
            })
          } else if(image.downloadURL){
            resolve({
              downloadURL: image.downloadURL,
              name: image.name              
            })
          } else if(image.includes('http')) {
            resolve({
              downloadURL: image,
              name: ""
            })
          }
        })
      )
    });
    return promises
  }
}

export default User;
