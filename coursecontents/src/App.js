import React from 'react';
import { isNumber } from 'util';

const Header = ({title}) =>{
    //debugger
    return (
      <h1>{title}</h1>
    )
}
  
const Part = ({ key, text, exercises }) => {
    //debugger
    return(
      <p key={key}>{text} {exercises}</p>
    )
}
  
const Content = ({content}) => {
    //debugger
    return (
      content.map(part =>
        <Part
          key={part.id}
          text={part.name}
          exercises={part.exercises}
        />)
    )
}

const Total = ({ parts }) => {
    //debugger
    const total = parts.reduce((s, p) => {
        console.log('what is happening', s, p)
        //debugger
        return { exercises: s.exercises + p.exercises }
    })

    return (
        <span>total of  {total.exercises} exercises</span>
    )
}
  
const Course = ({ course }) => {
    //debugger
    return (
      <>
        <Header title={course.name} />
        <Content content={course.parts} />
        <Total parts={course.parts} />
      </>
    )
}
  
const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
        {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
        },
        {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
        },
        {
        name: 'State of a component',
        exercises: 14,
        id: 3
        }
    ]
    }

    return (
    <div>
        <Course course={course} />
    </div>
    )
}

export default App