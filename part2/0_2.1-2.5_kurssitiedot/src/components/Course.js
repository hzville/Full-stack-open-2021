import React from "react";

const Part = ({part}) => {
    return(
      <div>
        {part.name} {part.exercises}
      </div>
    )
  }
  
  const Content = ({course}) => {
    return(
      <div>
        {course.parts.map(part => 
        <Part key={part.id} part={part} /> 
        )}
      </div>
  
    )
  }
  
  const Header = ({name}) => {
    return(
      <h2>{name}</h2>
    )
  }
  
  const Course = ({course}) => {
    const total_exercises_list = course.parts.map(parts => parts.exercises)
    const reducer = (pre, cur) => pre + cur;
    const total_exercises = total_exercises_list.reduce(reducer)
  
    return(
      <div>
        <Header name={course.name} />
        <Content course={course} />
        <b>total of {total_exercises} exercises</b> 
      </div>
    )
  
  }

export default Course