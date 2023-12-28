
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { TextInput, Button, Switch } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feature} from "geojson";
import { Modal, Portal } from 'react-native-paper';

interface NewLocationModalProps {
  location: Feature;
  onDismiss: () => void;
}

const NewLocationModal = ({location, onDismiss} : NewLocationModalProps) => {
    return (
      <Portal>
        <Modal
          visible={true}
          onDismiss={onDismiss}
          contentContainerStyle={styles.container}>
          <SafeAreaProvider>
            <View>
              <Text>{location?.properties?.name}</Text>
              <Text>{location?.properties?.formatted}</Text>
              <TextInput label="Reading" />
              <Button mode="contained" onPress={() => console.log("Submit Button")}>
                Submit
              </Button>
            </View>
        </SafeAreaProvider>
      </Modal>
    </Portal>
    )
  }
  
  export default NewLocationModal

  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20
    },
});