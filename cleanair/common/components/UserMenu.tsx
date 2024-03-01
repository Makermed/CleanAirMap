import { Menu, MenuItem, MenuItemLabel, Button, ButtonText } from '@gluestack-ui/themed'
import { useReactiveVar } from '@apollo/client';
import { currentUser } from '../../auth/User';
import UserAvatar from '../../auth/UserAvatar';
import { router } from 'expo-router';

const UserMenu = () => {
    enum MenuOptions {
        LOGIN = "Login",
        LOGOUT = "Logout"
    }

    const user = useReactiveVar(currentUser);

    const onSelect = (key: any) => {
        switch(key.currentKey) {
            case MenuOptions.LOGOUT.valueOf():
                user?.signOut();
                break;
            case MenuOptions.LOGIN.valueOf():
                router.push('/login');
                break;
        }
    }

    return (
        <Menu
        mt="$2"
        px="$6"
        ml="$6"
        placement="bottom left"
        selectionMode="single"
        onSelectionChange={onSelect}
        trigger={({ ...triggerProps }) => {
            return (
            <Button backgroundColor="transparent" {...triggerProps}>
                <UserAvatar user={user}/>
            </Button>
            )
        }}
        >
        {user && <MenuItem key={MenuOptions.LOGOUT} textValue={MenuOptions.LOGOUT.valueOf()}>
                <MenuItemLabel size="sm">Log out</MenuItemLabel>
            </MenuItem>}
        {!user && <MenuItem key={MenuOptions.LOGIN} textValue={MenuOptions.LOGIN.valueOf()}>
                <MenuItemLabel size="sm">Log in</MenuItemLabel>
            </MenuItem>}
        </Menu>);
}

export default UserMenu