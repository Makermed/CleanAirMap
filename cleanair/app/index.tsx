import { StyleSheet, Platform } from 'react-native';

import CleanAirMap from '../components/Map'


export default function Main() {
  return (
    <CleanAirMap />
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
