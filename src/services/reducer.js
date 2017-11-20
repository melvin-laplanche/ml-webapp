// @flow

import { combineReducers } from 'redux';
import { featuredUser } from './users/reducers';

export const reducer = combineReducers({
	featuredUser,
});
