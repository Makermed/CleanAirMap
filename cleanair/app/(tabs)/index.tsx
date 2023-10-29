import { StyleSheet, Platform } from 'react-native';

import MapView from '../../components/MapView'

export default function Main() {
  return (
    <MapView />
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width:'100%'
  },
  map: {
      height: '100%',
      width:'100%'
  }
});
