import type { User as FirebaseUser } from 'firebase/auth'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'

class User {
    private firebaseUser: FirebaseUser | FirebaseAuthTypes.User;

    constructor(firebaseUser: FirebaseUser | FirebaseAuthTypes.User) {
        this.firebaseUser = firebaseUser;
    }

    getPhotoURL = () : string | null => {
        return this.firebaseUser.photoURL;
    }
}

export { User };
