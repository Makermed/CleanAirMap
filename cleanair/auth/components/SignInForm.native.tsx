import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View } from 'react-native';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_OAUTH_CLIENT_ID,
});

const GoogleSignInButton = () => {
    const onButtonPress = async () => {
      try {
        const idToken = await GoogleSignin.signIn();
        const credential = auth.GoogleAuthProvider.credential(idToken['idToken']);
        await auth().signInWithCredential(credential);
      } catch (error) {
        console.log(error);
      }
  }

    return (
      <GoogleSigninButton onPress={onButtonPress} />
    );
}

const SignInForm = () => {
    return (
      <View style={styles.signinForm}>
        <GoogleSignInButton />
      </View>
    );
}

const styles = StyleSheet.create({
    signinForm: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    }
  });

export default SignInForm;
