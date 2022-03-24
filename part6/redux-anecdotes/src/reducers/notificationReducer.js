import { createSlice } from '@reduxjs/toolkit'

let initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNewNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        },
    }
})

let timeout

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(showNewNotification(text))
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(removeNotification())
        }, time*1000)
    }
}

export const { showNewNotification, removeNotification, multiNotification } = notificationSlice.actions
export default notificationSlice.reducer



