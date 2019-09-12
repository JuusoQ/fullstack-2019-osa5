import React from 'react'
import {useField} from '../hooks'

const BlogForm = ({ onSubmit}) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  return(
  <div>
    <h2>Create new</h2>
    <form onSubmit={onSubmit}>
        title <input {...title}/>
        author <input {...author} />
        url <input {...url} />
      <button type="submit">create</button>
    </form>
  </div>
)}


export default BlogForm