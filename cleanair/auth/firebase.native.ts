import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { currentUser } from "../storage/global";
import { useEffect, useState, useContext, createContext } from 'react';
import { User } from './User';

const firebaseAuth = auth();


const signOut = () => {
    firebaseAuth.signOut().then(() => {
        currentUser(null);
    });
}

function useFirebaseAuth(): boolean {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            (user : FirebaseAuthTypes.User | null) => {
                currentUser(user == null ? null : new User(user));
                setLoaded(true);
            });
        unsubscribe; // unsubscribe on unmount.
    }, []);

    return loaded
  }

export { signOut, useFirebaseAuth }
