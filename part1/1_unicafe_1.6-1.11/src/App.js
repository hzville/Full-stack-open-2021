import React, { useState } from 'react'

const Button = ({action, textbefore}) => {
  return(
    <button onClick={action}>{textbefore}</button>
  )
}

const StatisticLine = ({textbefore, value, textafter}) =>{
  return(
    <tr>
      <td>{textbefore}</td>
      <td>{value}</td>
      <td>{textafter}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  if (all < 1){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine textbefore="good" value={good} />
        <StatisticLine textbefore="neutral" value={neutral} />
        <StatisticLine textbefore="bad" value={bad} />
        <StatisticLine textbefore="all" value={all} />
        <StatisticLine textbefore="average" value={(good-bad)/all} />
        <StatisticLine textbefore="positive" value={(good/all)*100} textafter="%"/>
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1) 
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () =>{
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button action={handleGoodClick} textbefore="good"/>
      <Button action={handleNeutralClick} textbefore="neutral" />
      <Button action={handleBadClick} textbefore="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App