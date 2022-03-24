import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        sucessfulMessage(state, action) {
            return {message: action.payload, type: 'success'}
        },
        errorMessage(state, action) {
            return {message: action.payload, type: 'error'}
        },
        removeMessage(state, action) {
            return null
        }
    }

})

export const { sucessfulMessage, errorMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer
