import { StyleSheet, View } from 'react-native';
import { Card, Heading, ButtonText, Button} from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { MapGeoJSONFeature } from 'maplibre-gl';

interface MarkerProps {
    location: MapGeoJSONFeature,
    onClose: Function,
    onAddNewLocation: Function,
}

const Marker = ({location, onClose, onAddNewLocation} : MarkerProps) => {
  return (
    <Card size="md" variant="elevated" m="$3">
        <Heading mb="$1" size="md">
            {location.properties.name}
        </Heading>
        <Button py="$2" px="$4" onPress={() => onAddNewLocation()}>
            <ButtonText size="sm">Add first reading</ButtonText>
        </Button>
    </Card>
  );
}

export default Marker;
