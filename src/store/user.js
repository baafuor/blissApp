/*eslint-disable */
import { observable, action, toJS } from "mobx";
import { save } from "../utils/db";
import firebase from "react-native-firebase";
import Utils from "../utils/str";
import { NUM_IMAGES } from "../mix/constants";

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
  @observable
  images = [];

  @observable
  userData =[]
  @observable
  userName='Username'
  @observable
  aboutUser ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

  constructor() {
    this.firestore = firebase.firestore()
    this.userCollection = this.firestore.collection(COLL_USER);
  }

  @action
  createOrUpdate(data, callback) {
    this.uid = data.uid;
    this.displayName = data.displayName;
    this.email = data.email;
    this.accountType = data.accountType;
    this.about = data.about;
    Promise.all(this.fileupload(REF_IMAGES, data.images)).then(async result => {
      this.images = result;
      Promise.all(this.fileupload(REF_PROFILE, [data.photoURL])).then(async _result => {
        this.photoURL = _result[0].downloadURL;
        const _data = {
          displayName: this.displayName,
          email: this.email,
          accountType: this.accountType,
          about: this.about,
          photoURL: _result[0].downloadURL,
          images: result
        }
        this.cleanPrevious(data);
        await this.userCollection.doc(data.uid).set(_data);
        this.save().then(() => callback()).catch(err => console.log(err));
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
      users.push({...user.data(), uid: user.id});
    });
    return users;
  }

  @action
  set(value) {
    this.uid = value.uid;
    this.displayName = value.displayName;
    this.email = value.email;
    this.about = value.about;
    this.accountType = value.accountType;
    this.photoURL = value.photoURL;
    this.images = value.images;
  }

  @action
  async deleteImage(index) {
    await this.deleteImageStorage(this.images[index].downloadURL)
    this.images.splice(index, 1);
    await this.userCollection.doc(this.uid).update({ images: this.images.slice() });
    return this.save();
  }

  async cleanPrevious(data) {
    console.log('clean >>>' , data.previousData.images, '>>>', this.images)
    if (data.previousData) {
      for (let i = 0; i < data.previousData.images.length; i++) {
        if (this.images[i].downloadURL !== data.previousData.images[i].downloadURL) {
          console.log(this.images[i].downloadURL, '>>', data.previousData.images[i])
          await this.deleteImageStorage(data.previousData.images[i].downloadURL);
        }
      }
      if(this.photoURL !== data.previousData.photoURL){
        await this.deleteImageStorage(data.previousData.photoURL);
      }
    }
  }

  deleteImageStorage(url){
    if(url && url.match("firebasestorage.googleapis.com")){
      const imageRef = firebase.storage().refFromURL(url)
      return imageRef.delete();
    }
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
            .ref(refPath + 'BBB___' + Utils.getFileName())
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

  save() {
   return save({
      uid: this.uid,
      displayName: this.displayName,
      email: this.email,
      about: this.about,
      accountType: this.accountType,
      photoURL: this.photoURL,
      images: this.images
    })
  }

}

export default User;