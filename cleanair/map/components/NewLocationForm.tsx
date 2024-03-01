
import React, { useEffect, useState } from "react"
import { Feature} from "geojson";
import {  Modal,
          ModalBackdrop,
          ModalContent,
          ModalHeader,
          ModalCloseButton,
          ButtonIcon,
          CloseIcon,
          ModalBody,
          VStack,
          Text,
          InputField,
          Input,
          ModalFooter,
          Button} from "@gluestack-ui/themed";
import { reverseGeocode } from '../data';

const NewLocationForm = ({location, onClose} : {location : Feature, onClose: () => void}) => {
  const [newLocation, setNewLocation] = useState<Feature | null>(null);

  useEffect(() => {
      if (!location?.properties?.formatted) {
        reverseGeocode(location).then((data) => {
          setNewLocation(data);
        });
      }
    }, []);

    return (
      <Modal isOpen={true} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton><ButtonIcon as={CloseIcon} /></ModalCloseButton>
          </ ModalHeader>
          <ModalBody>
            <VStack>
              <Text>{newLocation?.properties?.name}</Text>
              <Text>{newLocation?.properties?.formatted}</Text>
              <Input>
                <InputField placeholder="Reading" />
              </Input>
              </VStack>
            </ModalBody>
              <ModalFooter>
                <Button onPress={() => console.log("Submit Button")}>
                  <Text>Submit</Text>
                </Button>
              </ModalFooter>
              </ModalContent>
            </Modal>
    )
  }
  
  export default NewLocationForm;