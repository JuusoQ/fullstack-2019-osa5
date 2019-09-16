import React from 'react'

const BlogForm = ({ onSubmit,title,author,url }) => {

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        title <input name="title" {...title} />
        author <input name="author" {...author} />
        url <input name="url" {...url} />
        <button type="submit">create</button>
      </form>
    </div>
  )}


export default BlogForm