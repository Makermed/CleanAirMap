import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'

type FirebaseUser = FirebaseAuthTypes.User;
const firebaseAuth = auth();
const db = database();

export {firebaseAuth, db, FirebaseUser}