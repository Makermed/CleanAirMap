import type { FirebaseUser } from './firebaseconfig'
import type { ParsedToken } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseAuth, setUserUpdateCallback } from './firebaseconfig';
import { queries } from "./data";
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
import { User, currentUser } from './User';

function useFirebaseAuth(): boolean {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [ getUserProfile ] = useLazyQuery(queries.getUserProfile, { errorPolicy: "ignore" });
    const [ createNewUser ] = useMutation(queries.createNewUser);
    let unsubscribeUserUpdates : Function | null = null;

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(
            (user : FirebaseUser | null) => {
                if (unsubscribeUserUpdates != null ) {
                    // drop the previous subscription.
                    unsubscribeUserUpdates();
                }
                if (user) {
                  const userCallback = async () => {
                    const token = await user.getIdToken()
                        .catch((error: any) => {
                            console.log(error);
                            return null;
                        });
                        console.log(token);
                    console.log(user.uid);
                    console.log(token);
                    const idTokenResult = await user.getIdTokenResult()
                        .catch((error: any) => {
                            console.log(error);
                            return null;
                        });
                    const hasuraClaim : ParsedToken | unknown = idTokenResult?.claims['https://hasura.io/jwt/claims'];
                    if (token && hasuraClaim) {
                        await AsyncStorage.setItem('firebase-token', JSON.stringify({'jwt': token, 'hasura_claim': {...hasuraClaim}}));
                        getUserProfile({variables: {user_id: user.uid}})
                            .then((result) => {
                                if (result.data.users.length > 0) {
                                    currentUser(new User(user, result.data.users[0]));
                                } else {
                                    // TODO: If the user doesn't exist, they need to sign up.
                                    // For now this just creates the user.
                                    createNewUser({variables:
                                        {
                                         username: user.displayName,
                                         email: user.email}})
                                        .then((result) => {
                                            currentUser(new User(user, result.data.insert_users_one));
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                            });
                    } else {
                        await AsyncStorage.removeItem('firebase-token');
                    }
                  };
                  unsubscribeUserUpdates = setUserUpdateCallback(user.uid, userCallback);
                }
                setFirebaseUser(user);
                setLoaded(true);
            });
        return unsubscribe; // unsubscribe on unmount.
    }, []);

    return loaded;
  }

export {useFirebaseAuth}
