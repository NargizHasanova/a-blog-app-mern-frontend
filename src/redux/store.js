import { configureStore } from "@reduxjs/toolkit"
import postsReducer from './slices/postSlice'
import usersReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
       posts : postsReducer,
       users : usersReducer
    }
})