import type { User as FirebaseUser } from './firebaseconfig'
import { makeVar} from '@apollo/client';

class User {
    private firebaseUser: FirebaseUser;
    private userProfile: any;

    constructor(firebaseUser: FirebaseUser, userProfile: any) {
        this.firebaseUser = firebaseUser;
        this.userProfile = userProfile;
    }

    getPhotoURL = () : string | null => {
        return this.firebaseUser.photoURL;
    }

    getUserId = () : string => {
        return this.firebaseUser.uid;
    }

    isNewUser = () : boolean => {
        return this.userProfile == null;
    }

    getEmail = () : string =>  {
        console.log(this.userProfile);
        return this.userProfile?.email;
    }
}

const currentUser = makeVar<User | null>(null);

export { User, currentUser };
