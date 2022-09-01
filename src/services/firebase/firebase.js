import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";
import { uuid } from "uuidv4";
import { GraphqlService } from "services";

const config = {
  apiKey: "AIzaSyD9myJlHRJfcFdoQnHt7DBxEz6Ez_nl9j8",
  authDomain: "newsraven-kashif.firebaseapp.com",
  databaseURL: "https://newsraven-kashif.firebaseio.com",
  projectId: "newsraven-kashif",
  storageBucket: "newsraven-kashif.appspot.com",
  messagingSenderId: "915328458077",
  appId: "1:915328458077:web:bb0b17fa6baa1f084f5cb4"
};

// const REACT_APP_CONFIRMATION_EMAIL_REDIRECT = "http://localhost:3000";


class Firebase {
  constructor() {
    // console.log("Firebase initialize");
    app.initializeApp(config);

    /* Firebase APIs */

    this.auth = app.auth();
    this.app_auth = app.auth;
    this.db = app.database();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.messaging = app.messaging.isSupported() ? app.messaging() : null;

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.appleProvider = new app.auth.OAuthProvider('apple.com');
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();

    // *** Messaging Callback ***
    if (this.messaging) {
      this.messaging.onMessage((payload) => {
        console.log("onMessage :", payload);
      });
    }
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithApple = () => this.auth.signInWithPopup(this.appleProvider);
  
  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification();
    // this.auth.currentUser.sendEmailVerification({
    //   // url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    //   url: REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    // });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken(true);
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

        // console.log("onAuthStateChanged idTokenResult :", idTokenResult, token);
        if (hasuraClaim) {
          const expiredTS = Date.parse(idTokenResult.expirationTime);

          // get user from database
          let gqlservice = new GraphqlService();
          gqlservice.set_auth_jwt(token);
          let result = await gqlservice.user_by_id(user.uid);
          // console.log("User from database :", result.data.users);

          if (result.data.users.length > 0) {
            let authUser = {...result.data.users[0]};
            authUser = {
              ...authUser,
              token,
              hasuraClaim,
              expiredTS
            };

            next(authUser);
          } else {
            fallback();
          }
        } else {
          fallback();
        }
      } else {
        fallback();
      }
    });

  // get refreshed token
  refreshToken = () =>
    new Promise(async (resolve, reject) => {
      const user = this.auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

        // console.log("refreshToken idTokenResult :", idTokenResult, token);
        if (hasuraClaim) {
          const expiredTS = Date.parse(idTokenResult.expirationTime);

          // get user from database
          let gqlservice = new GraphqlService();
          gqlservice.set_auth_jwt(token);
          let result = await gqlservice.user_by_id(user.uid);
          // console.log("User from database :", result.data.users);
        
          if (result.data.users.length > 0) {
            let authUser = {...result.data.users[0]};
            authUser = {
              ...authUser,
              token,
              hasuraClaim,
              expiredTS
            };
            resolve({error: false, token: authUser.token});
          } else {
            resolve({error: true, msg: "Failed to get user from database"});
          }
        } else {
          resolve({error: true, msg: "Invalid claim" });
        }
      } else {
        resolve({error: true, msg: "Invalid user"});
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  // users = () =>
  //   new Promise((resolve, reject) => {
  //     let usersRef = this.firestore.collection(USER_COLLECTION_NAME);
  //     usersRef
  //       .get()
  //       .then(snapshot => {
  //         let result = [];
  //         snapshot.forEach(doc => {
  //           // console.log(doc.id, '=>', doc.data());
  //           result.push(doc.data());
  //         });
  //         resolve(result);
  //       })
  //       .catch(err => {
  //         let msg = "Error updating user :" + err;
  //         console.log(msg);
  //         reject({ status_code: FIREBASE_FIRESTORE_ERROR, msg: msg });
  //       });
  //   });

  // user = uid => this.firestore.collection(USER_COLLECTION_NAME).doc(uid);

  // updateUser = user =>
  //   new Promise((resolve, reject) => {
  //     this.firestore
  //       .collection(USER_COLLECTION_NAME)
  //       .doc(user.uid)
  //       .update(user)
  //       .then(() => {
  //         resolve({ status_code: 200, msg: "Success to update a user!" });
  //       })
  //       .catch(err => {
  //         let msg = "Error updating user :" + err;
  //         console.log(msg);
  //         reject({ status_code: FIREBASE_FIRESTORE_ERROR, msg: msg });
  //       });
  //   });

  // *** Storage API ***
  uploadImage = (image2Upload, dirname) =>
    new Promise((resolve, reject) => {
      var re = /(?:\.([^.]+))?$/;
      var file_ext = re.exec(image2Upload.name)[1];
      var uuid_name = uuid();
      var new_filename = uuid_name + "." + file_ext;

      const uploadTask = this.storage
        .ref(`images/${dirname}/${new_filename}`)
        .put(image2Upload);

      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // this.setState({progress});
        },
        err => {
          // error function ....
          let msg = "Error uploading image :" + err;
          // console.log(msg);
          resolve({ error: true, msg: msg });
        },
        () => {
          // complete function ....
          this.storage
            .ref(`images/${dirname}`)
            .child(new_filename)
            .getDownloadURL()
            .then(url => {
              // console.log(url);
              resolve({ error: false, url: url });
            })
            .catch(err => {
              let msg = "Error to upload image :" + err;
              // console.log(msg);
              resolve({ error: true, msg: msg });
            });
        }
      );
    });

  deleteImage = (image_url) => 
    new Promise((resolve, reject) => {
      this.storage
        .refFromURL(image_url)
        .delete()
        .then(() => {
          resolve({ error: false })
        })
        .catch(err => {
          const msg = "Error to delete image : " + err;
          resolve({ error: true, msg: msg });
        });
    });
}

export default Firebase;
