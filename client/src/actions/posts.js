import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_SPECIFIC, FETCH_SUBJECTS, FETCH_CLASSES, CLEAR_POSTS } from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getSpecificPosts = (subjectId, classId) => async (dispatch) => {
    try {
        const { data } = await api.getSpecificPosts(subjectId, classId);
        dispatch({ type: FETCH_SPECIFIC, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const getSubjects = () => async (dispatch) => {
    try {
        const { data } = await api.getSubjects();
        dispatch({ type: FETCH_SUBJECTS, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const getClasses = (subjectId) => async (dispatch) => {
    try {
        const { data } = await api.getClasses(subjectId);
        dispatch({ type: FETCH_CLASSES, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const clearPosts = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_POSTS });
    } catch (error) {
        console.log(error.message)
    }
}