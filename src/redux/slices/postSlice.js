import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts",
    async () => {
        const { data } = await Axios.get("/posts")
        console.log(data);
        return data
    }
)

export const fetchTags = createAsyncThunk("posts/fetchTags",
    async () => {
        const { data } = await Axios.get("/tags")
        return data
    }
)

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost",
    async (id) => {
        const { data } = await Axios.delete(`/posts/${id}`)
        return data
    }
)

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        // Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, { payload }) => {
            state.posts.status = 'loaded'
            state.posts.items = payload
        },
        [fetchPosts.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        // Получение тэгов
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, { payload }) => {
            state.tags.status = 'loaded'
            state.tags.items = payload
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'error'
        }
    }
})

export default postSlice.reducer