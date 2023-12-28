import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import Constants from 'expo-constants';
import type { User as FirebaseUser } from 'firebase/auth'
import { currentUser } from "../storage/global";
import { useEffect, useState, useContext, createContext } from 'react';
import {User} from './User';

require('firebaseui/dist/firebaseui.css');

const app = initializeApp(Constants.expoConfig?.extra?.firebase);
const firebaseAuth = getAuth(app);

const signOut = () => {
    firebaseAuth.signOut().then(() => {
        currentUser(null);
    });
}

function useFirebaseAuth(): boolean {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            (user : FirebaseUser | null) => {
                currentUser(user == null ? null : new User(user));
                setLoaded(true);
            });
        return unsubscribe; // unsubscribe on unmount.
    }, []);

    return loaded
  }

export { signOut, useFirebaseAuth, firebaseAuth }
