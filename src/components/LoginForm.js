import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const LoginForm = ({ login, username, password }) => {
//   const username = useField('text')
//   const password = useField('password')
  return(
    <div>
      <form onSubmit={login}>
        <input {...username}/>
        <input {...password} />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )}

Togglable.propTypes = {
  login: PropTypes.func.isRequired,
  handleChange: PropTypes.func
}

export default LoginForm