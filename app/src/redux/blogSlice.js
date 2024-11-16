// src/redux/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // Array to hold blogs
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.items.push(action.payload);
    },
    setBlogs: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addBlog, setBlogs, setError } = blogSlice.actions;

export default blogSlice.reducer;

// Thunk to create a blog
export const createBlog = (blogData, token) => async (dispatch) => {
  try {
    console.log(blogData)
    const formData = new FormData();

    // Append the blog data to the FormData object
    formData.append("title", blogData.title);
    formData.append("category", blogData.category);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("image", blogData.image);

    // Make the POST request to create the blog
    const response = await axios.post("http://localhost:5000/api/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // Dispatch the action to add the new blog to the store
    dispatch(addBlog(response.data)); 

  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to create blog";
    dispatch(setError(errorMessage)); // Dispatch the error message
  }
};


export const fetchBlogs = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    dispatch(setBlogs(response.data));
  } catch (error) {
    dispatch(setError("Failed to fetch blogs"));
  }
};

export const searchBlogs = (token, title, category) => async (dispatch) => {
  try {
    console.log('searching')
    const response = await axios.get("http://localhost:5000/api/blogs/search", {
      params: {
        title,
        category
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    dispatch(setBlogs(response.data));
  } catch (error) {
    dispatch(setError("Failed to fetch blogs"));
  }
};
