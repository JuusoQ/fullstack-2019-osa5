import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if(message === null) {
    return null
  } else {
    return (
      <div>{message}</div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification