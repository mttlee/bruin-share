import { combineReducers } from 'redux';

import posts from './posts';
import subjects from './subjects';
import classes from './classes';

export const reducers = combineReducers({ posts, subjects, classes });