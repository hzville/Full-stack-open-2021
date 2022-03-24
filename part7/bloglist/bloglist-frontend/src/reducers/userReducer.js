import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return []
        }
    }
})

export const { setUser, getUser, removeUser } = userSlice.actions
export default userSlice.reducer