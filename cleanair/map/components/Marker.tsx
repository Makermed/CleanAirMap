import { Card, Heading, ButtonText, Button, HStack, VStack} from '@gluestack-ui/themed';
import { Feature } from "geojson";
import { ButtonIcon, CloseIcon } from "@gluestack-ui/themed";


type MarkerProps = {
  location : Feature,
  onClose: () => void,
  onAddNewLocation: () => void
}
const Marker = ({location, onClose, onAddNewLocation} : MarkerProps ) => {
  return (
    <Card>
      <VStack>
      <HStack mb="$5">
       <Heading size="sm" mr="$3">{location?.properties?.name}</Heading>
        <Button size='sm' onPress={onClose}>
          <ButtonIcon size='sm' as={CloseIcon} />
        </Button>
        </HStack>
        <Button py="$2" px="$4" onPress={() => onAddNewLocation()}>
            <ButtonText size="sm">Add first reading</ButtonText>
        </Button>
        </VStack>
      </Card>
  );
}

export default Marker;
