import { Modal, Portal, Button } from 'react-native-paper';
import { signOut } from '../firebase';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { User } from '../User';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { currentUser } from "../../storage/global";
import { useReactiveVar } from "@apollo/client";
import SignInForm from './SignInForm';


const SignInModal = () => {
    const [visible, setVisible] = useState(false);
    return (
        <View>
            <Button onPress={() => setVisible(true)}>
                Log in
            </Button>
            <Portal>
              <Modal visible={visible}
                    onDismiss={() => setVisible(false)}
                    style={styles.container}>
                <SignInForm />
              </Modal>
            </Portal>
        </View>
    );
  }
  
  const SignOutModal = ({user} : {user: User}) => {
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(<Avatar.Icon size={24} icon="account-circle"/>);

    useEffect(() => {
      setAvatar((user.getPhotoURL
            && (<Avatar.Image size={24} source={{uri: user.getPhotoURL()!!}}/>))
            || (<Avatar.Icon size={24} icon="account-circle"/>));
    }, [user]);

    return (
          <View>
              <TouchableRipple onPress={() => setVisible(true)}>
                  {avatar}
              </TouchableRipple>
              <Portal>
                  <Modal contentContainerStyle={styles.modalContent} visible={visible} onDismiss={() => setVisible(false)} style={styles.container}>
                      <Button onPress={signOut} style={styles.logoutButton} mode="elevated">
                          Logout
                      </Button>
                  </Modal>
              </Portal>
          </View>
      );
  }
  
const SignIn = ({user} : {user : User | null} )  => {
    return user == null ? (<SignInModal />) : <SignOutModal user={user} />;
};

const AuthModal = () => {
    const user = useReactiveVar(currentUser);
    return <SignIn user={user} />
}

export {AuthModal}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignContent: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center'
    },
    logoutButton: {
       backgroundColor: 'white',
       minWidth: 300,
       maxWidth: 700,
    }
  });
