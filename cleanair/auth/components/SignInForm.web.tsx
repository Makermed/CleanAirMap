import { GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth } from '../firebaseconfig';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

const SignInForm = (isSignup : boolean) => {
    const [rendered, setRendered] = useState(false);
    var uiConfig = {
        // Without this the callback from the ui doesn't work because it doesn't
        // run the callback in time.
       signInFlow: 'popup',
        signInOptions: [
          GoogleAuthProvider.PROVIDER_ID
        ],  
        tosUrl: '', // TODO: Add a terms of service URL.
        privacyPolicyUrl: '', // TODO: Add a privacy policy URL.,
        callbacks: {
          signInSuccessWithAuthResult: () => {
            return false;
          }
       }
      };

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered) {
        // Load this here to avoid an error about the
        // server-side and clent-side rendering not matching.
        const firebaseui = require('firebaseui');
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
        ui.start("#link", uiConfig);
    }
  }, [rendered]);

  return(<View style={styles.signinForm} id="link"></View>);
}

export default SignInForm;

const styles = StyleSheet.create({
    signinForm: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        width: 300,
        alignSelf: 'center',
    }
  });
