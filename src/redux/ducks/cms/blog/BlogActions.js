import * as types from "./BlogTypes";

//get all blog
export const getAllBlog = () => ({
  type: types.GET_ALL_BLOG
});
export const getAllBlogSuccess = data => ({
  type: types.GET_ALL_BLOG_SUCCESS,
  payload: data
});
export const getAllBlogFailure = error => ({
  type: types.GET_ALL_BLOG_FAILURE,
  payload: error
});

//get single blog
export const getSingleBlog = (id) => ({
  type: types.GET_SINGLE_BLOG,
  payload: id
});
export const getSingleBlogSuccess = data => ({
  type: types.GET_SINGLE_BLOG_SUCCESS,
  payload: data
});
export const getSingleBlogFailure = error => ({
  type: types.GET_SINGLE_BLOG_FAILURE,
  payload: error
});

//create new blog
export const newBlog = (data) => ({
  type: types.NEW_BLOG,
  payload: data
});
export const newBlogSuccess = data => ({
  type: types.NEW_BLOG_SUCCESS,
  payload: data
});
export const newBlogFailure = error => ({
  type: types.NEW_BLOG_FAILURE,
  payload: error
});
