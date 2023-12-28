import { makeVar} from '@apollo/client';
import {ViewState, PaddingOptions} from 'react-map-gl';
import {User} from '../auth';

export const viewState = makeVar<ViewState>({
    latitude: 43.64546596188654,
    longitude: -79.38612693752015,
    zoom: 9,
    bearing: 0,
    pitch: 0,
    padding: {top: 0, bottom: 0, left: 0, right: 0} as PaddingOptions,
  });

export const currentUser = makeVar<User | null>(null);
