import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getClasses, clearPosts } from '../../../actions/posts';

import useStyles from './styles';

const Subject = ({ subject, setCurrentSubject }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Button size="large" color="primary" onClick={() => {dispatch(getClasses(subject)); setCurrentSubject(subject); dispatch(clearPosts());}}>{subject}</Button>
  );
};

export default Subject;