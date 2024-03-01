import SignInForm from '../auth/components/SignInForm';
import  Modal from '../common/components/Modal';
import { currentUser } from '../auth/User';
import { useReactiveVar } from '@apollo/client';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import type { User } from '../auth/User';

const Login = () => {
   const user = useReactiveVar<User | null>(currentUser);

    return user != null ? <Redirect href="/" /> : (<Modal><SignInForm /></Modal>);
  };

export default Login;
