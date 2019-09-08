import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // form specific information 

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      // set token for blog service here
      blogService.setToken(user.token);
    }
  }, []);

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

  const handleBlogChange = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
      default:
        break;
    }
  }

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(newBlog).then(response => {
      setBlogs(blogs.concat(response));
      console.log(response, ' writed to state');
    })
  }

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
      window.localStorage.setItem('LoggedInUser', JSON.stringify(user));

    } catch (error) {
      console.log("Error with the login ", error);
      setUser(null);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('LoggedInUser');
    setUser(null);
  }

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
        <button onClick={logout}>Logout</button>
        <BlogForm handleChange={handleBlogChange} onSubmit={addBlog} title={title} url={url} author={author} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>
    )
  }
}

export default App;
