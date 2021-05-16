import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Subject from './Subject/Subject';
import useStyles from './styles';

const Subjects = ({ setCurrentSubject }) => {
  const subjects = useSelector((state) => state.subjects);
  const classes = useStyles();

  return (
    !subjects.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {subjects.map((subject) => (
          <Grid key={subject} item xs={12} sm={6} md={3}>
            <Subject subject={subject} setCurrentSubject={setCurrentSubject}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Subjects;