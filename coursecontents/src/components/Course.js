import React from 'react';

const CourseHeader = ({title}) =>{
    //debugger
    return (
      <h2>{title}</h2>
    )
}
  
const Part = ({text, exercises }) => {
    //debugger
    return(
      <p>{text} {exercises}</p>
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
        <CourseHeader title={course.name} />
        <Content content={course.parts} />
        <Total parts={course.parts} />
      </>
    )
}

export default Course