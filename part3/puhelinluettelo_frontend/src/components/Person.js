import React from "react";

const Person = ({person, button}) => {
    return(
      <div>
        {person.name} {person.number} {button}
      </div>
    )
  }

export default Person