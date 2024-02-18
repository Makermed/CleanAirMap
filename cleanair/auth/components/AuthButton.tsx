import { useEffect} from 'react';
import SignInForm from './SignInForm';
import SignOutForm from './SignOutForm';
import {currentUser} from '../User';
import { useReactiveVar } from '@apollo/client';
import { showModal, hideModal } from '../../common/components/Modal';
import { Pressable } from "@gluestack-ui/themed"
import { StyleSheet } from 'react-native';
import { UserAvatar } from '../UserAvatar';

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
        <Pressable onPress={openSignInDialog}>
            <UserAvatar user={user}/>
        </Pressable>);
}

export { AuthButton }

const styles = StyleSheet.create({
    avatar: {
        marginRight: 20,
    }
  });
