import React from "react";

const Button = ({person, text, buttonFunction}) => {
    return <button onClick={buttonFunction} value={person.id}>{text}</button>
  }

export default Button