import React from 'react'

const Notification = ({ message }) => {
    if (message.message === null) {
      return null
    }
    debugger
    return (
      <div className={message.status}>
        {message.message}
      </div>
    )
}

export default Notification