import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Icon,
  } from "@gluestack-ui/themed"
import { User } from './User';
import { User as UserIcon } from 'lucide-react-native';

const AvatarForNoUser = () => {
    return (
        <Avatar>
            <Icon as={UserIcon} color="white" size="lg" />
        </Avatar>);
}

const AvatarForUser = ({user} : {user : User}) => {
    return (
        <Avatar>
        <AvatarFallbackText>user?.getName().charAt(0)</AvatarFallbackText>
            {(user
                && user?.getPhotoURL()
                && (<AvatarImage alt="user image" source={{uri: user.getPhotoURL()!!}}/>))}
         </Avatar>
    );
}

const UserAvatar = ({ user } : { user: User | undefined | null } ) => {
   return user ? <AvatarForUser user={user}/> : <AvatarForNoUser />;
}

export default UserAvatar;
