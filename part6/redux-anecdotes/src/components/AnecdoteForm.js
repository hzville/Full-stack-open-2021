import { connect } from "react-redux"
import { addNewAnecdoteToDb } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.inputAnecdote.value
        event.target.inputAnecdote.value = ''
        props.addNewAnecdoteToDb(content)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='inputAnecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addNewAnecdoteToDb
}

const ConnectedForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedForm