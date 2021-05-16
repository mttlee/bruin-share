import { FETCH_CLASSES } from '../constants/actionTypes';

export default (classes = [], action) => {
  switch (action.type) {
    case FETCH_CLASSES:
      return action.payload;
    default:
      return classes;
  }
};