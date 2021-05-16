import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { getSpecificPosts } from '../../../actions/posts';

import useStyles from './styles';

const Class = ({ oneClass, currentSubject }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Button size="large" color="primary" onClick={() => {dispatch(getSpecificPosts(`${currentSubject}`, `${oneClass}`));}}>{oneClass}</Button>
  );
};

export default Class;