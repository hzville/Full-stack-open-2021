import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    addNewVote(state, action) {
      return state.map(anecdote => 
        anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdoteToDb = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(anecdote)
    dispatch(addNewAnecdote(newAnecdote))
    dispatch(setNotification(`You added '${newAnecdote.content}'`, 5))
  }
}

export const updateVoteDb = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.updateVotes(anecdote)
    dispatch(addNewVote(updatedAnecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }
}

export const { addNewAnecdote, addNewVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer