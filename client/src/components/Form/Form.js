import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ prof: '', quarter: '', comments: '', concepts: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((comments) => comments._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ prof: '', quarter: '', comments: '', concepts: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.quarter}"` : 'Share your notes'}</Typography>
        <TextField name="prof" variant="outlined" label="Professor" fullWidth value={postData.prof} onChange={(e) => setPostData({ ...postData, prof: e.target.value })} />
        <TextField name="quarter" variant="outlined" label="Quarter, Year" fullWidth value={postData.quarter} onChange={(e) => setPostData({ ...postData, quarter: e.target.value })} />
        <TextField name="comments" variant="outlined" label="Comments" fullWidth multiline rows={4} value={postData.comments} onChange={(e) => setPostData({ ...postData, comments: e.target.value })} />
        <TextField name="concepts" variant="outlined" label="Featured Concepts (comma separated)" fullWidth value={postData.concepts} onChange={(e) => setPostData({ ...postData, concepts: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;