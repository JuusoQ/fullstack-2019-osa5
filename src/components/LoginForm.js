import React from 'react';
import PropTypes from 'prop-types'
import Togglable from './Togglable';

const LoginForm = (props) => (
    <div>
        <form onSubmit={props.login}>
            <input type="text" name="username" onChange={props.handleChange}/>
            <input type="password" name="password" onChange={props.handleChange} />
            <button type="submit">Kirjaudu</button>
        </form>
    </div>
)

Togglable.PropTypes = {
    login: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default LoginForm;