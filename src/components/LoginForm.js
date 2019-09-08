import React from 'react';

const LoginForm = (props) => (
    <div>
        <form onSubmit={props.login}>
            <input type="text" name="username" onChange={props.handleChange}/>
            <input type="password" name="password" onChange={props.handleChange} />
            <button type="submit">Kirjaudu</button>
        </form>
    </div>
)

export default LoginForm;