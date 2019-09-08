import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  // form specific information 

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogref = React.createRef();

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
    blogref.current.toggleVisibility();
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
      setNotification("Jes, onnistui");
      setTimeout(() => {
        setNotification("")
      },5000);
    } catch (error) {
      console.log("Error with the login ", error);
      setNotification("Virhe");
      setTimeout(() => {
        setNotification("")
      },5000);
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
        <div>
        <Notification message={notification} />

        </div>
        <header className="App-header">
          <LoginForm login={login} handleChange={handleLoginFieldChange} />

        </header>
      </div>
    );
  } else {
    return (
      <div className="app">
        <div>
        <Notification message={notification} />

        </div>
        <h2>{user.name} logged in</h2>
        <button onClick={logout}>Logout</button>
        <Togglable buttonLabel="Show form" ref={blogref}>
          <BlogForm handleChange={handleBlogChange} onSubmit={addBlog} title={title} url={url} author={author} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>
    )
  }
}

export default App;
