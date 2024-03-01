import { Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, View } from 'react-native';
import {currentUser} from '../User';
import { firebaseAuth } from '../firebaseconfig';
import { client } from '../../storage';

const signOut = () => {
    firebaseAuth.signOut().then(() => {
        currentUser(null);
        client.resetStore();
    });
}

const SignOutForm = () => {
    const logoutString = "Logout " + currentUser()?.getEmail();
    return (
            <Button variant="solid" mt="$2" onPress={signOut} >
                <ButtonText>{logoutString}</ButtonText>
            </Button>
    )
}

export default SignOutForm;
