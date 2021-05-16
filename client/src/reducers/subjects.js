import { FETCH_SUBJECTS } from '../constants/actionTypes';

export default (subjects = [], action) => {
  switch (action.type) {
    case FETCH_SUBJECTS:
      return action.payload;
    default:
      return subjects;
  }
};