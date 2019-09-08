import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  })

  const handleLoginFieldChange = (e) => {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const login = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: username,
        password: password
      });
      setUsername('');
      setPassword('');
      setUser(user);
    } catch (error) {
      console.log("Error with the login ", error);
      setUser(null);
    }
  };

  if (user == null) {
    return (
      <div className="App">
        <header className="App-header">

          <LoginForm login={login} handleChange={handleLoginFieldChange} />

        </header>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h2>{user.name} logged in</h2>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />  
        )}

      </div>
    )
  }
}

export default App;
