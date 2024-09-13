import * as SessionActions from './sessionActions';
import * as UIActions from './uiActions';
import * as MapActions from './mapActions';

export const ActionCreators = {
    ...SessionActions,
    ...UIActions,
    ...MapActions
};