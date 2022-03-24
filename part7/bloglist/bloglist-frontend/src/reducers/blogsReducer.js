import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const setAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const { setBlogs } = blogsSlice.actions
export default blogsSlice.reducer