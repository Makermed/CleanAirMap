import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';
import { getDatabase, Database, ref, onValue} from "firebase/database";
import type { User as FirebaseUser } from 'firebase/auth'

require('firebaseui/dist/firebaseui.css');

const app = initializeApp(Constants.expoConfig?.extra?.firebase);
const firebaseAuth = getAuth(app);
const db : Database = getDatabase(app);

const setUserUpdateCallback = (uid: String, callback: any) : Function => {
  callback();
  const userRef = ref(db, 'metadata/' + uid + '/refreshTime');
  return onValue(userRef, callback);
}
export {firebaseAuth, db, FirebaseUser, setUserUpdateCallback}
