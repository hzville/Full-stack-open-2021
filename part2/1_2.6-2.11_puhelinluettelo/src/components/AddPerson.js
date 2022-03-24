import React from "react";

const AddPerson = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return(
        <div>
            <h2>add a new</h2>
            <form onSubmit={addName}>
            <div> name: <input value={newName} onChange={handleNameChange}/> </div>
            <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>
            <div> <button type="submit">add</button> </div>
        </form>
      </div>
    )
}

export default AddPerson