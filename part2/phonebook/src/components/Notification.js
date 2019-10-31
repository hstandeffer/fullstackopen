import React from 'react'

const Notification = ({ message, errorMessage }) => {
  const NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null && errorMessage) {
    return <div style={errorNotificationStyle}>{errorMessage}</div>
  }
  else if (errorMessage === null && message) {
    return <div style={NotificationStyle}>{message}</div>
  }
  else return null
}

export default Notification