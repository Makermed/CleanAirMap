import { useReactiveVar } from '@apollo/client';
import { router } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet} from 'react-native';
import { Pressable, Box } from '@gluestack-ui/themed';
import { Platform } from 'react-native';

const Modal = ({children} : {children: React.ReactNode}) => {

  const onWebPressOverlay = () => {
    if (Platform.OS != "web" ) { return; }
    router.canGoBack() ? router.back() : router.replace('../');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(1,1,1,0.2)'}}
        onPress={onWebPressOverlay} />
      <Box py="$24" px="$16"
        borderRadius="$md"
        hardShadow={"3"}
        elevation={5}
        shadowOpacity={0.5}
        shadowColor="$backgroundLight900"
        shadowOffset={{width: 2, height: 2}}
        shadowRadius={8}
        backgroundColor="$backgroundLight0"
        justifyContent='center'
        alignItems='center'
        $dark-backgroundColor="$backgroundDark0">
        {children}
      </Box>
   </View>
  );
};

export default Modal;