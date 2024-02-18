import { Button } from "@gluestack-ui/themed"
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
        <View>
            <Button onPress={signOut} style={styles.logoutButton} mode="elevated">
              {logoutString}
            </Button>
        </View>
    )
}

export default SignOutForm;

const styles = StyleSheet.create({
    logoutButton: {
       backgroundColor: 'white',
       minWidth: 300,
       maxWidth: 700,
    }
  });
