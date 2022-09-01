import * as SessionActions from './sessionActions';
import * as UIActions from './uiActions';
import * as DataActions from './dataActions';
import * as MapActions from './mapActions';

// export const ActionCreators = Object.assign(
//     {},
//     SessionActions,
//     UIActions,
//     DataActions
// );

export const ActionCreators = {
    ...SessionActions,
    ...UIActions,
    ...DataActions,
    ...MapActions
};