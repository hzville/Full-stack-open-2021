import { useDispatch, useSelector } from "react-redux"
import { updateVoteDb } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const anecdotes1 = useSelector(({ anecdotes, filter }) => {
        if (filter === null){
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    const anecdotesList = [...anecdotes1]
    anecdotesList.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

const submitNewVote = (anecdote) => {
    dispatch(updateVoteDb(anecdote))
}


    return (
        <div>
            {anecdotesList.map(anecdote => 
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => submitNewVote(anecdote)}>vote</button>
                    </div>
                </div>
                )}
        </div>
    )
}

export default AnecdoteList