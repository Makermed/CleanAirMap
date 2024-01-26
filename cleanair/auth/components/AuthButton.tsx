import { useEffect} from 'react';
import SignInForm from './SignInForm';
import SignOutForm from './SignOutForm';
import {currentUser} from '../User';
import { useReactiveVar } from '@apollo/client';
import { showModal, hideModal } from '../../common/components/Modal';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AuthButton = () => {
    const user = useReactiveVar(currentUser);
    const openSignInDialog = () => {
        const content = user != null ? <SignOutForm /> : <SignInForm />
        showModal(content);
    }

    useEffect(() => {
        // When the user changes, hide the modal.
        hideModal();
    },[user]);

    return (
        <TouchableRipple onPress={openSignInDialog}>
            {(user
                && user?.getPhotoURL
                && (<Avatar.Image size={40} source={{uri: user.getPhotoURL()!!}}/>))
            || <Avatar.Icon size={40} icon="account-circle"/>}
        </TouchableRipple>);
}

export { AuthButton }

const styles = StyleSheet.create({
    avatar: {
        marginRight: 20,
    }
  });
