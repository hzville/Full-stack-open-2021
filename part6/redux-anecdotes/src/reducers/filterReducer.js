import { createSlice } from '@reduxjs/toolkit'

let initialState = null

const filterSlice = createSlice({
    name: 'filter',
    initialState ,
    reducers: {
        filterAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer