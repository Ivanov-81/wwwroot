import { combineReducers } from 'redux';

import Event from './event';
import App from './app';
import Map from './map';

const allReducers = combineReducers({
    app: App,
    map: Map,
    event: Event
});

export default allReducers;
