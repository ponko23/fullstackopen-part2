import React from 'react';

const Header = ({title}) =>{
    //debugger
    return (
      <h1>{title}</h1>
    )
}

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
  
const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]
    
    return (
    <div>
        <Header title='Web development curriculum' />
        {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
    )
}

export default App