import { StyleSheet, View } from 'react-native';
import { IconButton, Card, Chip } from 'react-native-paper';
import { MapGeoJSONFeature } from 'maplibre-gl';

interface MarkerProps {
    location: MapGeoJSONFeature,
    onClose: Function,
    onAddNewLocation: Function,
}

const Marker = ({location, onClose, onAddNewLocation} : MarkerProps) => {

  return (
        <View style={{
            flex: 1,
            marginTop: 8,
            backgroundColor: 'transparent',
            alignItems: 'center',
        }}>
            <View style={ styles.label }>
              <Card style={{padding: 10, backgroundColor: 'white'}}>
                <Card.Title title={location.properties.name}></Card.Title>
                <Chip icon="plus" onPress={() => {onAddNewLocation();}}>
                    Add first reading
                </Chip>
              </Card>
              <IconButton
                size={10}
                style={{position: 'absolute', right: 2, top: 2}}
                icon="close-thick" onPress={() => onClose()} />
            </View>
            <View style={ [styles.triangle, styles.triangle]} />
            <View style={ [styles.triangle, styles.inner_triangle] } />
        </View>
  );
}

const styles = StyleSheet.create({
    label: {
        backgroundColor: 'darkblue',
        padding: 1,
        maxWidth: 300,
        borderRadius: 13,
    },
    triangle: {
        borderStyle: "solid",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderTopColor: 'darkblue'
    },
    inner_triangle: {
            position: "absolute",
            bottom: 2,
            borderTopColor: 'white',
    }
});
export default Marker;