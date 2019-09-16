import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { useField } from './hooks'

const App = () => {
  const [user, setUser] = useState(null)
  // const [username, setUsername] = useState(null)
  // const [password, setPassword] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  // form specific information

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  
  // blogform with hooks
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  let {reset:titleReset, ...titleArgs } = title
  let {reset:authorReset, ...authorArgs } = author
  let {reset:urlReset, ...urlArgs } = url
  // loginform with hooks

  const {reset:resetUsername, ...username} = useField('text')
  const {reset:resetPassword, ...password} = useField('password')


  const blogref = React.createRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      // set token for blog service here
      blogService.setToken(user.token)
    }
  }, [])

 /*  const handleLoginFieldChange = (e) => {
    switch (e.target.name) {
    case 'username':
      setUsername(e.target.value)
      break
    case 'password':
      setPassword(e.target.value)
      break
    default:
      break
    }
  } */

 /*  const handleBlogChange = (e) => {
    switch (e.target.name) {
    case 'title':
      setTitle(e.target.value)
      break
    case 'author':
      setAuthor(e.target.value)
      break
    case 'url':
      setUrl(e.target.value)
      break
    default:
      break
    } 
  }*/

  const addBlog = (e) => {
    e.preventDefault()
    blogref.current.toggleVisibility()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    blogService.create(newBlog).then(response => {
      setBlogs(blogs.concat(response))
      console.log(response, ' writed to state')
    })
  }

  const likeBlog = (id) => {
    console.log('ID from likeblog ', id)
    const blog = blogs.find(b => b.id === id)
    console.log(blog)
    const likes = blog.likes + 1
    const newBlog = {
      ...blog,
      likes: likes
    }
    console.log('Updating (PUT) with ', newBlog)
    blogService.like(newBlog).then(response => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
    })
  }

  const deleteBlog = (id) => {
    blogService.remove(id).then(response => {
      console.log('deleted ', id)
      console.log(response)
    })
  }


  const login = async e => {
    e.preventDefault()
    console.log(username)
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      // setPassword('')
      setUser(user)
      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setNotification('Jes, onnistui')

      setTimeout(() => {
        setNotification('')
      },5000)
    } catch (error) {
      console.log('Error with the login ', error)
      setNotification('Virhe')
      setTimeout(() => {
        setNotification('')
      },5000)
      setUser(null)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('LoggedInUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div className="App">
        <div>
          <Notification message={notification} />

        </div>
        <header className="App-header">
          <LoginForm login={login} username={username} password={password} />

        </header>
      </div>
    )
  } else {
    return (
      <div className="app">
        <div>
          <Notification message={notification} />

        </div>
        <h2>{user.name} logged in</h2>
        <button onClick={logout}>Logout</button>
        <Togglable buttonLabel="Show form" ref={blogref}>
          <BlogForm onSubmit={addBlog} title={titleArgs} url={urlArgs} author={authorArgs}  />
        </Togglable>
        {blogs.sort((a,b) => a.likes - b.likes ).map(blog =>
          <Blog key={blog.id} blog={blog} like={likeBlog} del={deleteBlog}/>
        )}

      </div>
    )
  }
}

export default App
